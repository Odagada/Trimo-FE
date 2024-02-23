#!/bin/bash
cd /home/ubuntu/trimo-Fe
git pull origin main
sudo npm install
sudo npm run build
pm2 restart next_app