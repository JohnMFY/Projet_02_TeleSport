# ARCHITECTURE

## ANALYSE D'ARCHITECTURE

### Issues :
1. il n'y a pas d'interface et beaucoup d'utilisation de "any" alors que l'on connais la composition des datas
2. l'intégralité des data mocké sont dans un console.log()
3. Duplication de  private olympicUrl = './assets/mock/olympic.json'; entre les composants
4. Dans country.components.ts on a rien si le pays n'est pas trouvé 
5. Des tests ne sont pas pertinant exemple : celui qui test TITLE dans app.component.spec.ts
6. la page n'est pas responsive
7. Le header n'est visible que sur la page Dashboard

### solutions:
1. créer un dossier models dans app où l'on pourra y mettre des fichier .ts qui auront chacun une interface réutilisable
2. Nettoyer le code des console.log()
3. Créer un service ou les données seraient centralisés
4. Verifier que le pays n'est pas "undifined" et rediriger le user vers une page d'erreur
5. Supprimer les test non pertinant
6. Rendre la page responsive avec des media query
7. Créer un header.component qui sera sur chaque pages


## ARCHITECTURE PROPOSÉE

### STRUCTURE

```text
src/
└── app/
    ├── components/
    │   ├── header/
    │   │   ├── header.component.ts
    │   │   ├── header.component.html
    │   │   └── header.component.scss
    │   │
    │   └── bar-chart/
    │       ├── bar-chart.component.ts
    │       ├── bar-chart.component.html
    │       └── bar-chart.component.scss
    │
    ├── models/
    │   ├── olympic.model.ts
    │   └── participation.model.ts
    │
    ├── pages/
    │   ├── Dashboard/
    │   │   ├── Dashboard.component.ts
    │   │   ├── Dashboard.component.html
    │   │   ├── Dashboard.component.scss
    │   │   └── Dashboard.component.spec.ts
    │   │
    │   ├── CountryDetail/
    │   │   ├── CountryDetail.component.ts
    │   │   ├── CountryDetail.component.html
    │   │   ├── CountryDetail.component.scss
    │   │   └── CountryDetail.component.spec.ts
    │   │
    │   └── not-found/
    │       ├── not-found.component.ts
    │       ├── not-found.component.html
    │       ├── not-found.component.scss
    │       └── not-found.component.spec.ts
    │
    ├── services/
    │   └── data.service.ts
    │
    ├── app-routing.module.ts
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.scss
    └── app.module.ts
```
### DATA

```text
olympic.json
    ↓
DataService
    ↓
Dashboard / Country
```
### UX
- En tant que user, j'arrive sur Dashboard et je visualise le graphique des médailles avec tous les pays.

- En tant que user, je clique sur un pays dans le graphique et je suis redirigé vers la page de ce pays.

- En tant que user, j'arrive sur la page d'un pays et je visualise ses participations, son nombre d'athlètes, son total de médailles et l'évolution des médailles.

- En tant que user, je clique sur le bouton retour et je reviens sur Dashboard.

- En tant que user, je saisis directement l'URL d'un pays.
    _ Si le pays existe = la page du pays s'affiche.
    _ Si le pays n'existe pas = un message d'erreur avec un bouton back pour me redirigé vers Dashboard.

- En tant que user, si les données sont en cours de chargement = un spinner ou un squelette simple.

- En tant que user, si aucune donnée n'est disponible = un message "Aucune donnée" avec un bouton back pour me redirigé vers Dashboard.

- En tant que user, si une erreur survient = un message d'erreur avec un bouton back pour me redirigé vers Dashboard.