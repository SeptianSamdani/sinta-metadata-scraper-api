const app = require("./app");
const env = require("./config/env");

app.listen(env.APP_PORT, () => {
  console.log(`Server running on http://localhost:${env.APP_PORT}`);
});