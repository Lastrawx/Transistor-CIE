# Prompt Codex VS Code — Action Sync Offres (Site -> 03_COMMERCIAL -> 02_COMPTABILITE)

Copie/colle ce prompt dans Codex quand tu veux exécuter une action de contrôle + correction.

```text
Tu es un agent d’action (pas un simple audit).

Objectif:
1) Vérifier que les offres du site (source de vérité) correspondent aux fichiers de `03_COMMERCIAL`.
2) Puis vérifier que `02_COMPTABILITE` intègre fidèlement les données de `03_COMMERCIAL`.
3) Si écart en étape 2: corriger directement `02_COMPTABILITE` en créant des backups horodatés.

## Règles métier obligatoires
- Le site fait foi pour les offres.
- Étape 1 (site vs 03_COMMERCIAL): signaler les écarts, NE PAS modifier `03_COMMERCIAL`.
- Étape 2 (03_COMMERCIAL vs 02_COMPTABILITE): si écart, appliquer les corrections dans `02_COMPTABILITE` avec backup avant chaque fichier modifié.
- Ne rien écrire en dehors de `02_COMPTABILITE` pendant les corrections.
- Si une correspondance est ambiguë, ne pas inventer: signaler clairement en blocage.

## Paramètres de run
- PROD_URL: {url production}
- MODE_SYNC: {check_only|apply_02_from_03} (par défaut: apply_02_from_03)

## Périmètre fichiers
- Source site: `04_SITE_WEB/Transistor&CIE/src/content/services.ts`
- Commercial:
  - `03_COMMERCIAL/01_Grilles_tarifaires_Transistor-CIE_2026.xlsx`
  - `03_COMMERCIAL/02_Offres_Particuliers_Transistor-CIE_2026.xlsx`
  - `03_COMMERCIAL/03_Offres_Entreprises_Transistor-CIE_2026.xlsx`
- Comptabilité (priorité):
  - `02_COMPTABILITE/03_Generateur_de_devis_Transistor-CIE_2026.xlsx`
- Comptabilité (secondaire si trouvé):
  - autres `.xlsx` de `02_COMPTABILITE` contenant offres/prix/actions.

## Données à comparer (minimum)
### Étape 1: Site vs 03_COMMERCIAL
Comparer au minimum:
- liste des offres (particuliers + entreprises), ordre logique (abonnements en tête),
- intitulés (title),
- résumé commercial (offer),
- modalités (`100% digital, partout en France — Devis gratuit`),
- éléments principaux (includes) au niveau sémantique (pas forcément caractère par caractère).

### Étape 2: 03_COMMERCIAL vs 02_COMPTABILITE
Comparer au minimum:
- catalogue offres (IDs + intitulés),
- packs/offres composées,
- catalogue actions/interventions,
- grille tarifaire (libellés + prix + unité si présente),
- formulations clés impactant devis/facture.

## Procédure obligatoire
1) Lire et extraire les offres du site (`services.ts`).
2) Lire `03_COMMERCIAL` et produire un diff détaillé contre le site.
3) Continuer vers l’étape 2 même s’il y a des écarts à l’étape 1 (mais les signaler en priorité).
4) Lire `02_COMPTABILITE`, comparer à `03_COMMERCIAL`.
5) Si MODE_SYNC=apply_02_from_03 et écarts en étape 2:
   - créer backup avant modification:
     - format: `nom_fichier.xlsx.bak_YYYYMMDD_HHMMSS`
   - appliquer correction strictement dans `02_COMPTABILITE`,
   - préserver les formules/mise en page/protections autant que possible.
6) Vérifier après correction (relecture) qu’il n’y a plus d’écarts sur les points corrigés.

## Contraintes techniques
- Utiliser des actions non destructives.
- Ne jamais supprimer un fichier sans backup.
- Si mot de passe/protection Excel bloque une correction:
  - ne pas casser le fichier,
  - documenter le blocage précisément.

## Format de sortie obligatoire
1) Résumé exécutif (5 lignes max).
2) Étape 1 — Site vs 03_COMMERCIAL:
   - Statut: OK | Écarts détectés
   - Tableau: Offre | Champ | Site | 03_COMMERCIAL | Impact
3) Étape 2 — 03_COMMERCIAL vs 02_COMPTABILITE:
   - Statut avant correction: OK | Écarts détectés
   - Si corrections appliquées:
     - fichiers modifiés,
     - backups créés (chemins exacts),
     - champs/lignes corrigés.
   - Statut après correction: OK | Reste des écarts
4) Blocages / ambiguïtés (si présents).
5) Conclusion finale:
   - `SITE_vs_03_COMMERCIAL = OK|KO`
   - `03_COMMERCIAL_vs_02_COMPTABILITE = OK|KO`

Commence maintenant en MODE_SYNC={MODE_SYNC}. Si un prérequis manque, pose une hypothèse explicite et continue.
```

