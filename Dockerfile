# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.8.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app

COPY package*.json ./

USER root

RUN chown -R app:app .

USER app

RUN npm install

COPY . . 

EXPOSE 8000 

CMD npm start
