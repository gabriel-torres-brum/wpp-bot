const express = require("express");
const router = express.Router();

const ClienteController = require("../Controllers/ChatController");

// router.get("/list", ClienteController.list);
router.post("/create", ClienteController.create);
router.get("/get/:id", ClienteController.get);
router.post("/update/:id", ClienteController.update);
router.post("/delete", ClienteController.delete);

module.exports = router;
