#!/bin/bash

# update packages
apt update
apt-get update

# install git
apt install git
git config --global user.name "nikolav"
git config --global user.email "admin@nikolav.rs"

# install NodeJS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt update
apt install yarn

# install docker
apt-get remove docker docker-engine docker.io containerd runc
apt-get update
apt-get install -y ca-certificates curl gnupg lsb-release
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
# if error @'apt-get update':
#   chmod a+r /etc/apt/keyrings/docker.gpg

# install docker-compose
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# allow app @ports
ufw allow http
ufw allow OpenSSH
ufw allow 6879
ufw allow 5544
ufw allow 8081
# ufw allow 8082
ufw enable

# net-tools, ifconfig
apt install -y net-tools
# shortcuts
alias ll='ls -AlFht --color=auto --group-directories-first '
alias gs='git status '

# status check
echo '== status'
echo -n 'node: ' && node --version
echo -n 'npm: ' && npm --version
echo -n 'yarn: ' && yarn --version
git --version
docker --version
docker-compose --version
service docker status
ufw status verbose
