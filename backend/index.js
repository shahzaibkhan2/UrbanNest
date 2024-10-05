import "dotenv/config.js";
import { app } from "./app.js";
import connectDB from "./db/index.js";

// Database Connection
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5001, () =>
      console.log(`Server is listening to port: ${process.env.PORT || 4001}`)
    );
  })
  .catch((err) =>
    console.log(`Server connection with Database failed due to: ${err}`)
  );
