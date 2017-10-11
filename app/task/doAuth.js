'use strict'

let doAuth = (db, arg) => {
  let result = {
    success: true,
    resultStatus: 'SUCCESS',
    token: 'ttttttttt',
    userInfo: 'information'
  }
  // ### CHECK VALUES HERE BEFORE RETURN ANY RESULT
  if (typeof result.token === 'undefined' || result.token === null) {
    result.resultStatus = 'ERROR'
  } else {
    result.resultStatus = 'DONE:' + result.token
    result.success = true
  }
  return result
}

module.exports.doAuth = doAuth
