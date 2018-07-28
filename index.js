const app = require("./api.js");
const JsonGenerator = require("./json_generator/index.js");

projectList = [];

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port} ...`));