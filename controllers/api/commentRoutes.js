const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')

//create a new comment
router.post('/', withAuth, async (req, res) => {
  console.log('*************');
  console.log(req.body);
  try {
    const newComment = await Comment.create({
      text: req.body.commentText,
      user_id: req.session.user_id,
      project_id: req.body.id
    });
    console.log(newComment)
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
