FROM keymetrics/pm2:12-alpine

# Bundle APP files
COPY . .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

EXPOSE 3000

USER node

CMD ["pm2-runtime", "deploy:prod", "ecosystem.config.js", "--env production"]