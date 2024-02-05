const Coupons = require("../models/Coupons.model");
const { UserService } = require("../services/user.service");

// Controller to create a new Coupons
exports.createCoupons = async (req, res) => {
  try {
    const { name, value, type, status, assignedTo } = req.body;
    const Coupons = new Coupons({
      name,
      value,
      type,
      status,
      assignedTo,
    });

    await Coupons.save();
    res.status(201).json(Coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get all Coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const Coupons = await Coupons.find();
    res.status(200).json(Coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get a Coupons by ID
exports.getCouponsById = async (req, res) => {
  try {
    const Coupons = await Coupons.findById(req.params.id);
    if (!Coupons) {
      return res.status(404).json({ error: "Coupons not found" });
    }
    res.status(200).json(Coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update a Coupons by ID
exports.updateCoupons = async (req, res) => {
  try {
    const { name, value, type, status, assignedTo } = req.body;
    const updatedCoupons = await Coupons.findByIdAndUpdate(
      req.params.id,
      { name, value, type, status, assignedTo },
      { new: true }
    );

    if (!this.updateCoupons) {
      return res.status(404).json({ error: "Coupons not found" });
    }

    res.status(200).json(updatedCoupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to delete a Coupons by ID
exports.deleteCoupons = async (req, res) => {
  try {
    const deletedCoupons = await Coupons.findByIdAndDelete(req.params.id);
    if (!deletedCoupons) {
      return res.status(404).json({ error: "Coupons not found" });
    }
    res.status(200).json({ message: "Coupons deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
