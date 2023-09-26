const bcrypt = require('bcrypt')
const conn = require('../../config/db')
const { MemberData } = require('../../config/user_data')
const { Success, Error } = require('../../config/response')
const LoginModel = {
  loginAPI: async data => {
    const { acc, pwd } = data
    try {
      sql =
        'SELECT * FROM user WHERE acc= ? OR (verified=1 AND google_auth_id IS NOT NULL AND google_auth_mail = ? )'
      const response = await conn.queryAsync(sql, [acc, acc])

      if (response.length == 1) {
        if (bcrypt.compareSync(pwd, response[0].pwd)) {
          var member_data = new MemberData(
            response[0].user_id,
            response[0].name,
            response[0].rights,
            response[0].verified,
            response[0].google_auth_mail || response[0].email,
            true
          )
          return new Success(member_data)
        } else {
          return new Error('帳號或密碼輸入錯誤')
          // return new Error('login failed')
        }
      } else {
        return new Error('帳號或密碼輸入錯誤')
        return new Error('login failed')
      }
    } catch (err) {
      throw err
      return new Error(err)
    }
  },
  logoutAPI: data => {
    return new Success(`user ${data.u_name} , logout`)
  },
}
module.exports = LoginModel
