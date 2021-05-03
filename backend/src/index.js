const app = require("./server");
app.listen(app.get('port'), err => { console.log(`Server listening on port ${app.get('port')}.`); });