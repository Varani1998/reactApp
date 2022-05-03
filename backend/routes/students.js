const router = require("express").Router();
let Student = require("../models/student");

router.route("/add").post((req, res) => {
  const userName = req.body.userName;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date(req.body.date);

  const newStudent = new Student({
    userName,
    description,
    duration,
    date,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.route("/update/:id").put(async (req, res) => {
//   let userId = req.params.id;
//   const { userName, description, duration, date } = req.body;

//   const updateStudent = {
//     userName,
//     description,
//     duration,
//     date,
//   };
//   const update = await Student.findByIdAndUpdate(userId, updateStudent)
//     .then(() => {
//       res.status(200).send({ status: "User Updated", user: update });
//     })
//     .catch((err) => {
//       console.log(err);
//       res
//         .status(500)
//         .send({ status: "Error with updating data", error: err.message });
//     });
// });
router.route('/update/:id').put((req, res) => {
  Student.findById(req.params.id)
  .then(student =>{
  
      student.username = req.body.username;
      student.description = req.body.description;
      student.duration = req.body.duration;
      student.date = Date.parse(req.body.date);
  
      student.save()
          .then(() => res.json('Exercise Details Updated'))
          .catch(err => res.status(400).json('Error:' + err));
  
  })
  .catch(err => res.status(400).json('Error:' + err));
  
  });

router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Student.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "User Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with delete user", error: err.message });
    });
});

router.route('/:id').get((req, res) => {
  Student.findById(req.params.id)
      .then(Students => res.json(Students))
      .catch(err => res.status(400).json('Error:' + err));

});

// router.route("/:id").get(async (req, res) => {
//   let userId = req.params.id;

//   const user = await Student.findById(userId)
//     .then(() => {
//       res.status(200).send({ status: "User fetched", user: user });
//     })
//     .catch((err) => {
//       console.log(err);
//       res
//         .status(500)
//         .send({ status: "Error with fetch user", error: err.message });
//     });
// });

module.exports = router;
