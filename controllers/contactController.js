const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// @desc all contacts
// @route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc contact by id
// @route GET /api/contacts/:id
//@access private
const getContactByID = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});

// @desc create new contact
// @route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });
    res.status(201).json(contact);
  } else {
    res.status(400);
    throw new Error("All Fields Are Mandatory");
  }
});

// @desc update a contact
// @route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User Is Not Allowed To Update This Contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(202).json(updatedContact);
});

// @desc delete a contact
// @route DELETE /api/contacts/:id
//@access private
const deleteContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User Is Not Allowed To Delete This Contact");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).send({ message: "Deleted Successfully" });
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  getContactByID,
  deleteContactById,
};
