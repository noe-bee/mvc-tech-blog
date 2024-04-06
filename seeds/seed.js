const sequelize = require('../config/connection');
const { User, Project, Comment } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      // the code below is assigning a random user to the comment?
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();