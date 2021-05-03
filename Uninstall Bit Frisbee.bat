@echo off
echo This script will uninstall Bit Frisbee from this machine.
echo -----------------------------------
SET /P x="Press any key to continue or close this window to cancel."
SET /P uninstallNodeWindows="Would you like to also uninstall node-windows module (this a module, not NodeJS itself)? y/n: "
echo "Bit Frisbee by JUST VICE"
node ./backend/src/lib/uninstall.js
echo %uninstallNodeWindows%
if %uninstallNodeWindows%==y npm uninstall -g node-windows
@echo off
SET /P a="Script completed. Press any key to close."