const express = require("express");
const router  = express.Router();
const Product = require("../models/Product.js");

/* -------- CREATE -------- */
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Ürün oluşturma hatası:", err);
    res.status(500).json({ error: "Server error." });
  }
});

/* -------- READ (All + Kategori Filtresi) -------- */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;          // ?category=...
    const filter      = category ? { category } : {};
    const products    = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    console.error("Ürün getirme hatası:", err);
    res.status(500).json({ error: "Server error." });
  }
});

/* -------- SEARCH (ÖNCE GELMELİ) -------- */
router.get("/search/:productName", async (req, res) => {
  try {
    const { productName } = req.params;
    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

/* -------- READ (Single) -------- */
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: "Product not found." });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

/* -------- UPDATE -------- */
router.put("/:productId", /* ... */);

/* -------- DELETE -------- */
router.delete("/:productId", /* ... */);

module.exports = router;
