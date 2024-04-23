const asyncHandler = require("express-async-handler");
const Product = require("../models/clothingProduct.js");

// api/products
const getProducts = asyncHandler(async (req, res) => {
  // let limit = 10;
  // let pageNumber= 1
  // const skipValue = (pageNumber - 1) * limit;
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(404);
      throw new Error("Not Found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// Product added by admin only.....
const addProduct = asyncHandler(async (req, res) => {
  console.log(req.file);
  const {
    title,
    category,
    price,
    discount,
    color,
    sizes,
    materials,
    description,
    stock,
    gender,
  } = req.body;
  if (
    !title ||
    !category ||
    !price ||
    !discount ||
    !color ||
    !sizes ||
    !materials ||
    !description ||
    !stock ||
    !gender
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }
  if (!req.file) {
    res.status(400);
    throw new Error("No image file found in the request.");
  }
  const image = `${process.env.BASE_URL}/products/${req.file.filename}`;
  const product = await Product.create({
    title,
    category,
    price,
    discount,
    color,
    sizes,
    materials,
    description,
    images: [image],
    stock,
    gender,
  });

  res.status(201).json(product);
});

const getProductByID = asyncHandler(async (req, res) => {
  const _id = req.params.productID;
  const product = await Product.findById(_id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


module.exports = { getProducts, addProduct, getProductByID };
