FROM node:16.18

COPY . .

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install pm2 -g
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "deploy:prod"]