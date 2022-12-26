# deploy setup

## pre.git-push
  - set API_HOST, /api/.env, line 8
  - set CLIENT_IO, /api/.env, line 81
  - set /api/apidoc.json, .url, line 6

## deploy
  - scp /nuxtapp/config/vars.ts
  - scp /nuxtapp/.env
  - scp /api/.env
  - scp /api/redis.conf
  - . deploy-env.sh
  - . deploy.sh
