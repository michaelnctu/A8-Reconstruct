const express = require('express')
const router = express.Router()
const User = require('../../models/user.js')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {

  successRedirect: '/',
  failureRedirect: '/users/login'


}))

router.post('/register', (req, res) => {

  const { email, name, password, confirmPassword } = req.body  //cliert端傳入

  User.findOne({ email }).then(user => {

    if (user) {
      console.log('User already exist!')
      res.render('register', {
        name, email, password, confirmPassword
      })
    } else {
      return User.create({
        name, email, password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})


router.get('/register', (req, res) => {
  res.render('register')
})


module.exports = router
