FROM node:14 as dev

WORKDIR /usr/src/app


CMD ["npm", "run", "dev"]

FROM node:14 as prod

ENV PORT 5000
ARG PORT=${PORT}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD exec npm run start