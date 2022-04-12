#!/bin/bash

# View deployment logs at journalctl -S today -f -u githubDeployer.service
npm ci --unsafe-perm=true --allow-root
npm run build
