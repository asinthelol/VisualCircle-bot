# Instructions to build the Docker image

# Using Node.js version 22
FROM node:22

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
RUN npm install --production

# B) Copy application source
COPY . .

# Ensure the user-content/images directory exists (used by saveImage)
RUN mkdir -p ./src/user-content/images

ENV NODE_ENV=production

CMD ["node", "src/index.mjs"]