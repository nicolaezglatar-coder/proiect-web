# Nicolae Zglatar - Personal Portfolio

Portofoliu personal realizat pentru proiectul final Web 2026. Aplicația este construită cu HTML, CSS și JavaScript simplu, fără framework-uri și fără backend.

Site-ul afișează informații personale de bază, educația, competențele și proiectele publice încărcate dinamic din GitHub API.

## Live Demo

```text
https://nicolaezglatar-coder.github.io/proiect-web/
```

## Funcționalități

- Secțiune de profil cu nume, rol, locație, descriere și poză de profil.
- Secțiune Despre mine.
- Secțiune Educație.
- Secțiune Skill-uri / Competențe.
- Secțiune Proiecte GitHub încărcate dinamic cu `fetch()`.
- Filtrare fork-uri cu `repo.fork === false`.
- Sortare proiecte GitHub după `updated_at`, cele mai recente primele.
- Search după numele sau descrierea proiectului.
- Filtru după limbajul principal al proiectului.
- Loading spinner cât timp se încarcă datele.
- Mesaj de eroare dacă GitHub API nu răspunde.
- Fallback din `projects.json` dacă există mai puțin de 5 proiecte publice non-fork.
- Badge `Local demo` pentru proiectele fallback.
- Design responsive pentru desktop, tabletă și mobil.

## Tehnologii Folosite

- HTML5
- CSS3
- JavaScript
- GitHub API
- JSON local pentru fallback

## Structura Proiectului

```text
final-project/
├── assets/
│   └── profile.jpg
├── index.html
├── projects.json
├── README.md
├── script.js
└── style.css
```

## Rulare Locală

### Varianta 1: Deschidere directă

1. Deschide folderul `final-project`.
2. Deschide fișierul `index.html` în browser.

### Varianta 2: VS Code Live Server

1. Deschide folderul `final-project` în VS Code.
2. Instalează extensia `Live Server`.
3. Click dreapta pe `index.html`.
4. Alege `Open with Live Server`.

Recomandat: folosește Live Server, deoarece unele browsere pot bloca citirea fișierului local `projects.json` când pagina este deschisă direct cu `file://`.

## GitHub API

Aplicația folosește endpoint-ul public:

```text
https://api.github.com/users/nicolaezglatar-coder/repos
```

Nu este folosit token GitHub. Sunt afișate doar repository-urile publice care nu sunt fork-uri.

## Deploy Gratuit

### GitHub Pages

Proiectul este publicat pe GitHub Pages din branch-ul `gh-pages`.

Dacă trebuie refăcut deploy-ul:

1. Fă commit pe branch-ul `main`.
2. Rulează `git push origin main`.
3. Rulează `git push origin main:gh-pages`.
4. În repository, verifică `Settings` -> `Pages`:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages`
   - Folder: `/root`

### Netlify

1. Intră pe `https://www.netlify.com/`.
2. Alege `Add new site`.
3. Încarcă folderul `final-project` sau conectează repository-ul GitHub.
4. Pentru un proiect static nu este nevoie de build command.
5. Publish directory: `/` dacă încarci direct folderul `final-project`.

### Vercel

1. Intră pe `https://vercel.com/`.
2. Importă repository-ul GitHub.
3. Framework preset: `Other`.
4. Build command: gol.
5. Output directory: `.`.
6. Deploy.

## Autor

Nicolae Zglatar  
Sibiu, România  
Email: [zglatarnicolae@gmail.com](mailto:zglatarnicolae@gmail.com)
