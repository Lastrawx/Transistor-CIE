# Transistor&CIE — Site vitrine

## Installation
1. `npm i`
2. `npm run dev`

## Build
1. `npm run build`
2. `npm run preview`

## Déploiement Netlify
1. Pushez le projet sur GitHub.
2. Dans Netlify : **New site from Git**.
3. Build command : `npm run build`
4. Publish directory : `dist`
5. Le fichier `netlify.toml` gère le redirect SPA.
6. Si Netlify bloque la build sur un faux positif (`AIza...`), ajoutez la valeur Firebase Web API key dans `SECRETS_SCAN_SMART_DETECTION_OMIT_VALUES`.

## Configuration Firebase (formulaire + admin)
1. Créez un projet Firebase avec **Firestore** et **Authentication (Email/Password)** activés.
2. Collez les règles depuis `firestore.rules` dans **Firestore > Rules**.
3. Collez la configuration Firebase dans `src/firebase.ts`.
4. Créez un utilisateur admin dans **Firebase Auth** (email/mot de passe).
5. Activez **App Check** (provider reCAPTCHA v3) et vérifiez/remplacez la clé reCAPTCHA dans `src/firebase.ts`.
6. Attribuez le rôle admin (custom claim) à votre compte :
   - Préparez un accès Admin SDK (au choix) :
   - `GOOGLE_APPLICATION_CREDENTIALS=/chemin/vers/service-account.json`
   - ou `FIREBASE_SERVICE_ACCOUNT_JSON='{\"type\":\"service_account\",...}'`
   - Lancez : `npm run set-admin-claim -- votre-email@domaine.com true`
   - Déconnectez/reconnectez ensuite le compte dans `/admin-cagnat`.
7. Le formulaire écrit dans la collection `devis` et la page `/admin-cagnat` affiche les demandes.

## Domaine personnalisé
1. Dans Netlify : **Domain settings** > **Add domain**.
2. Ajoutez les DNS demandés (CNAME `www` + enregistrement `@`).
3. HTTPS est activé automatiquement.

## Contenus
Les textes et services sont centralisés dans `src/content/` pour une édition rapide.
