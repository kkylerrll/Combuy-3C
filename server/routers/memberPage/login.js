const express = require('express')
var router = express.Router()

const {
  login_render,
  login_api,
  notlogin_render,
  notlogin_api,
} = require('../../middlewares/isLogin')

const LoginController = require('../../controllers/memberPage/loginController')

router.get('/', notlogin_render, function (req, res) {
  res.render('member/login', {
    title: '會員登入',
    setting: req.session.setting,
    userId: req.session.member ? req.session.member.u_id : null,
  })
})
router.post('/', login_render, LoginController.loginSucRender)

module.exports = router
