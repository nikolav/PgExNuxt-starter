#!/bin/bash

git checkout nikolavrs

. ./api/install.sh
# . ./nuxtapp/install.sh

docker-compose up -d api --build
docker exec -it api yarn run db:upsert
