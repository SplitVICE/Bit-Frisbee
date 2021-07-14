@echo off
echo This script will install Bit Frisbee on this machine.
echo Bit Frisbee will always be running on background even on Windows startup.
echo Remember you need to install NodeJS on this machine to run the application.
echo Remember you need to set .env file. Read /_Docs/Deploy app guide.txt for more info.
echo If installation fails, stop application and remove /backend/node_modules/ and /backend/src/daemon/ folders if exist.
echo -----------------------------------
SET /P x="Press any key to continue or close this window to cancel."
echo Bit Frisbee by SPLIT VICE
cd .. && npm install -g node-windows && cd ./backend/ && npm i && npm link node-windows && node ./src/lib/install.js
@echo off
SET /P a="Script completed. Press any key to close."