# deploy setup

## pre.git-push
  - set API_HOST, /api/.env, line 80
  - set APP_HOST, /api/.env, line 81
  - set CLIENT_IO, /api/.env, line 82
  - set /api/apidoc.json, .url, line 6
  - set API_URL_production, /nuxtapp/config/vars.ts, line 6
  - set host @/scp-config.sh, lines 2-5

## deploy
  - . scp-config.sh
  - . deploy-env.sh
  - . deploy.sh
