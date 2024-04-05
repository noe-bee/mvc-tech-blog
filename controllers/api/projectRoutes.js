const router = require("express").Router();
const { Project, User } = require("../../models");
const withAuth = require("../../utils/auth");

// router.get("/", async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const projectData = await Project.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });
//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post("/", withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      name: req.body.name,
      description: req.body.description,
      user_id: req.session.user_id,
    });
    
    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// try {
//   const newProject = await Project.create({
//     title: req.body.title,
//     description: req.body.description,
//     user_id: req.session.user_id,
//     // Add other validated/sanitized fields here
//   });
  
//   res.status(200).json(newProject);
// } catch (err) {
//   res.status(400).json(err);
// }

// try {
//   const newProject = await Project.create({
//     ...req.body,
//     user_id: req.session.user_id,
//   });

//   res.status(200).json(newProject);
// } catch (err) {
//   res.status(400).json(err);
// }

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
