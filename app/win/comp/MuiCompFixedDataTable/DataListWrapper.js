'use strict'

class DataListWrapper {
  constructor (indexMap, data) {
    this._indexMap = indexMap
    this._data = data
  }

  getSize () {
    return this._indexMap.length
  }

  getObjectAt (index) {
    return this._data.getObjectAt(
      this._indexMap[index]
    )
  }

  // added for cp-tools
  getAll (index) {
    return this._data.getAll()
  }
}

export default DataListWrapper
