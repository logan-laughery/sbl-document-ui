#!/bin/bash

source /home/logan/.nvm/nvm.sh;

# View deployment logs at journalctl -S today -f -u githubDeployer.service
npm ci
npm run build
