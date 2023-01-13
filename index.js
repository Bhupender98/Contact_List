const { response } = require("express");
const express = require("express");
const path = require("path");
const app = express();
const port = 8800;

// import db from config = where create the connection between db and express server
const db = require("./config/mongoose");
const Contact = require("./models/Contacts");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

// use static files
app.use(express.static("assets"));

let contactList = [
  {
    name: "Bhupender",
    phone: 1111111111,
  },
  {
    name: "Sumit",
    phone: 3333333333,
  },
  {
    name: "Modi Jii",
    phone: 4444444444,
  },
];

app.get("/", (req, res) => {
  Contact.find({}, (error, contacts) => {
    if (error) {
      console.log("error to fetching the contact from databases..");
      return;
    }

    return res.render("home", {
      title: "Home : Contact List",
      contact_List: contacts,
    });
  });
});
app.post("/create-contact", (req, res) => {
  // contactList.push({
  //     name : req.body.name,
  //     phone : req.body.phone,
  // })
  // console.log(req.body.name)
  // return res.redirect('back')
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    (error, newContact) => {
      if (error) {
        console.log("error to pushing the data to db");
        return;
      }
      console.log("*******", newContact);
    }
  );
  res.redirect("back");
});

// delete a contact from contact list
app.get("/delete-contact", (req, res) => {
  // app.get('/delete-contact/:phone', (req, res) => {
  // get phone using query params
  //   let phone = req.query.phone;
  //   let contactIndex = contactList.findIndex(contact => contact.phone == phone);
  //   if(contactIndex != -1){
  //     contactList.splice(contactIndex, 1);
  //   }
  //   return res.redirect('back');

  // get the id of an object from db
  let id = req.query.id;
  Contact.findByIdAndDelete(id, (error) => {
    if (error) {
      console.log("Error while deleting a contact from database");
      return;
    }
  });
  return res.redirect("back");
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server listening on port ${port}`);
});
