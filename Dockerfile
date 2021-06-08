
# Declearing Re-usable base image 
# helps to control base image 
FROM node:14-alpine AS base

# Create builder image 
# Where project application is build
FROM base as builder
# Specify our working directory, this is in our container/in our image
WORKDIR /app

# Copy the package.jsons from host to container
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
 
# Here we install all the deps
RUN npm install abc

# Bundle app source / copy all other files
COPY . .

# Build the app to the /dist folder
ENTRYPOINT ["npm","run"]
CMD ["build"]

# Final build images
FROM base as build

WORKDIR /app

# Copying  package.json and package-lock.json to current workdir 
COPY --from=builder /app/package*.json ./

# Install production dependency only
RUN npm ci --only=production

# Copy build files from builder 
COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENTRYPOINT ["node","dist/main"]
