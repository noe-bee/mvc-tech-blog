const router = require('express').Router();
const { Project, User } = require('../../models');
const withAuth = require('../../utils/auth');

//create a new project
router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      title: req.body.name,
      description: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
    // res.render
  } catch (err) {
    // console.log(err)
    res.status(400).json(err);
  }
});

// try {
//   const newProject = await Project.create({
//     ...req.body,
//     user_id: req.session.user_id,
//   });

//   res.status(200).json(newProject);
// } catch (err) {
//   res.status(400).json(err);
// }

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update route for project data
// router.put('/project/:id', withAuth, async (req, res) => {
//   try {
//     // Find the post by ID
//     const updateProject = await Project.findByPk(req.params.id);
//     if (updateProject) {
//       // Update the post
//       updateProject.title = newTitle;
//       updateProject.description = newDescription;
//       await updateProject.save();
//     }

//     res.status(200).json(updateProject);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.put('/:id', async (req, res) => {
  try {
    const updatedProject = await Project.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedProject) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }
    // res.json(updatedProject);
    res.status(200).json(updatedProject);
  } catch (err) {
    console.log(err);
    // res.json(err);
    res.status(500).json(err);
  }
});

module.exports = router;
