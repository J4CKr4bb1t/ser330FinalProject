const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

//URI changed to SeSe's mongoose to ensure connection functionality
mongoose
  .connect(
    "mongodb+srv://sballerheiligen:rootBeer@cluster0.n44ml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected!");
  })
  .catch((err) => {
    console.log(err);
  });
