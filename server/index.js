const http = require("http");
require("dotenv").config();

const app = require("./app");
const initSocket = require("./socket");

const PORT = process.env.PORT ?? 5001;

const httpServer = http.createServer(app);

initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running!`);
});
