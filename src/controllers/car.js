const { CarModel: Car } = require("../models");
exports.addNewCar = async (req, res) => {
  try {
    const { carModel, price, phone, city, images = [] } = req.body;
    console.log(req?.files);
    if (!carModel || !price || !phone || !city) {
      return res.status(400).json({
        error: "The fields(Car Model, Price, phone, and city) are required",
      });
    }

    const car = new Car({
      userId: req.userData.userId,
      carModel,
      price,
      phone,
      city,
      images,
    });

    const savedCarData = await car.save();

    res
      .status(201)
      .json({ message: "Car submitted successfully", data: savedCarData });
  } catch (error) {
    res.status(500).json({ error: "Car submission failed" });
  }
};

exports.uploadFiles = async (req, res) => {
  try {
    console.log(req);
    res
      .status(201)
      .json({ message: "Files Uploaded successfully", data: req?.files || [] });
    res.se;
  } catch (error) {
    res.status(500).json({ error: "Files Uploading Failed!" });
  }
};
