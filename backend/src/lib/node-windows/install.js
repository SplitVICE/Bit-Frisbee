// Source and guide: https://www.npmjs.com/package/node-windows
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Bit Frisbee by SPLIT VICE',
  description: 'Bit Frisbee auto start by node-windows.',
  script: require('path').join(__dirname, '../index.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();