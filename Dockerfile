FROM node:18

WORKDIR /app

# Installing dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copying source files
COPY . .

ARG BUILD_ENV=dev
RUN cp .env.${BUILD_ENV} .env.production

# Building app
RUN yarn build
EXPOSE 80

# Running the app
CMD [ "yarn", "start" ]