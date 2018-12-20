var express = require('express');
var router = express.Router();
//引入passport模块
var passport=require('passport')
var GitHubStrategy = require('passport-github').Strategy
//序列化和反序列化
passport.serializeUser(function(user, done) {
    done(null, user);
});   
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: 'f32bddf85687ae36ae44',
    clientSecret: '04e0c50c49a20a8d498661c5ac3f1a0c6b43d696',
    callbackURL: "http://www.stickynote.top/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
/** 
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
*/
  }
));
router.get('/github',
  passport.authenticate('github'));
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });

router.get('/logout',function(req,res){
    req.session.destroy()
    res.redirect('/')
})

module.exports = router;
