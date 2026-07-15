#!/bin/bash
# =====================================================================
# Transistor&CIE — DÉPLOIEMENT (double-cliquable)
# En un clic, phase par phase du début à la fin :
#   ➊ Vérifications    — synchronisation GitHub (pull --rebase), contrôle
#     que chaque page du site a bien sa règle dans public/_redirects (le
#     bug des 404 en production), puis BUILD complet en local (TypeScript
#     + Vite) : si ça ne compile pas ici, rien ne part en ligne ;
#   ➋ Firebase         — DÉPLOIEMENT AUTOMATIQUE de firestore.rules si le
#     fichier a changé (registre .firestore-rules.applied), via le CLI
#     Firebase qui valide la syntaxe avant publication — les règles
#     partent toujours AVANT le site ;
#   ➌ GitHub           — COMMIT AUTOMATIQUE de tout le travail, puis push
#     (c'est le push qui déclenche le build Netlify) ;
#   ➍ Netlify          — SUIT le build jusqu'à la mise en ligne effective
#     (tampon de déploiement vérifié sur www.transistor-cie.fr), puis crée
#     un point de retour (tag Git).
# À la toute fin, une touche FERME la fenêtre du Terminal.
#
# Habillage : la fenêtre du Terminal est mise aux couleurs de
# Transistor&CIE au lancement (fond ardoise, texte clair, curseur bleu
# ciel — AppleScript, comme la fermeture automatique). Premier lancement :
# macOS demande UNE FOIS l'autorisation de contrôler le Terminal — accepter.
#
# Le build local est toujours fait AVANT le push (l'ordre compte : on ne
# déclenche jamais un build Netlify avec du code qui ne compile pas).
#
# Pré-requis :
#   • node / npm installés (node_modules réinstallé tout seul si absent)
#   • GitHub connecté une fois (clé SSH) : le remote « origin » existe déjà
#   • Firebase CLI connecté une fois :  npx firebase-tools login
#   • Netlify relié au dépôt (auto-build sur push — déjà configuré)
# =====================================================================

cd "$(dirname "$0")" || exit 1

# --- Palette (couleurs et animations seulement si vrai terminal) -------
# Bleu ciel pour l'identité, vert pour « tout va bien », bleu acier pour
# les détails techniques, rouge réservé aux vrais problèmes.
if [ -t 1 ]; then
  TTY=1
  B=$'\033[1m'; D=$'\033[2m'; R=$'\033[0m'
  SKY=$'\033[38;5;75m'    # bleu ciel — accents identitaires
  GRN=$'\033[38;5;114m'   # succès
  BLU=$'\033[38;5;110m'   # détails techniques (fichiers, tailles, tags)
  RED=$'\033[38;5;167m'   # erreurs uniquement
else
  TTY=0; B=""; D=""; R=""; SKY=""; GRN=""; BLU=""; RED=""
fi
RULE="──────────────────────────────────────────────────────────────────"
DRULE="══════════════════════════════════════════════════════════════════"
SPIN=("⠋" "⠙" "⠹" "⠸" "⠼" "⠴" "⠦" "⠧" "⠇" "⠏")
NUMS=("➊" "➋" "➌" "➍")
trap 'tput cnorm 2>/dev/null; echo ""; exit 130' INT

# Ligne de bannière avec micro-délai (déroulé « vivant » au lancement).
say() { echo "$1"; [ "$TTY" -eq 1 ] && sleep 0.03; }

phase() { # phase <n> "Titre"
  echo ""
  echo "  ${SKY}${B}${NUMS[$(($1 - 1))]}${R}  ${B}$2${R}  ${D}· phase $1/4${R}"
  echo "  ${D}$RULE${R}"
}

# step "libellé" commande…  → spinner bleu ciel + chronomètre pendant
# l'exécution, puis ✔ vert / ✖ rouge (durée affichée dès 2 s).
# La sortie complète est gardée dans /tmp/tc_step.log (diagnostic).
step() {
  local label="$1"; shift
  : > /tmp/tc_step.log
  local t0=$SECONDS rc dur
  if [ "$TTY" -eq 1 ]; then
    "$@" >/tmp/tc_step.log 2>&1 &
    local pid=$! i=0
    tput civis 2>/dev/null
    while kill -0 "$pid" 2>/dev/null; do
      printf "\r\033[K   ${SKY}%s${R} %s ${D}%s s${R}" "${SPIN[$i]}" "$label" "$((SECONDS - t0))"
      i=$(( (i + 1) % 10 ))
      sleep 0.08
    done
    tput cnorm 2>/dev/null
    wait "$pid"; rc=$?
    dur=$((SECONDS - t0))
    local suffix=""
    [ "$dur" -ge 2 ] && suffix=" ${D}· $dur s${R}"
    if [ "$rc" -eq 0 ]; then printf "\r\033[K   ${GRN}✔${R} %s%s\n" "$label" "$suffix"
    else printf "\r\033[K   ${RED}✖${R} %s%s\n" "$label" "$suffix"; fi
  else
    "$@" >/tmp/tc_step.log 2>&1; rc=$?
    if [ "$rc" -eq 0 ]; then echo "   ✔ $label"; else echo "   ✖ $label"; fi
  fi
  return "$rc"
}

# Dernières lignes du journal d'une étape.
log_tail() { tail -n "${1:-4}" /tmp/tc_step.log | sed -e 's/^/       /'; }

# Détail complémentaire sous une étape (fichier, taille, précision…).
detail() { echo "     ${BLU}↳${R} ${D}$1${R}"; }

# --- Fenêtre aux couleurs de Transistor&CIE -----------------------------
# Cible UNIQUEMENT la fenêtre de CE script (repérée par son tty), dans
# Terminal.app seulement : fond ardoise #0F172A, texte clair #F1F5F9,
# curseur bleu ciel #38BDF8, taille confortable, titre propre. Sans effet
# ailleurs (iTerm, IDE…).
style_window() {
  [ "$TERM_PROGRAM" = "Apple_Terminal" ] || return 0
  local ttydev; ttydev="$(tty 2>/dev/null)"
  [ -n "$ttydev" ] || return 0
  osascript \
    -e 'tell application "Terminal"' \
    -e 'repeat with w in windows' \
    -e 'repeat with t in tabs of w' \
    -e "if (tty of t) is \"$ttydev\" then" \
    -e 'set background color of t to {3855, 5911, 10794}' \
    -e 'set normal text color of t to {61937, 62965, 63993}' \
    -e 'set bold text color of t to {65535, 65535, 65535}' \
    -e 'set cursor color of t to {14392, 48573, 63736}' \
    -e 'set number of columns of t to 78' \
    -e 'set number of rows of t to 34' \
    -e 'set custom title of t to "Transistor&CIE · Déploiement"' \
    -e 'end if' \
    -e 'end repeat' \
    -e 'end repeat' \
    -e 'end tell' >/dev/null 2>&1
}

# /dev/tty est-il réellement OUVRABLE (vrai terminal de contrôle) ? Au
# double-clic dans Terminal.app : oui. Lancé sans terminal (pipe, CI) : le
# fichier peut exister mais l'ouverture échoue (« Device not configured ») —
# on le détecte ici, sans laisser fuir le message d'erreur.
tty_ok() { { true </dev/tty; } 2>/dev/null; }

# Fin de script : on ATTEND une vraie touche (la fenêtre reste ouverte tant
# que tu n'as pas appuyé — tu peux constater le récapitulatif tranquillement),
# PUIS FERMETURE de la fenêtre du Terminal (uniquement Terminal.app, ciblée
# sur le tty de CETTE fenêtre — sans effet ailleurs).
# ⚠️ Lecture sur /dev/tty (le terminal réel), PAS stdin : pendant le
# déploiement, npm/curl peuvent fermer/vider stdin, ce qui ferait que
# « read » ne bloque plus et la fenêtre se refermerait toute seule.
finish() {
  echo ""
  printf "   ${SKY}▸${R}  ${B}Prends le temps de vérifier ci-dessus.${R}\n"
  printf "   ${D}Appuie sur une touche pour fermer la fenêtre…${R}"
  if tty_ok; then read -n 1 -s -r </dev/tty; else read -n 1 -s -r; fi
  echo ""
  if [ "$TERM_PROGRAM" = "Apple_Terminal" ]; then
    local ttydev; ttydev="$(tty 2>/dev/null)"
    if [ -n "$ttydev" ]; then
      osascript \
        -e 'delay 0.2' \
        -e 'tell application "Terminal"' \
        -e 'repeat with w in windows' \
        -e 'repeat with t in tabs of w' \
        -e "if (tty of t) is \"$ttydev\" then close w saving no" \
        -e 'end repeat' \
        -e 'end repeat' \
        -e 'end tell' >/dev/null 2>&1 &
    fi
  fi
  exit "${1:-0}"
}
die() { echo ""; echo "${RED}   $1${R}"; finish 1; }

# --- Bannière -----------------------------------------------------------
SHA_AVANT="$(git rev-parse --short HEAD 2>/dev/null)"
N_DEPLOY="$(git rev-list --count HEAD 2>/dev/null)"
style_window
[ "$TTY" -eq 1 ] && clear
say ""
say "  ${D}$DRULE${R}"
say ""
say "                                 ${SKY}${B}⏚${R}"
say ""
say "            ${B}T R A N S I S T O R ${SKY}&${R}${B} C I E${R}"
say "                  ${D}Déploiement en production${R}"
say ""
say "        ${D}Commit actuel${R}  ${SKY}${B}${SHA_AVANT:-?}${R} ${D}(n° ${N_DEPLOY:-?})   →   www.transistor-cie.fr${R}"
say ""
say "  ${D}$DRULE${R}"
say ""
say "   ${D}Le script déroule tout seul, phase par phase — il ne te"
say "   sollicite qu'en cas d'imprévu.${R}"

# --- Mode : mise en ligne ou pas ? --------------------------------------
# Ici, c'est le PUSH GitHub qui met en ligne (Netlify reconstruit le site à
# chaque push sur main). Le choix est donc demandé AU DÉBUT : sans mise en
# ligne, on vérifie + build + commit LOCAL, mais on ne pousse pas — tu peux
# travailler et tester en local sans consommer de crédits de build Netlify.
#
# ⚠️ FAIL-SAFE : par défaut on NE met PAS en ligne. Il faut taper
# explicitement « o » pour pousser. Ainsi une saisie mal lue (espace/retour
# chariot parasite selon le terminal) ne déclenche JAMAIS un build.
DEPLOY_NETLIFY=0
echo ""
echo "  ${D}$RULE${R}"
printf "   ${SKY}?${R}  ${B}Mettre le site EN LIGNE à la fin ?${R}\n"
printf "      ${D}Tape « o » pour déployer (push → build Netlify). Entrée (ou tout\n"
printf "      autre) = vérifications + build + commit local, SANS mise en ligne.${R}\n"
printf "   ${D}[o/${R}${B}N${D}]${R} "
if tty_ok; then read -r REP_MODE </dev/tty; else read -r REP_MODE; fi
# Nettoyage : retire espaces / retour chariot éventuels (CRLF, collage…).
REP_MODE="$(printf '%s' "$REP_MODE" | tr -d '[:space:]')"
case "$REP_MODE" in
  o|O|oui|Oui|OUI|y|Y|yes|YES) DEPLOY_NETLIFY=1 ;;
esac
if [ "$DEPLOY_NETLIFY" -eq 1 ]; then
  echo "   ${GRN}→${R} ${D}Déploiement complet : vérifications, build, GitHub, puis Netlify.${R}"
else
  echo "   ${SKY}→${R} ${D}Mode local : vérifications, build et commit — PAS de mise en ligne.${R}"
fi

# --- Pré-vol : outils npm / git + dépôt ---------------------------------
command -v npm >/dev/null 2>&1 || die "⚠️  npm introuvable. Installe Node.js :  brew install node"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "❌ Pas un dépôt Git ici — rien à déployer."
git remote get-url origin >/dev/null 2>&1 || die "❌ Remote « origin » absent — connecte le dépôt GitHub d'abord."

SITE_URL="https://www.transistor-cie.fr"
STAMP_FILE="public/deploy-stamp.txt"
BUNDLE=""; TAG_OK=""; RULES_ALERTE=0

# =====================================================================
# Phase 1 · Vérifications & build local
# =====================================================================
phase 1 "Vérifications & build"

# Synchronisation d'abord : on construit toujours sur la dernière version
# du dépôt (— autostash : le travail en cours est mis de côté puis remis).
if ! step "Synchronisation avec GitHub (pull --rebase)" \
     git pull --rebase --autostash origin main; then
  log_tail
  die "❌ Synchronisation impossible (connexion ? conflit ?).
      En cas de conflit :  git rebase --abort  puis corrige et relance."
fi

# Contrôle 404 : chaque page déclarée dans le routeur doit avoir sa règle
# dans public/_redirects (ce fichier PRIME sur netlify.toml — une page
# oubliée ici marche en local mais renvoie 404 en production).
MANQUANTES=()
while read -r p; do
  case "$p" in *:*|"*"|"/") continue ;; esac
  grep -qE "^$p " public/_redirects || MANQUANTES+=("$p")
done < <(grep -oE 'path="[^"]*"' src/router/AppRouter.tsx | sed -E 's/path="([^"]*)"/\1/')
if [ ${#MANQUANTES[@]} -gt 0 ]; then
  echo "   ${RED}✖${R} Routes ABSENTES de public/_redirects ${D}(404 assuré en prod) :${R}"
  printf "      ${RED}•${R} %s\n" "${MANQUANTES[@]}"
  die "❌ Ajoute ces lignes dans public/_redirects (« /page /index.html 200 »),
      au-dessus de la ligne « /* /404.html 404 », puis relance."
else
  echo "   ${GRN}✔${R} Routes du site ${D}— toutes couvertes par public/_redirects.${R}"
fi

# Dépendances (réinstallées automatiquement si node_modules manque).
if [ ! -d node_modules ]; then
  step "Installation des dépendances (npm install)" npm install \
    || { log_tail; die "❌ npm install a échoué — vérifie la connexion, puis relance."; }
fi

# Tampon de déploiement : un identifiant unique écrit dans public/ AVANT le
# build. Netlify le servira tel quel sur $SITE_URL/deploy-stamp.txt — c'est
# LUI qui prouvera, en phase 4, que la nouvelle version est bien EN LIGNE
# (et pas une version en cache ou un build encore en cours).
if [ "$DEPLOY_NETLIFY" -eq 1 ]; then
  STAMP_ID="$(date +%Y%m%d-%H%M%S)-$(LC_ALL=C tr -dc 'a-z0-9' </dev/urandom | head -c 6)"
  printf '%s' "$STAMP_ID" > "$STAMP_FILE"
fi

# Build complet en local : TypeScript (tsc -b) PUIS Vite. Exactement la
# commande que Netlify lancera — si ça casse ici, ça aurait cassé là-bas.
if ! step "Build production (TypeScript + Vite)" npm run build; then
  log_tail 8
  die "❌ Le build échoue — rien n'est parti en ligne. Corrige, puis relance."
fi
BUNDLE="$(grep -oE 'assets/index-[^"]+\.js' dist/index.html | head -1)"
detail "bundle : ${BUNDLE:-?} · dist/ : $(du -sh dist 2>/dev/null | cut -f1)"

# =====================================================================
# Phase 2 · Firebase (déploiement des règles Firestore)
# =====================================================================
# Les règles Firestore (formulaire de devis, page admin) ne partent PAS
# avec le site : elles sont DÉPLOYÉES AUTOMATIQUEMENT ici via le CLI
# Firebase (connexion faite une fois : npx firebase-tools login), qui
# VALIDE aussi leur syntaxe côté serveur avant publication.
# Registre .firestore-rules.applied : empreinte du fichier au dernier
# déploiement réussi — inchangée = rien à faire. L'ordre compte : les
# règles partent AVANT le site (un formulaire nouveau ne doit jamais
# arriver en ligne avant les règles qui l'autorisent).
phase 2 "Firebase (règles Firestore)"
RULES_LEDGER=".firestore-rules.applied"
RULES_HASH="$(shasum -a 256 firestore.rules 2>/dev/null | cut -d' ' -f1)"
if [ -f "$RULES_LEDGER" ] && [ "$RULES_HASH" = "$(cat "$RULES_LEDGER")" ]; then
  echo "   ${GRN}✔${R} Règles Firestore inchangées ${D}— rien à déployer côté Firebase.${R}"
else
  # Binaire Firebase : on privilégie l'install locale (node_modules) — aucun
  # téléchargement, insensible au réseau. Repli sur npx si absent.
  if [ -x "node_modules/.bin/firebase" ]; then
    FIREBASE_BIN=(node_modules/.bin/firebase)
  else
    FIREBASE_BIN=(npx --yes firebase-tools)
  fi
  if step "Déploiement des règles Firestore (Firebase CLI)" \
       "${FIREBASE_BIN[@]}" deploy --only firestore:rules --project transistor-cie --non-interactive; then
    printf '%s' "$RULES_HASH" > "$RULES_LEDGER"
    detail "règles validées et publiées sur le projet transistor-cie"
  else
    log_tail 5
    echo "   ${RED}⚠️  Déploiement des règles impossible.${R}"
    echo "      ${D}Soit reconnecte le CLI (une fois) :  node_modules/.bin/firebase login --reauth"
    echo "      Soit publie à la main : console Firebase → Firestore → Règles.${R}"
    printf "   ${SKY}?${R} Continuer SANS les nouvelles règles ? [o/${B}N${R}] "
    if tty_ok; then read -r REP_RULES </dev/tty; else read -r REP_RULES; fi
    case "$REP_RULES" in
      o|O|y|Y)
        RULES_ALERTE=1
        echo "   ${SKY}→${R} ${D}On continue — publie les règles au plus vite (formulaire et règles désynchronisés).${R}"
        ;;
      *)
        die "→ Arrêt : rien n'est parti en ligne (les règles doivent partir avant le site)."
        ;;
    esac
  fi
fi

# =====================================================================
# Phase 3 · Sauvegarde du code sur GitHub
# =====================================================================
# COMMIT AUTOMATIQUE de tout le travail non committé. En mode déploiement,
# PUSH dans la foulée — c'est LUI qui déclenche le build Netlify. En mode
# local, on s'arrête au commit (rien ne part, aucun build consommé).
# Best-effort côté commit : s'il n'y a rien de neuf, on pousse l'existant.
phase 3 "Sauvegarde GitHub"
# Identité git de repli (uniquement si aucune n'est configurée).
git config user.email >/dev/null 2>&1 || git config user.email "deploy@transistor-cie.fr"
git config user.name  >/dev/null 2>&1 || git config user.name  "Transistor&CIE déploiement"

N_CHG="$(git status --porcelain | wc -l | tr -d ' ')"
if [ "${N_CHG:-0}" -gt 0 ]; then
  git add -A >/tmp/tc_step.log 2>&1
  if [ "$DEPLOY_NETLIFY" -eq 1 ]; then
    CMSG_SUJET="${1:-Mise en ligne — $(date '+%Y-%m-%d %H:%M')}"
  else
    CMSG_SUJET="${1:-Travail local (sans mise en ligne) — $(date '+%Y-%m-%d %H:%M')}"
  fi
  CMSG_CORPS="Bundle : ${BUNDLE:-?}"
  if step "Commit automatique du travail ($N_CHG fichiers)" \
       git commit -m "$CMSG_SUJET" -m "$CMSG_CORPS"; then
    detail "commit : $CMSG_SUJET"
  else
    detail "commit impossible (voir /tmp/tc_step.log) — on continue avec l'existant."
  fi
else
  detail "Rien de neuf à committer (dépôt déjà à jour)."
fi

# --- Mode local : on s'arrête AVANT le push (site NON redéployé) --------
if [ "$DEPLOY_NETLIFY" -eq 0 ]; then
  DUR=$SECONDS; MIN=$((DUR / 60)); SEC=$((DUR % 60))
  echo ""
  echo ""
  say "   ${D}╭$RULE${R}"
  say "   ${D}│${R}"
  say "   ${D}│${R}   ${GRN}${B}✔  Travail enregistré${R} ${D}— build vérifié, commit local fait.${R}"
  say "   ${D}│${R}"
  say "   ${D}│${R}   ${D}Mise en ligne ..........${R}  ${SKY}ignorée${R} ${D}(mode local, rien poussé)${R}"
  say "   ${D}│${R}   ${D}Build production .......${R}  ${GRN}OK${R} ${D}(${BUNDLE:-?})${R}"
  [ "$RULES_ALERTE" -eq 1 ] && \
  say "   ${D}│${R}   ${RED}⚠️  Règles Firestore à publier dans la console Firebase.${R}"
  say "   ${D}│${R}   ${D}Durée ..................${R}  ${MIN} min ${SEC} s"
  say "   ${D}│${R}"
  say "   ${D}│${R}   ${D}Teste en local avec ${R}${SKY}npm run dev${R}${D}. Quand tu es prêt,${R}"
  say "   ${D}│${R}   ${D}relance et réponds ${R}${B}O${R}${D} pour mettre en ligne.${R}"
  say "   ${D}│${R}"
  say "   ${D}╰$RULE${R}"
  finish 0
fi

if ! step "Envoi du code sur GitHub (git push)" git push origin main; then
  log_tail
  die "❌ git push a échoué — RIEN n'est parti en ligne (Netlify ne build que
      sur push). Vérifie la connexion / la clé SSH, puis relance."
fi

# =====================================================================
# Phase 4 · Mise en ligne Netlify (suivi + point de retour)
# =====================================================================
# Le push vient de déclencher le build chez Netlify (1 à 3 min en général).
# On INTERROGE le site en production jusqu'à y lire NOTRE tampon de
# déploiement — preuve que la nouvelle version est réellement servie (et
# pas un cache, ni un build encore en cours ou échoué).
phase 4 "Mise en ligne Netlify"
attendre_mise_en_ligne() {
  local i=1 max=40 remote
  while [ "$i" -le "$max" ]; do
    remote="$(curl -fsS --max-time 10 "$SITE_URL/deploy-stamp.txt?t=$(date +%s)" 2>/dev/null | tr -d '[:space:]')"
    echo "essai $i/$max — tampon en ligne : ${remote:-aucun} (attendu : $STAMP_ID)"
    [ "$remote" = "$STAMP_ID" ] && return 0
    sleep 10
    i=$((i + 1))
  done
  return 1
}
if step "Build Netlify en cours — attente de la mise en ligne" attendre_mise_en_ligne; then
  detail "$SITE_URL sert bien le tampon $STAMP_ID"

  # Point de retour : tag Git du commit mis en ligne. Pour revenir en
  # arrière : git revert, ou redéployer ce tag depuis le dashboard Netlify.
  TAG="prod-$(date +%Y-%m-%d_%H%M)"
  if git tag -a "$TAG" -m "Mise en ligne — $TAG" >/dev/null 2>&1 \
     && git push origin "$TAG" >/dev/null 2>&1; then
    TAG_OK=1
  fi

  # --- Récapitulatif final ---------------------------------------------
  SHA_APRES="$(git rev-parse --short HEAD 2>/dev/null)"
  DUR=$SECONDS; MIN=$((DUR / 60)); SEC=$((DUR % 60))
  echo ""
  echo ""
  say "   ${D}╭$RULE${R}"
  say "   ${D}│${R}"
  say "   ${D}│${R}   ${GRN}${B}✔  Déploiement réussi${R} ${D}— le site est à jour.${R}"
  say "   ${D}│${R}"
  say "   ${D}│${R}   ${D}Site ...................${R}  www.transistor-cie.fr"
  say "   ${D}│${R}   ${D}Commit en ligne ........${R}  ${SKY}${B}${SHA_APRES:-?}${R}"
  say "   ${D}│${R}   ${D}Bundle .................${R}  ${BLU}${BUNDLE:-?}${R}"
  [ -n "$TAG_OK" ] && \
  say "   ${D}│${R}   ${D}Point de retour ........${R}  ${BLU}$TAG${R}"
  [ "$RULES_ALERTE" -eq 1 ] && \
  say "   ${D}│${R}   ${RED}⚠️  Règles Firestore à publier dans la console Firebase.${R}"
  say "   ${D}│${R}   ${D}Durée ..................${R}  ${MIN} min ${SEC} s"
  say "   ${D}│${R}"
  say "   ${D}│${R}   ${D}Sur le site, un rechargement forcé (${R}Cmd + Maj + R${D})"
  say "   ${D}│${R}   ${D}montre la nouvelle version tout de suite.${R}"
  say "   ${D}│${R}"
  say "   ${D}╰$RULE${R}"
  finish 0
else
  echo ""
  echo "${RED}   ❌ La nouvelle version n'est pas encore visible en ligne${R}"
  echo "      ${D}(le code, lui, est bien poussé sur GitHub — rien n'est perdu).${R}"
  echo "      ${D}Le build Netlify est peut-être long… ou a échoué : vérifie sur"
  echo "      app.netlify.com (onglet Deploys), corrige au besoin, relance.${R}"
  finish 1
fi
