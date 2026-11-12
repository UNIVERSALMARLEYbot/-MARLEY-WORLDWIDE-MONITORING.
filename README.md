# 🐶 Marley Monitoring Worldwide — V1 fonctionnelle

Application web responsive (iPhone / Android / ordinateur), 11 domaines, carte interactive Leaflet, veille mondiale et trois branches de Market Intelligence : **Bourse / Devises (Forex) / Crypto**.

## Démarrage sur ordinateur (Node.js 20+)

```bash
npm install
npm run dev
```

Ouvrez **http://localhost:5173**. Le serveur local de données tourne sur le port 3001. Pour voir uniquement les pages statiques après compilation, `npm run build` puis `npm run preview` (attention : les API `/api/*` nécessitent également un backend).

## Publication GitHub + Vercel

1. Créer un dépôt GitHub vide `marley-monitoring-worldwide`.
2. Dans ce dossier, exécuter :
   ```bash
   git init
   git add .
   git commit -m "Marley Monitoring V1"
   git branch -M main
   git remote add origin https://github.com/TON_COMPTE/marley-monitoring-worldwide.git
   git push -u origin main
   ```
3. Sur https://vercel.com/new, sélectionner **Import Git Repository**, choisir ce dépôt.
4. Framework **Vite** (détecté automatiquement), `npm run build`, dossier de sortie `dist` ; les fonctions dans `api/` sont déployées côté serveur.
5. Cliquer **Deploy**. Vercel fournit une URL en `*.vercel.app` ; configurer éventuellement votre domaine dans **Project > Settings > Domains**.
6. Facultatif : dans **Settings > Environment Variables**, ajouter `COINGECKO_DEMO_KEY` (clé Demo gratuite depuis CoinGecko), puis redéployer. Ne jamais inscrire cette clé dans le code public.
7. Sur iPhone : Safari > ouvrir votre URL > Partager > **Sur l'écran d'accueil**.

## Sources et limites de la V1

| Domaine | Source | Ce qui fonctionne |
|---|---|---|
| Séismes | USGS | Séismes M4,5+ des dernières 24h avec localisation et lien source |
| Événements naturels | NASA EONET v3 | Événements ouverts avec coordonnées de type Point et liens source |
| 11 catégories thématiques | GDELT DOC 2.0 | Articles par thème au cours des 24 dernières heures, titres originaux et liens |
| Crypto | CoinGecko | Cotations USD, variations 24h, volumes/capitalisations dans l'API |
| Devises | Frankfurter | Taux de référence publiés par les banques centrales ; **pas du Forex tick-by-tick** |
| Bourse | Stooq | Instantanés différés lorsque les symboles Stooq sont accessibles ; **aucun cours inventé** |

Les 11 catégories ont une navigation et un fil thématique réel via GDELT. Toutes les catégories ne disposent **pas encore** d'une base d'événements dédiée ni d'une cartographie propre. La carte V1 représente uniquement des séismes et événements naturels NASA, et **ne doit pas être interprétée comme une carte exhaustive de conflits ou de mouvements militaires**.

Les signaux haussiers/baissiers classent les **variations crypto observées sur 24 h**. Ils ne sont PAS des prédictions, ni des probabilités de gains. Aucun score IA non validé n'est inventé. Les améliorations prévues sont : RSI/MACD/volumes, backtests, horizons de prévision, validation hors-échantillon, historique et calendrier macro.

Les sources peuvent appliquer des quotas, des restrictions géographiques, des modifications d'API ou des coûts. Le serveur retourne une erreur explicite et l'interface affiche « indisponible » si un fournisseur échoue. Ce projet **n'inclut pas de flux d'ordres ni de connexion à des comptes de trading**.

## Architecture

- `src/main.jsx` : interface React, 11 domaines, carte interactive, filtres, marchés et alertes de disponibilité.
- `src/style.css` : charte premium noir / vert néon, responsive iPhone et desktop.
- `api/events.js` : USGS + NASA EONET.
- `api/news.js` : GDELT par catégorie, requêtes contrôlées par liste blanche.
- `api/crypto.js` : CoinGecko (clé Demo facultative).
- `api/forex.js` : Frankfurter.
- `api/stocks.js` : Stooq (données différées, disponibilité variable).
- `dev-api.mjs` : serveur des mêmes fonctions pour développement local.
- `public/manifest.webmanifest` : installation PWA basique. **Pas de push notifications ni de fonctionnement hors ligne** dans cette version.

## Sécurité et exploitation

Ne commitez jamais les clés `.env`. Les appels externes passent par des fonctions serveur, sans URL arbitraire fournie par l'utilisateur. Les articles sont affichés sous forme de liens texte (pas de HTML injecté). Des caches `s-maxage` modèrent les quotas. Avant une diffusion à large audience, ajouter monitoring, tests end-to-end, politiques de licences par fournisseur, cache centralisé et protection contre l'abus d'API.

## Identité et propriété intellectuelle

L'interface et les fichiers de cette V1 sont conçus pour le projet Marley Monitoring. Les images de maquette ne sont pas des composants du site. Les fonds de carte et données externes restent soumis à leurs licences et conditions ; conserver les attributions à leurs fournisseurs.
