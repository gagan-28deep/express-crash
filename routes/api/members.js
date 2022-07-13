const express = require("express");
const router = express.Router();
const members = require("../../Members");

const uuid = require("uuid");

// Get a single member
// app.get("/api/members/:id", (req, res) => {

router.get("/:id", (req, res) => {
  // :id is url parameter
  // res.send(req.params.id);
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Return as json , get all members
// app.get("/api/members", (req, res) => {
// As /api/members is handled , so '/'

router.get("/", (req, res) => {
  res.json(members);
});

// Create a member
// When we get data , it will be in request object

router.post("/", (req, res) => {
  // res.send(req.body);
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.send(400).json({ msg: "Please enter a name and email" });
  }
  members.push(newMember);
  //   res.send(newMember);
    res.json(members);

//   While dealing with templates
//   res.redirect("/");
});

// Update a member

router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({ msg: "Member Updated", member });
      }
    });
  }
});

// Delete a member

router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member Deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.send(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
