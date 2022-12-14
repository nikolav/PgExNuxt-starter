FROM node:16.14.0
RUN apt update && apt-get update

# headless-chrome deps
RUN apt install -y libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss-dev
RUN apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libnss3 lsb-release xdg-utils wget ca-certificates

# mount-path in contanier
RUN mkdir -p /home/app; mkdir -p /home/app/logs
WORKDIR /home/app

# install
COPY package*.json yarn.lock ./
RUN yarn

# copy express app
COPY . .

# generate docs
RUN yarn run docs

# bind volume
VOLUME .:/home/app

# expose $PORT if any; [default=3001]
ENV PORT 3001
EXPOSE $PORT

# run default start commaand
CMD ["yarn", "start"]
