# <img src="./frontend/public/favicon.ico" alt="bit frisbee logo" width=40/> Bit Frisbee

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

[![N|Solid](https://dl.dropboxusercontent.com/s/oy06v7r8d871cr8/splitvice-banner.png?dl=0)](http://split-vice.com)


A simple file hosting server. <a href="http://split-vice.com/technology/web-software/bit-frisbee/" target="_blank">Official website</a>

<img src="./_Docs/Images/bit-frisbee-demo.png"/>

# Technical specs

Developed in Node v12.16.2. Bit Frisbee needs Node to be installed on the PC to be executed.

[Node official website](https://nodejs.org/en/)

Bit Frisbee uses VueJS frontend which has been developed in a separated project. To run the application it is only needed to run the backend project. No database needed.

Uploaded files will be stored at `/backend/src/public/f/`

# Web application setup

- Download application from repository.
- Go to `/backend/` and create `.env` file. Use `/backend/.env.template` to fill `.env` file with customized settings. Go to `/_Docs/Deploy app guide.txt` to read a detailed guide to set settings and deploy application.
- Once changes inside `/_Docs/Deploy app guide.txt` made: for a quick application deployment, run `Start server.bat` file.
- For manual application deployment: open a terminal at backend folder - run `npm install` command to install required modules and dependencies - when finished, run `npm run dev` command to start application server.

# Installing application

Bit Frisbee can be installed on PCs with Windows operating system by running the file called `Install Bit Frisbee.bat`. The application will start automatically on Windows startup and run on the background.

This is made by using node-windows module.

To uninstall application `Uninstall Bit Frisbee.bat` should do the job.

Note: you must set settings of application as explained inside `/_Docs/Deploy app guide.txt` before installing the application.

### Support?
<a target="_blank" href="https://split-vice.com/send-message">Contact me</a>