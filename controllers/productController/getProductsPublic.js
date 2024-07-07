const { Product } = require("../../schema/productSchema");

const getProductsPublic = async (bloodType) => {
  try {
    const conf = {};

    const bloodTypeIndex = {
      A: 0,
      B: 1,
      AB: 2,
      O: 3,
    }[bloodType];

    conf[`groupBloodNotAllowed.${bloodTypeIndex}`] = true;

    const products = await Product.find(conf);
    return products;
  } catch (error) {
    throw new Error("Error DB");
  }
};

module.exports = getProductsPublic;
