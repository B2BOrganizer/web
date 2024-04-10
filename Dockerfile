# pull official base image
FROM node:21-alpine

RUN apk add --update --no-cache python3
RUN apk add --update --no-cache build-base

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install --silent

# add app
COPY docker ./

# start app
CMD ["npm", "run", "build"]

EXPOSE 5173