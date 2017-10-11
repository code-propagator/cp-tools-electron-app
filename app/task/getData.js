let getData = () => {
  let result = [
    {'value': 'aaa' + Math.random()},
    {'value': 'bbb' + Math.random()},
    {'value': 'ccc' + Math.random()}
  ]
  return result
}

module.exports.getData = getData
