FROM node:12-slim as base

ENV PORT 5000
ARG PORT=${PORT}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

EXPOSE ${PORT}

FROM base as dev

CMD exec npm run dev

FROM base as prod

COPY . .

RUN npm run build

CMD exec npm run start