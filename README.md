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

`npm run check` vérifie les liens internes et l'absence de tirets longs. La CI GitHub Actions le lance sur chaque push et chaque pull request.


## Ajouter un plugin

Créer `public/<plugin>/index.html` en copiant `public/google-multi/index.html`, puis ajouter sa carte dans la grille de `public/index.html`.
