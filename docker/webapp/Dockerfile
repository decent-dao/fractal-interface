FROM node:18.12.1

# Set build-time arguments
ARG VITE_APP_TESTING_ENVIRONMENT
ARG VITE_APP_LOCAL_CHAIN_ID
ARG VITE_APP_LOCAL_PROVIDER_URL

# Set environment variables
ENV VITE_APP_TESTING_ENVIRONMENT=$VITE_APP_TESTING_ENVIRONMENT
ENV VITE_APP_LOCAL_CHAIN_ID=$VITE_APP_LOCAL_CHAIN_ID
ENV VITE_APP_LOCAL_PROVIDER_URL=$VITE_APP_LOCAL_PROVIDER_URL

# Set working directory
WORKDIR /fractal-webapp/

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Copy the entrypoint script
COPY ./docker/webapp/entrypoint.sh /usr/local/bin

ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]
