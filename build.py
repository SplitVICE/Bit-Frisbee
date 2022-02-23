import os

if(os.path.exists("frontend/node_modules") == False):
    os.system("cd frontend && npm i")

if (os.path.exists("build") == True):
    os.system("rm -rvf build")

commands = [
    "cd frontend && npm run build",
    "cp -r 'backend' 'build'",
    "rm build/.env.template",
    "rm build/README.MD",
    "rm build/.eslintrc.json",
    "rm build/files/*",
    "rm -rvf build/src/lib/node-windows/",
    "rm -rvf build/src/public/test-room/",
    "rm -rvf build/src/test/"
]

for c in commands:
    os.system(c)

if (os.path.exists("build/node_modules/") == False):
    os.system("cd build && npm i")
