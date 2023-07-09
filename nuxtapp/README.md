
## app
  https://github.com/nikolav/PgExNuxt-starter/tree/nikolavrs
## api
  https://github.com/nikolav/API--nikolavrs
## db
  https://github.com/nikolav/PgExNuxt-starter/tree/nikolavrs

-- 

# deploy setup

## pre.git-push
set API_HOST, /api/.env, line 80
set APP_HOST, /api/.env, line 81
set CLIENT_IO, /api/.env, line 82
set /api/apidoc.json, .url, line 6
set IS_PRODUCTION=true, /nuxtapp/config/vars.ts, line 1
set API_URL_production=host, /nuxtapp/config/vars.ts, line 5
set host @/scp-config.sh, lines 2-5

## deploy
@host: mkdir -p /root/app; cd /root/app; git clone --branch nikolavrs repository
@home: . scp-config.sh
@host: . deploy-env.sh; . deploy.sh

