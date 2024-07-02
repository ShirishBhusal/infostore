const mongoose = require("mongoose");
// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Error connecting to database:", err.message));

// Define user schema
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create user model
const User = mongoose.model("User", userSchema);

module.exports = User;
