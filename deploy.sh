#!/bin/bash

# View deployment logs at journalctl -S today -f -u githubDeployer.service
npm ci
npm run build
