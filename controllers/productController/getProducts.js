const { Product } = require("../../schema/productSchema");

const getProducts = async (req, res) => {
  try {
    const conf = {};
    if (req.query.title) {
      conf.title = { $regex: req.query.title, $options: "i" };
    }
    const products = await Product.find(conf);
    // Podria filtrarlo segun tipo de sangre (Pendiente)
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ error: "Error DB" });
  }
};

module.exports = getProducts;
