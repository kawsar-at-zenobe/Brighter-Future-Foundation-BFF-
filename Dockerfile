# Use an official Node.js runtime as a base image
FROM --platform=linux/amd64 node:20

ARG NODE_AUTH_TOKEN

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY .npmrc ./
COPY src ./
RUN npm ci
RUN npm run build

COPY . .

CMD ["node", "dist/main.js"]
