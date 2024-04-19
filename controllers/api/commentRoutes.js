const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')

//create a new comment
router.post('/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.commentText,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
