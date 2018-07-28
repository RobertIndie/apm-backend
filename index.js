const app = require("./api.js");
const JsonGenerator = require("./json_generator/json_generator.js");

var testA = {
    abandon: ["age"],
    name: "Aaron Robert",
    age: 20
};

console.log(JsonGenerator.toStr(testA));

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port} ...`));