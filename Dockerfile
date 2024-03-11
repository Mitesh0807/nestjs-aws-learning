FROM node:alpline as development

WORKDIR /usr/src/app

COPY package*.json ./ 

COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpline as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

COPY package-lock.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist 

CMD ["node", "dist/apps/reservations/main"]

