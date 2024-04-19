const router = require('express').Router();
const { Project, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all projects
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));
    console.log(projects);
    // Pass serialized data and session flag into template
    res.render('home', {
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a project with a certain id
router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: User,
        },
      ],
    });

    const project = projectData.get({ plain: true });
    res.render('project', {
      ...project,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a comment with a certain id
router.get('/comment/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const comment = commentData.get({ plain: true });
    console.log(comment);

    res.render('comment', {
      ...comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dash', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    // Sanitization
    const user = userData.get({ plain: true });
    // console.log(user);
    res.render('dash', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dash');
    return;
  }

  res.render('login');
});

// // Signup Route
// router.get('/signup', async (req, res) => {
//   res.render("signup");
// })

module.exports = router;
