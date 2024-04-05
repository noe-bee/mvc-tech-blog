const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const commentRoutes = require('./commentRoutes');

// /api/users
router.use('/users', userRoutes);
// /api/projects
router.use('/projects', projectRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
