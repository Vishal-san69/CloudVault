
const express = require("express");

const authenticateToken = require("../middleware/auth.middleware");

const {
  requestUpload,
  confirmUpload,
  getMyDocuments,
  requestDownload,
  deleteDocument,
} = require("../controllers/document.controller");

const router = express.Router();

router.use(authenticateToken);

router.post("/upload-url", requestUpload);
router.post("/:id/confirm", confirmUpload);
router.get("/my-documents", getMyDocuments);
router.get("/:id/download-url", requestDownload);
router.delete("/:id", deleteDocument);

module.exports = router;
