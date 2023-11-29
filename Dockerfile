# Use the official Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies using pnpm
COPY package.json .
RUN npm install -g pnpm && pnpm install --only=prod

# Copy only necessary files and directories, excluding node_modules and other unwanted files
COPY src/ src/
COPY prisma/ prisma/
COPY init-scripts/ init-scripts/
COPY tsconfig.json .
COPY .env .
COPY index.js .
COPY package-lock.json .

# Install dependencies, including Prisma, and generate Prisma client during build
RUN pnpm install && pnpm run generate

EXPOSE 3000

# Specify the command to run your application
CMD ["pnpm", "start"]
