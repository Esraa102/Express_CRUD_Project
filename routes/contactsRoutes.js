const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  updateContact,
  getContactByID,
  deleteContactById,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHanlder");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router
  .route("/:id")
  .get(getContactByID)
  .put(updateContact)
  .delete(deleteContactById);

module.exports = router;
