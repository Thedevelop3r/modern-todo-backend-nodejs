# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.8.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.

WORKDIR /app

COPY package*.json ./

USER root

RUN npm install

COPY . . 

EXPOSE 8000 

CMD npm start
