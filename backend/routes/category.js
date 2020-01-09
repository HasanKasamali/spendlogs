const router = require("express").Router();
const Category = require("../model/Category");
const { categoryValidation } = require("../validation");
const verify = require("./verifyToken");

router.post("/", verify, async (req, res) => {
  const { error } = categoryValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
    owner: req.user._id
  });
  try {
    const savedCategory = await category.save();
    res.send(savedCategory);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.find({});
    res.send(allCategories);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
