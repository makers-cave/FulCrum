# Development Setup Guide

This guide helps you set up a **React + Node.js + PostgreSQL fullstack** development environment on **Windows** and **macOS**.

---

## Prerequisites

- **Git**  
    [Download Git](https://git-scm.com/downloads)

- **Node.js (LTS version recommended)**  
    [Download Node.js](https://nodejs.org/en/download/)

- **PostgreSQL**  
    [Download PostgreSQL](https://www.postgresql.org/download/)

- **Yarn (optional, if your project uses it)**  
    [Install Yarn](https://classic.yarnpkg.com/en/docs/install/)

- **Code Editor (VS Code recommended)**  
    [Download Visual Studio Code](https://code.visualstudio.com/Download)

---

## Windows Setup

1. **Install Git**  
    Download and install from [here](https://git-scm.com/download/win).

2. **Install Node.js**  
    Download and install from [here](https://nodejs.org/en/download/).

3. **Install PostgreSQL**  
    Download and install from [here](https://www.postgresql.org/download/windows/).

4. **(Optional) Install Yarn**  
    Open Command Prompt and run:  
    ```sh
    npm install --global yarn
    ```

5. **Clone the Repository**  
    ```sh
    git clone https://github.com/makers-cave/FulCrum.git
    cd FulCrum
    ```

6. **Install Dependencies**  
    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
    # or
    cd frontend
    yarn install
    cd ../backend
    yarn install
    ```

7. **Configure PostgreSQL Database**  
    - Create a new database and user using [pgAdmin](https://www.pgadmin.org/download/) or `psql` CLI.
    - Update your environment variables (e.g., `.env`) with your PostgreSQL credentials:
      ```
      DB_HOST=localhost
      DB_PORT=5432
      DB_USER=your_username
      DB_PASSWORD=your_password
      DB_NAME=your_database
      ```

8. **Run Database Migrations/Seed (if applicable)**  
    ```sh
    npm run migrate
    # or
    yarn migrate
    ```

9. **Start Backend Server**  
    ```sh
    npm run server
    # or
    yarn server
    ```

10. **Start Frontend (React) App**  
    ```sh
    npm start
    # or
    yarn start
    ```

---

## macOS Setup

1. **Install Homebrew (recommended for package management)**  
    [Install Homebrew](https://brew.sh/)

2. **Install Git**  
    ```sh
    brew install git
    ```

3. **Install Node.js**  
    ```sh
    brew install node
    ```

4. **Install PostgreSQL**  
    ```sh
    brew install postgresql
    brew services start postgresql
    ```

5. **(Optional) Install Yarn**  
    ```sh
    brew install yarn
    ```

6. **Clone the Repository**  
    ```sh
    git clone <repository-url>
    cd <project-folder>
    ```

7. **Install Dependencies**  
    ```sh
    npm install
    # or
    yarn install
    ```

8. **Configure PostgreSQL Database**  
    - Create a new database and user:
      ```sh
      psql postgres
      CREATE DATABASE your_database;
      CREATE USER your_username WITH ENCRYPTED PASSWORD 'your_password';
      GRANT ALL PRIVILEGES ON DATABASE your_database TO your_username;
      ```
    - Update your environment variables (e.g., `.env`) with your PostgreSQL credentials.

9. **Run Database Migrations/Seed (if applicable)**  
    ```sh
    npm run migrate
    # or
    yarn migrate
    ```

10. **Start Backend Server**  
    ```sh
    npm run server
    # or
    yarn server
    ```

11. **Start Frontend (React) App**  
    ```sh
    npm start
    # or
    yarn start
    ```

---
## Notes
- Configire VSCode for tailswind to avoid Unknown at rule @custom-variant css(unknownAtRules) error (https://github.com/tailwindlabs/tailwindcss-intellisense?tab=readme-ov-file#recommended-vs-code-settings) 
- Add tailswind vscode extension
- Import global.css in the page.tsx
## Additional Resources

- [GitHub CLI](https://cli.github.com/)
- [nvm (Node Version Manager) for macOS](https://github.com/nvm-sh/nvm)
- [nvm-windows](https://github.com/coreybutler/nvm-windows)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [pgAdmin (PostgreSQL GUI)](https://www.pgadmin.org/)
- [shadCN (Component Library)](https://ui.shadcn.com/)
- [Lucide icons](https://lucide.dev/)
---