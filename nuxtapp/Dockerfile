FROM node:18
RUN apt update && apt-get update

# mount-path in contanier
RUN mkdir -p /home/app/logs
WORKDIR /home/app

# install
COPY package*.json yarn.lock ./
RUN yarn

# install nuxtapp
COPY . .
RUN yarn build

# expose $PORT if any; [default=3000]
ENV PORT 3000
EXPOSE $PORT

# run default start command
CMD [ "yarn", "start" ]
