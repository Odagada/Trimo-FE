#!/bin/bash
cd /home/ubuntu/Trimo-FE
git pull origin main
sudo npm install
sudo npm run build
pm2 start npm --name next_app -- start
pm2 restart next_app