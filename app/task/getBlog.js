let getBlog = (db, arg) => {
  if (!db) {
    return 'DATABASE IS NOT READY'
  }
  let all = db.allData()
  // console.log('getBlog', all)
  // ===> bunch of RealmObject is coming...
  //
  // let posts = realm.objects('Post').sorted('timestamp', true)
  // let users = realm.objects('User').sorted('created_at', true)
  //
  let result = all
  // Appending sort settings here is okay.
  /*
  result = {
    Post: blog.Post.sorted('timestamp', true),
    User: blog.User.sorted('created_at', true)
  }
  */
  return result
}

module.exports.getBlog = getBlog
