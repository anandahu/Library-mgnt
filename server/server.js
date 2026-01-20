const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();
// DB Connection
mongoose
  .connect(
    process.env.MONGODB_URI.replace(
      "<DATABASE_PASSWORD>",
      process.env.DATABASE_PASSWORD
    )
  )
  .then(() => {
    console.log("DB connection Sucessful");
  })
  .catch((error) => {
    console.log("DB connection error", error);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});
