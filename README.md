## XCloneNode GraphQL API

The XCloneNode GraphQL API, built with Express and Apollo Server, empowers tweet-related functionalities while ensuring secure authentication and authorization with JWT. User sessions are efficiently managed using Redis as a persistent store, ensuring scalability and responsiveness.

## Overview

- **Express and Apollo Server:** The GraphQL API is implemented using Express and Apollo Server, providing a robust and efficient server setup.

- **JWT-based Authentication/Authorization:** Secure tweet-related functionalities are powered by JWT-based authentication and authorization, ensuring a secure and seamless user experience.

- **Redis for Session Management:** User sessions are managed using Redis as a persistent store, enhancing scalability and responsiveness of the application.

- **Prisma as the Database Client:** Prisma serves as the database client, connecting to a schema defined in `prisma/schema` with migration support, ensuring efficient and reliable database operations.

- **Secure Session Handling:** The app employs secure session handling, featuring a long-lived JWT authentication system and strict cookie settings for enhanced security.

## Project Structure
```plaintext
/xclonenode
|-- docker-compose.yml
|-- %home%m%nodeprj%xclonenode.vim
|-- init-scripts
|-- package.json
|-- pnpm-lock.yaml
|-- README.md
|-- tsconfig.json
|-- Dockerfile
|-- index.js
|-- node_modules
|-- package-lock.json
|-- prisma
|-- src
```

## Getting Started

1. Run Prisma migration:
   ```bash
   npx prisma migrate dev --name init
   ```

2. Explore the various functionalities of the GraphQL API.

Feel free to contribute, report issues, or provide feedback. Let's collaborate to enhance and optimize the XCloneNode GraphQL API!
