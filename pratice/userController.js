const User = require("../../pratice/userModel");

// Get status
exports.getStatus = async (req, res) => {
  try {
    const total = await User.countDocuments();
    const active = await User.countDocuments({ status: "active" });
    const inactive = await User.countDocuments({ status: "inactive" });
    res.json({ total, active, inactive });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching status", error: error.message });
  }
};

// Search users by name
exports.searchusers = async (req, res) => {
  try {
    const query = req.params.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchquery = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } },
      ],
    };

    const users = await User.find(searchquery).skip(skip).limit(limit);
    const total = await User.countDocuments(searchquery);

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error searching users", error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const total = await User.countDocuments();

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error searching users", error: error.message });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(foundUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching user", error: error.message });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "name, email, and phone are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      phone,

      status: status || "active",
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error creating user", error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    if (email) {
      const exists = await User.find({ email, _id: { $ne: req.params.id } });
      if (exists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, status },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error updating user", error: error.message });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully", sucess: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error deleting user", error: error.message });
  }
};
