import os

if(os.path.exists("frontend/node_modules") == False):
    os.system("cd frontend && npm i")

if (os.path.exists("build") == True):
    os.system("rm -rvf build")

commands = [
    "mkdir build",
    "cd frontend && npm run build",
    "cp 'backend/package.json' 'build/package.json",
    "cp 'backend/package-lock.json' 'build/package-lock.json",
    "cp 'backend/.env' 'build/.env",
    "cp -r 'backend/src' 'build/src",
    "rm -rvf build/src/lib/node-windows/",
    "rm -rvf build/src/public/test-room/",
    "rm -rvf build/src/test/",
    "cd build && npm install --production",
    "rm -rvf backend/src/public/spa",
    "rm -rvf backend/src/public/index.html",
    "rm -rvf backend/src/public/external/",
    "rm -rvf backend/src/public/favicon.ico",
]

for c in commands:
    os.system(c)
