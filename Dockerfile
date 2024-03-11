
FROM node:latest

WORKDIR /var/www/server/

COPY ./server /var/www/server/

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
