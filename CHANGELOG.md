# CHANGELOG

### 2024-12-19 docs: update README and test structure

- **Description**:
  - Reorganizes test data in cypress
  - Improves documentation of API endpoints
  - Clarifies test setup and structure

### 2024-12-18 fix: Github action

- **Description**:
  - Fix and debugging of CI/CD Github action

### 2024-12-17 fix: Github action

- **Description**:
  - Implements CI/CD Github action

### 2024-12-16 feat: post filtering

- **Description**:
  - Implements new PostFilter component

### 2024-12-16 feat: GitHub Actions CI/CD and Database Migrations

- **Description**:
  - Implements GitHub Actions workflow for CI/CD
  - Adds database migrations for automatic setup
  - Coverage reporting
  - Configures GitHub Secrets for secure handling of environment variables
  - Optimizes CI pipeline with caching for Node modules and Cypress binary

### 2024-12-12 feat: Cypress test updates

- **Description**:
  - Updates, adds and improves tests.

### 2024-12-11 feat: profile and post enhancements, Cypress test updates

- **Description**:
  - Improves user management and updates types
  - Updates Cypress component tests and adds new Cypress test for `DeleteProfile`
  - Improves layout component for better UI handling and responsiveness
  - General updates

#### 2024-12-10 feat: profile management, password change, and cypress test improvements

- **Description**:
  - Implements password change
  - Restructures Cypress tests and adds tests for profile management and password change
  - Creates new modal context for better UI handling
  - Improves layout component

#### 2024-12-09 feat: user and category management, Cypress tests, UI enhancements

- **Description**:
  - Expands user management with new features
  - Adds category management with new controllers and routes
  - Improves layout and navigation in frontend
  - Implements new Cypress tests
  - Adds new types
  - Improves error and loading handling in UI components
  - Creates alert context
  - Creates a hook for profile management

#### 2024-12-06 feat: stories functions, add post management, post backend logic, layout and starting cypress

- **Description**:
  - Implements functionality for stories/posts
  - Adds post management (create, edit, delete)
  - Implements backend logic for posts with API endpoints
  - Continued work on layout and styling
  - Begins implementation of Cypress component tests

#### 2024-12-05 feat: layout, routes, register wip

- **Description**:
  - Basic layout for the application
  - Continued work on auth part
  - Design of UI for basic layout (e.g., header, footer, main content)
  - Creation of routes for pages like "Home", "Login", and "Register"
  - Implements routing for navigation between different pages
  - Preparatory work for registration form and backend integration

#### 2024-12-04 feat: auth, backend logic, database and frontend login ui

- **Description**:
  - Adds authentication logic in backend and frontend
  - Designs and implements UI for login form with validation
  - User feedback for successful or failed login
  - Connects backend logic to database for user management
  - Creation of API endpoints for login and token-based authentication
  - Database connection for validation of user credentials
  - Implements security handling, such as bcrypt for password hashing

#### 2024-12-03 setup backend structure, dependencies etc

- **Description**:
  - Basic backend structure for the project
  - Installs and configures necessary dependencies for server and API
  - Folders for controllers, routes, middleware, and services
  - Creates basic server configuration etc.
  - Loads environment variables

#### 2024-12-03 setup project structure and dependencies

- **Description**:
  - Basic project setup mainly for frontend
  - Installs and configures initial dependencies
  - Creates folders for components, pages, and utils
  - Basic folder structure and installs necessary packages and dependencies
  - Configures project tools like ESLint and Prettier for code quality etc.
  - Initiates a foundation for github workflows

#### 2024-12-03 initial commit

- **Description**:
  - Creates an empty repository and initial project setup for a vite / react project
  - Creates basic project files, such as:
  - `.gitignore`
  - `README.md`
  - Initiates Git and makes the first commit
