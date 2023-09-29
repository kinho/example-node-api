FROM node:18-alpine

COPY ./node_modules ./node_modules
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install -s

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]