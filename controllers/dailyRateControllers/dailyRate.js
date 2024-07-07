const getProductsPublic = require("../productController/getProductsPublic");

const dailyRate = async (req, res) => {
  try {
    const { height, desiredWeight, age, bloodType, currentWeight } = req.body;

    const calories =
      10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight);
    const products = await getProductsPublic(bloodType);

    res.status(200).json({ calories, products });
  } catch (error) {
    console.error("Daily rate calculation error:", error);
    res.status(404).json({ message: "Error when calculating" });
  }
};

module.exports = dailyRate;

//"FÓRMULA PARA CALCULAR LA INGESTA DIARIA DE CALORÍAS PARA LAS MUJERES
//10 * peso + 6.25 * altura - 5 * edad - 161 - 10 * (peso - peso deseado)"
