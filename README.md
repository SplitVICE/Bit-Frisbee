# <img src="./frontend/public/favicon.ico" alt="bit frisbee logo" width=40/> Bit Frisbee

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

[![N|Solid](https://dl.dropboxusercontent.com/s/oy06v7r8d871cr8/splitvice-banner.png?dl=0)](http://split-vice.com)


A simple file hosting server. <a href="http://split-vice.com/technology/web-software/bit-frisbee/" target="_blank">Official website</a>

<img src="https://dl.dropboxusercontent.com/s/1xahmwuxvwcc321/bit-frisbee-demo.png"/>

# Technical specs

Developed in NodeJS v12.16.2.

Uploaded files will be stored at `/files/`.

| Backend          | Frontend        | Database     |
| ---------------- | --------------- | ------------ |
| NodeJS + Express | VueJS (Vue CLI) | No database. |

# Environment variables

Environment variables is the only way to configure the application.

## PORT

 Location: /backend/.env

 Description: port where application can be accessed.

 Default: 4000.

 Expected value: Number.

## SHOW_FILES_STORED

Location: /backend/.env

Description: Whether to show all stored files in the Files section or hide them.

Default: false.

Expected value: Boolean.

## USE_HTTPS

 Location: /backend/.env

 Description: If generated URLs show have `http://` or `https://` at the beginning.

 Default: false.

 Expected value: Boolean.

 ## DOMAIN

 Location: /backend/.env

 Description: If the application is running with a custom domain, it is required to write it in this variable.

 Take special note that in the domain variable the value must not have `http://`, `https://`, nor final dash `/`.

 Default: If not set, IPv4 URL is generated using `local-ipv4-address` module.

 Expected value: String.

  Value example:

 ```
 DOMAIN=bit-frisbee.com
 ```

 ## VUE_APP_DEV_MODE

 Location: /frontend/.env

 Description: this variable must have value `true` if source code is being edited.

 Default: false.

 Expected value: Boolean.

# Build application

- Make sure  `/frontend/.env -> VUE_APP_DEV_MODE == false`.
- Configure `/backend/.env -> DOMAIN, USE_HTTPS, SHOW_FILES_STORED, & PORT` environment variables. They can be configured later in `/build/.env`.
- Both backend and frontend modules must be installed.
- Run `/build.py`. Builded application will be inside `/build/`.
- Note: UNIX commands are used to create the build application.

# Development mode

To properly modify source code and have hot reload, follow these steps:

- Make sure backend's port is configured to 4000. If you need a different port, change `/frontend/src/store/index.js -> _backendPort`.
- Make sure `/frontend/.env -> VUE_APP_DEV_MODE == true`.
- Run backend `npm run dev`.
- Run frontend `npm run serve`.

# Ngrok service

Application works with Ngrok service. The Ngrok URL must be set in `.env` as the following example:
```
USE_HTTP=true
DOMAIN=32af02151ce2.ngrok.io
```

# Install as a service - Windows

Bit Frisbee can be installed and run as a service on Windows using the module node-windows

https://www.npmjs.com/package/node-windows

Premade scripts are contained in `/backend/src/lib/node-windows/`

# Support

Send me a message.

https://split-vice.com/send-message
