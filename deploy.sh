#!/bin/bash

. ./api/install.sh
. ./nuxtapp/install.sh

docker-compose up -d --build
docker exec -it api yarn run db:upsert
