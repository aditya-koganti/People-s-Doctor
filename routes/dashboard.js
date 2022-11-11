const express = require("express");
const doctor = require("../models/doctor");
const Info = require("../models/info");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("dashboards/index.ejs");
});

router.get("/information/form/:id", function (req, res) {
  var doctorID = req.params.id;
  res.render("dashboards/informationForm", { doctorID: doctorID });
});

router.post("/information/post/:id", function (req, res) {
  Info.create(
    {
      name: req.body.name,
      email: req.body.email,
      insuranceProvider: req.body.insuranceProvider,
      address: req.body.address,
      period: req.body.period,
      facing: req.body.facing,
    },
    function (err, info) {
        if(err){
            console.log(err);
        }else{
            console.log(info);
            res.send(req.body.name + ", you details were sucessfully submitted");
        }
    }
  );
});

router.get("/appointment/form/:id", function (req, res) {
  var doctorID = req.params.id;
  // res.send("fasdfasd")
  res.render("dashboards/bookappointment.ejs", { doctorID: doctorID });
});

router.post("/appointment/post/:id", function (req, res) {
  Appointment.create(
    {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      LastName: req.body.LastName,
      date: req.body.date,
      gender: req.body.gender,
      isBooked: false,
    },
    function (err, appointment) {
      if (err) {
        console.log(err);
      } else {
        console.log(appointment);
        res.render("dashboards/confirmation", {
          firstName: req.body.firstName,
        });
      }
    }
  );
});

module.exports = router;
