const express = require("express");
const app = express();

const logger = require("./middlewares/logger");
const catRouter = require("./routes/catRouter");
const goalRouter = require("./routes/goalRouter");

app.use(express.json());

app.use(logger);

app.use("/api/cats", catRouter);
app.use("/api/goals", goalRouter);

const PORT = 4000;
 
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
