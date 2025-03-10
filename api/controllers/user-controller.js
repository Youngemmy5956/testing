import User from "../models/User.js";

export const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error signing up user", error });
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    res.status(200).json({ message: "User signed in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error signing in user", error });
  }
};
