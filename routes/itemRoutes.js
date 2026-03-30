const express = require('express');
const router = express.Router();

const { createItem, getItems, getItemById } = require("../controllers/itemController");

router.post('/add', createItem);
router.get("/", getItems);
router.put("/:id", getItemById);

module.exports = router;