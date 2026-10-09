# plugin.usecockpit.co

Site statique de la marketplace des serveurs MCP open source de [Cockpit](https://usecockpit.co).

| Page | Rôle |
|---|---|
| `/` | Accueil et liste des plugins |
| `/google-multi/` | Plugin Google Multi-Account (Gmail, Agenda, Drive, plusieurs comptes) |
| `/privacy/` | Politique de confidentialité, conforme au règlement Google API Services (Limited Use) |
| `/terms/` | Conditions d'utilisation et mentions légales |

## Développement

Aucune étape de build : le site est dans `public/`.

```bash
npm start
```

```bash
npm run check
```

`npm run check` vérifie les liens internes et l'absence de tirets longs. La CI le lance avant chaque publication.

## Publication sur GitLab Pages

1. Pousser ce dépôt sur GitLab : le job `pages` de `.gitlab-ci.yml` publie `public/` sur la branche par défaut.
2. Dans **Deploy > Pages**, ajouter le domaine `plugin.usecockpit.co`.
3. Chez le registrar de `usecockpit.co`, créer les deux enregistrements indiqués par GitLab :
   - `CNAME plugin` vers `<namespace>.gitlab.io`
   - `TXT _gitlab-pages-verification-code.plugin` avec le code de vérification
4. Activer le certificat Let's Encrypt automatique et « Force HTTPS ».

## Ajouter un plugin

Créer `public/<plugin>/index.html` en copiant `public/google-multi/index.html`, puis ajouter sa carte dans la grille de `public/index.html`.
