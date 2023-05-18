#!/bin/bash

git pull origin main

docker rm -f `docker ps -a -q`
docker rmi -f `docker images`

docker-compose -f docker-compose.prod.yml up