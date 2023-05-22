#!/bin/bash

git pull origin main

docker rm -f `docker ps -a -q`
docker rmi -f `docker images`
docker volume rm -f `docker volume ls`

docker-compose -f docker-compose.prod.yml up -d