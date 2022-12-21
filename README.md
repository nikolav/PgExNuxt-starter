# deploy setup

## pre.git-push
  - set /api/apidoc.json, .url, line 6
  - set CLIENT_IO, /api/.env, line 81

## deploy
  - scp /nuxtapp/config/vars.ts
  - scp /nuxtapp/.env
  - scp /api/.env
  - scp /api/redis.conf
  - . deploy-env.sh
  - . deploy.sh
