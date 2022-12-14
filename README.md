
## deploy
  - scp /nuxtapp/config/vars.ts
  - copy /nuxtapp/.env
  - set CLIENT_IO, /api/.env, line 81
  - copy /api/.env
  - copy /api/redis.conf
  - . deploy-env.sh
  - . deploy.sh
