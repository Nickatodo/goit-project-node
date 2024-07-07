const { Product } = require("../../schema/productSchema");

const getProducts = async (req, res) => {
  try {
    const conf = {};

    const bloodTypeIndex = {
      A: 0,
      B: 1,
      AB: 2,
      O: 3,
    }[req.user.bloodType];

    conf[`groupBloodNotAllowed.${bloodTypeIndex}`] = false;

    if (req.query.title) {
      conf.title = { $regex: req.query.title, $options: "i" };
    }

    const products = await Product.find(conf);
    res.status(200).json({ products });
    return products;
  } catch (error) {
    res.status(400).json({ error: "Error DB" });
  }
};

module.exports = getProducts;
