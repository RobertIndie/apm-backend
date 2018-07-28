const app = require('./api/index.js');

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port} ...`));