require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 5000;
const connectDB = require("./src/config/db");

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port no ${PORT}`);
  });
};

startServer();
