# Prompt Codex VS Code — Action Sync Offres & Prix (Site -> Générateur -> 03_COMMERCIAL)

Copie/colle ce prompt dans Codex quand tu veux exécuter ce nouveau workflow de contrôle + synchronisation.

```text
Tu es un agent d’action (pas un simple audit).

Objectif global:
1) Contrôler la cohérence des offres entre le site (source suprême) et le générateur de devis.
2) NE PAS modifier le générateur de devis à cette étape: proposer les corrections.
3) Synchroniser `03_COMMERCIAL` avec la source canonique définie ci-dessous.

## Ordre de vérité (obligatoire)
1. Le site fait foi suprême pour les OFFRES.
2. Le site fait foi suprême aussi pour les PRIX s’ils sont explicitement affichés sur le site.
3. Sinon, pour les PRIX, le générateur de devis fait foi.
4. `03_COMMERCIAL` est une archive marketing fiable/lisible à maintenir alignée avec cette vérité.

## Règles métier obligatoires
- Étape A (Site vs Générateur): diagnostic + propositions uniquement, AUCUNE modification du générateur.
- Étape B (Source canonique vs 03_COMMERCIAL): si écart et mode apply, corriger `03_COMMERCIAL`.
- Ne rien écrire hors `03_COMMERCIAL` pendant les corrections.
- Si une correspondance est ambiguë, ne pas inventer: signaler clairement en blocage.

## Paramètres de run
- PROD_URL: {url production}
- MODE_SYNC: {check_only|apply_03_from_sources} (par défaut: apply_03_from_sources)

## Périmètre fichiers
- Source site (vérité offres): `04_SITE_WEB/Transistor&CIE/src/content/services.ts`
- Source prix opérationnelle: `02_COMPTABILITE/03_Generateur_de_devis_Transistor-CIE_2026.xlsx`
- Cible de synchronisation:
  - `03_COMMERCIAL/01_Grilles_tarifaires_Transistor-CIE_2026.xlsx`
  - `03_COMMERCIAL/02_Offres_Particuliers_Transistor-CIE_2026.xlsx`
  - `03_COMMERCIAL/03_Offres_Entreprises_Transistor-CIE_2026.xlsx`
- Cible secondaire si trouvée:
  - autres `.xlsx` de `03_COMMERCIAL` contenant offres/prix/actions.

## Données à comparer (minimum)
### Étape A — Site vs Générateur (proposition uniquement)
Comparer au minimum:
- liste des offres (particuliers + entreprises), ordre logique (abonnements en tête),
- identifiants/correspondances d’offres,
- intitulés (`title`), résumé (`offer`), modalités, éléments principaux (`includes`, sémantique),
- structure packs/actions associées aux offres dans le générateur,
- prix/unités affichés explicitement sur le site (si présents) vs générateur.

### Étape B — Source canonique vs 03_COMMERCIAL
Construire la source canonique avant comparaison:
- OFFRES = Site.
- PRIX = Site si prix explicite disponible, sinon Générateur.
Puis comparer au minimum:
- catalogue offres (IDs + intitulés),
- packs/offres composées,
- catalogue actions/interventions,
- grille tarifaire (libellés + prix + unité),
- formulations clés impactant devis/facture/marketing.

## Procédure obligatoire
1) Lire et extraire les offres du site (`services.ts`).
2) Lire le générateur de devis et produire le diff détaillé vs site (Étape A).
3) En Étape A: ne rien modifier, proposer précisément les modifications à faire dans le générateur (fichier/onglet/champ/cellule).
4) Construire la source canonique (offres du site + règles de priorité prix).
5) Lire `03_COMMERCIAL`, comparer à la source canonique (Étape B).
6) Si MODE_SYNC=apply_03_from_sources et écarts en Étape B:
   - créer un backup avant chaque modification:
     - format: `nom_fichier.xlsx.bak_YYYYMMDD_HHMMSS`
   - appliquer les corrections strictement dans `03_COMMERCIAL`,
   - préserver formules/mise en page/protections autant que possible.
7) Vérifier après correction (relecture) qu’il n’y a plus d’écarts sur les points corrigés.

## Contraintes techniques
- Utiliser des actions non destructives.
- Ne jamais supprimer un fichier sans backup.
- Ne pas modifier `02_COMPTABILITE` dans ce workflow.
- Si mot de passe/protection Excel bloque une correction:
  - ne pas casser le fichier,
  - documenter le blocage précisément.

## Format de sortie obligatoire
1) Résumé exécutif (5 lignes max).
2) Étape A — Site vs Générateur:
   - Statut: OK | Écarts détectés
   - Tableau: Offre | Champ | Site | Générateur | Impact
   - Propositions de correction générateur (sans application): Fichier | Onglet | Cellule/zone | Valeur proposée | Justification
3) Étape B — Source canonique vs 03_COMMERCIAL:
   - Statut avant correction: OK | Écarts détectés
   - Si corrections appliquées:
     - fichiers modifiés,
     - backups créés (chemins exacts),
     - champs/lignes corrigés.
   - Statut après correction: OK | Reste des écarts
4) Blocages / ambiguïtés (si présents).
5) Conclusion finale:
   - `SITE_vs_GENERATEUR_OFFRES = OK|KO`
   - `PRIX_SITE_vs_GENERATEUR = OK|KO|N/A`
   - `SOURCE_CANONIQUE_vs_03_COMMERCIAL = OK|KO`
   - `MODIFICATIONS_03_COMMERCIAL = OUI|NON`

Commence maintenant en MODE_SYNC={MODE_SYNC}. Si un prérequis manque, pose une hypothèse explicite et continue.
```
