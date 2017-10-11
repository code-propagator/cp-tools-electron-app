'use strict'

let handleTasks = async (db, arg, callback) => {
  console.log('START handleTasks', db, arg)
  try {
    const res = await (() => {
      return new Promise(
        (resolve, reject) => {
          try {
            let request = arg.request
            var result
            if (request.type === 'getBlog') {
              result = require('./getBlog').getBlog(db, arg)
              resolve(result)
              //
            } else if (request.type === 'getData') {
              result = require('./getData').getData()
              resolve(result)
              //
            } else if (request.type === 'doAuth') {
              setTimeout(() => {
                result = require('./doAuth').doAuth(db, arg)
                resolve(result)
              }, 3000)
              //
            }
          } catch (err) {
            reject(err)
          }
        }
      )
    })()
    // console.log('DONE handleTasks', res)
    console.log('DONE handleTasks')
    callback(res)
  } catch (err) {
    console.error('ERROR in handleTasks', err)
    callback(err)
  }
}

module.exports.handleTasks = handleTasks
