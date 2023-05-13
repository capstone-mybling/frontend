FROM node:16.18

COPY . .

ENV PRISMA_QUERY_ENGINE_BINARY prisma/conf/query-engine
ENV PRISMA_MIGRATION_ENGINE_BINARY prisma/conf/migration-engine
ENV PRISMA_INTROSPECTION_ENGINE_BINARY prisma/conf/introspection-engine
ENV PRISMA_FMT_BINARY prisma/conf/prisma-fmt
ENV PRISMA_QUERY_ENGINE_LIBRARY prisma/conf/libquery_engine.so

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install pm2 -g
RUN npm install
RUN npx prisma generate
RUN npx prisma db push

EXPOSE 3000

CMD ["npm", "run", "deploy:prod"]