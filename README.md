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

## Activer la notification email Netlify Forms
1. Une fois le site déployé, ouvrez **Netlify > Forms > contact**.
2. Ajoutez une notification email vers : `quentin-cagnat@live.fr`.
3. (Optionnel) Ajoutez un auto-répondeur pour l’utilisateur.

## Domaine personnalisé
1. Dans Netlify : **Domain settings** > **Add domain**.
2. Ajoutez les DNS demandés (CNAME `www` + enregistrement `@`).
3. HTTPS est activé automatiquement.

## Contenus
Les textes et services sont centralisés dans `src/content/` pour une édition rapide.
