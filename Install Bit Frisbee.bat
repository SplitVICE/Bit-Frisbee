@echo off
echo This script will install Bit Frisbee on this machine.
echo Bit Frisbee will always be running on background even on Windows startup.
echo Remember you need to install NodeJS on this machine to run the application.
echo If installation fails, stop application and remove /backend/node_modules/ and /backend/src/daemon/ folders if exist.
echo -----------------------------------
SET /P x="Press any key to continue or close this window to cancel."
echo Bit Frisbee by JUST VICE
npm install -g node-windows && cd ./backend/ && npm i && npm link node-windows && node ./src/lib/install.js && start "iexplore.exe" http://localhost:4000/
@echo off
SET /P a="Script completed. Press any key to close."