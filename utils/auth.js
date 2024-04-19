const withAuth = (req, res, next) => {
  // console.log('==========')
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    // console.log('========== in the if')
    res.redirect('/login');
  } else {
    // console.log('========== in the else')
    next();
  }
};

module.exports = withAuth;
