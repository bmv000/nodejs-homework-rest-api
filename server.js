const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const URI_DB = process.env.MONGO_URL;

mongoose
  .connect(URI_DB)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running. Use our API on port: ${PORT}`)
    );
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
