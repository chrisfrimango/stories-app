# CHANGELOG

### 2024-12-18 fix: Github action

- **Beskrivning**:
  - Fix och debuggging av CI/CD Github action

### 2024-12-17 fix: Github action

- **Beskrivning**:
  - Implementerar CI/CD Github action

### 2024-12-16 feat: post filtering

- **Beskrivning**:
  - Implementerar ny PostFilter-komponent

### 2024-12-16 feat: GitHub Actions CI/CD and Database Migrations

- **Beskrivning**:
  - Implementerar GitHub Actions workflow för CI/CD
  - Lägger till databasmigreringar för automatisk setup
  - coverage reporting
  - Konfigurerar GitHub Secrets för säker hantering av miljövariabler
  - Optimerar CI pipeline med caching för Node modules och Cypress binary

### 2024-12-12 feat: Cypress test updates

- **Beskrivning**:
  - Uppdaterar, adderar och förbättrar tester.

### 2024-12-11 feat: profile and post enhancements, Cypress test updates

- **Beskrivning**:
  - Förbättrar användarhantering och uppdaterar typer
  - Uppdaterar Cypress-komponenttester och lägger till nytt Cypress-test för `DeleteProfile`
  - Förbättrar layout-komponenten för bättre UI-hantering och responsivitet.
  - Allmäna uppdateringar

#### 2024-12-10 feat: profile management, password change, and cypress test improvements

- **Beskrivning**:
  - Implementerar lösenordsändring
  - Omstrukturerar Cypress-tester och lägger till för profilhantering och lösenordsändring
  - Skapar ny modal context för bättre UI-hantering
  - Förbättrar layout-komponenten

#### 2024-12-09 feat: user and category management, Cypress tests, UI enhancements

- **Beskrivning**:
  - Utökar användarhantering med nya funktioner
  - Lägger till hantering av kategorier med nya controllers och routes.
  - Förbättrar layout och navigering i frontend,
  - Implementerar nya Cypress-tester
  - Lägger till nya typer
  - Förbättrar fel- och laddningshantering i UI-komponenter.
  - Skapat alert context
  - Skapat en hook för profilhantering.

#### 2024-12-06 feat: stories functions, add post management, post backend logic, layout and starting cypress

- **Beskrivning**:
  - Implementerar funktionalitet för stories/posts.
  - Lägger till hantering av inlägg (skapa, redigera, ta bort).
  - Implementerar backend-logik för posts med API-endpoints.
  - Fortsatt arbete med layout och styling.
  - Påbörjar implementation av Cypress-tester för komponenter

#### 2024-12-05 feat: layout, routes, register wip

- **Beskrivning**:
  - Grundläggande layout för applikationen.
  - Forsatt arbete med auth-delen
  - Design av UI för grundläggande layout (t.ex. header, footer, main content).
  - Skapande av routes för sidor som "Home", "Login", och "Register".
  - Implementerar routing för navigering mellan olika sidor.
  - Förberedande arbete för registreringsformulär och integration med backend.

#### 2024-12-04 feat: auth, backend logic, database and frontend login ui

- **Beskrivning**:
  - Lägger till autentiseringslogik i backend och frontend.
  - Designar och implementerar UI för login-formulär med validering.
  - Feedback till användaren vid lyckad eller misslyckad inloggning.
  - Kopplar backend-logik till databasen för hantering av användare.
  - Skapande av API-endpoints för login och token-baserad autentisering.
  - Koppling till databasen för validering av användaruppgifter.
  - Implementerar säkerhetshantering, som bcrypt för lösenordshashning.

#### 2024-12-03 setup backend structure, dependencies etc

- **Beskrivning**:
  - Grundläggande backend-struktur för projektet.
  - Installerar och konfigurerar nödvändiga beroenden för server och API.
  - Mappar för controllers, routes, middleware, och services.
  - Skapar grundläggande serverkonfiguration osv.
  - Läser in miljövariabler

#### 2024-12-03 setup project structure and dependencies

- **Beskrivning**:
  - Grundläggande projektuppsättning främst för frontend.
  - Installerar och konfigurerar initiala beroenden.
  - Skapar mappar för komponenter, sidor, och utils.
  - Grundläggande mappstruktur och installerar nödvändiga paket och dependencies.
  - Konfigurerar projektverktyg som ESLint och Prettier för kodkvalitet mfl.
  - Intierar en grund för github workflows

#### 2024-12-03 initial commit

- **Beskrivning**:
  - Skapar ett tomt repository och initial projektuppsättning för ett vite / react projekt.
  - Skapar grundläggande projektfiler, som:
  - `.gitignore`
  - `README.md`
  - Initerar Git och gör den första commit:en.
