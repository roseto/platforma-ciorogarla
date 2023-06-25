# Contribuie

:wave: Bun venit! Mulțumim că dorești să contribui la acest proiect. Aici vei găsi informații despre cum poți contribui.

## Commit-uri

[Conventional Commits](https://www.conventionalcommits.org/) este un set de reguli pentru a standardiza mesajele commit-urilor. Acesta este un exemplu de mesaj de commit:

```
feat: adaugă o nouă pagină de știri
```

> Pentru utilizatorii de VS Code recomandam extensia [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits).

### Tipuri de commit-uri

-   `feat`: adaugă o nouă funcționalitate
-   `fix`: repară o eroare
-   `docs`: modifică documentația
-   `style`: modifică stilul
-   `refactor`: modifică codul, dar nu repară o eroare și nu adaugă o funcționalitate nouă
-   `perf`: modifică codul pentru a îmbunătăți performanța
-   `build`: modifică configurația de build
-   `ci`: modifică configurația CI
-   `chore`: modifică alte fișiere
-   `revert`: revine la un commit anterior

### Convenții de commit-uri

-   folosește verbul la timpul prezent
-   folosește prima literă mică
-   nu folosi punct la sfârșitul mesajului
-   folosește un singur commit pentru fiecare funcționalitate

## Branch-uri

Branch-ul `main` este branch-ul principal pentru development. De regula pull request-urile sunt create din branch-uri separate, care sunt șterse după ce pull request-ul este aprobat.

Branch-ul `production` este branch-ul principal pentru producție. Acesta este actualizat automat de Netlify la fiecare push pe branch-ul `main`. Nu se fac modificări direct pe acest branch.

## Pull request-uri

Pull request-urile sunt binevenite. Pentru modificări majore, te rugăm să deschizi mai întâi un issue pentru a discuta despre modificările pe care dorești să le faci.

## Licență

Acest proiect este licențiat sub licența [AGPL-3.0](/LICENSE).
