const bcrypt = require('bcrypt')
const conn = require('../../config/db')
const { Success, Error } = require('../../config/response')
const {
  accVerify,
  pwdVerify,
  dateVerify,
  celphoneVerify,
  mailVerify,
} = require('../../lib/dataVerify')

const RegisterModel = {
  registerSucRender: async acc => {
    const response = await RegisterModel.checkAccountDuplicate(acc)
    if (response[0].count == 0) {
      return new Error('尚未註冊')
    } else {
      sql = 'SELECT name FROM user WHERE acc = ?'
      const response2 = await conn.queryAsync(sql, acc)
      if (response2.length == 1) {
        return new Success(response2[0].name)
      } else {
        return new Error('register Error')
      }
    }
  },
  registerAPI: async data => {
    let errorInputs = []
    // if (Object.keys(data).length != 11) {
    //   return new Error('input wrong')
    // }
    const { right, acc, pwd, pwdCheck, name, year, month, day, phone, mail, terms } = data

    if (!terms || terms == 'false') {
      errorInputs.push({
        input: 'terms',
        text: '未勾選同意款',
      })
    }
    if (right == '') {
      errorInputs.push({
        input: 'right',
        text: '請選擇身分',
      })
    }
    if (name == '') {
      errorInputs.push({
        input: 'name',
        text: '姓名不可為空',
      })
    }
    if (!accVerify(acc)) {
      errorInputs.push({
        input: 'acc',
        text: '輸入 8 - 20 字，並至少含有一個大寫英文、小寫英文、數字',
      })
    }
    if (!pwdVerify(pwd)) {
      errorInputs.push(
        { input: 'pwd', text: '輸入 8 - 20 字，並至少含有一個大寫英文、小寫英文、數字' },
        { input: 'pwdCheck', text: '輸入 8 - 20 字，並至少含有一個大寫英文、小寫英文、數字' }
      )
    } else if (pwd != pwdCheck) {
      errorInputs.push({
        input: 'pwdCheck',
        text: '密碼輸入不相符',
      })
    }

    if (Number.isInteger(year)) {
      errorInputs.push({
        input: 'year',
        text: '年分輸入錯誤',
      })
    }
    if (Number.isInteger(month)) {
      errorInputs.push({
        input: 'month',
        text: '月份輸入錯誤',
      })
    }
    if (Number.isInteger(day)) {
      errorInputs.push({
        input: 'day',
        text: '日期輸入錯誤',
      })
    }
    if (!dateVerify(year, month, day)) {
      errorInputs.push({
        input: 'year',
        text: '日期資料錯誤',
      })
    }
    if (!celphoneVerify(phone)) {
      errorInputs.push({
        input: 'phone',
        text: '手機號碼錯誤',
      })
    }

    if (!mailVerify(mail)) {
      errorInputs.push({
        input: 'mail',
        text: '電子信箱格式錯誤',
      })
    }

    if (errorInputs.length > 0) {
      return new Error(errorInputs)
    }
    const hashPwd = bcrypt.hashSync(pwd, 10)

    try {
      const response1 = await RegisterModel.checkAccountDuplicate(acc)

      if (response1[0].count == 0) {
        sql = 'INSERT INTO user(rights,acc,pwd,name,phone,email,birth) VALUES(?,?,?,?,?,?,?);'
        const result = await conn.queryAsync(sql, [
          right,
          acc,
          hashPwd,
          name,
          phone,
          mail,
          year + '-' + month + '-' + day,
        ])
        console.log(result)
        return new Success('OK')
        // return new Success(result)
      } else {
        errorInputs.push({
          input: 'acc',
          text: '輸入 8 - 20 字，並至少含有一個大寫英文、小寫英文、數字',
        })

        return new Error(errorInputs)
        // return new Error('duplicateAcc')
      }
    } catch (err) {
      throw err
      return new Error(err)
    }
  },
  duplicateAccAPI: async acc => {
    try {
      const response = await RegisterModel.checkAccountDuplicate(acc)
      if (response[0].count == 0) {
        if (!accVerify(acc)) {
          return new Error([
            {
              input: 'acc',
              text: '輸入 8 - 20 字，並至少含有一個大寫英文、小寫英文、數字',
            },
          ])
        }
        return new Success('no duplicateAcc')
      } else {
        return new Error([
          {
            input: 'acc',
            text: '此帳號已被使用',
          },
        ])
        // return new Error('duplicateAcc')
      }
    } catch (err) {
      throw err
      return new Error(err)
    }
  },

  //-------------------------------
  checkAccountDuplicate: async acc => {
    try {
      sql = 'SELECT COUNT(*) AS count FROM user WHERE acc= ?'
      const response = await conn.queryAsync(sql, acc)
      return response
    } catch (err) {
      throw err
      return err
    }
  },
}
module.exports = RegisterModel
