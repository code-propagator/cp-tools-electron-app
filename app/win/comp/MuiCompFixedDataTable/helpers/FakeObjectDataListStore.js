/**
 * Copyright Schrodinger, LLC
 */
 // http://schrodinger.github.io/fixed-data-table-2/example-sort.html
 // ===> modified for cp-tools

var faker = require('faker')

class FakeObjectDataListStore {
  constructor (size) {
    this.size = size || 2000
    this._cache = []
  }

  createFakeRowObjectData (index) {
    return {
      id: index,
      avatar: faker.image.avatar(),
      city: faker.address.city(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      street: faker.address.streetName(),
      zipCode: faker.address.zipCode(),
      date: faker.date.past(),
      bs: faker.company.bs(),
      catchPhrase: faker.company.catchPhrase(),
      companyName: faker.company.companyName(),
      words: faker.lorem.words(),
      sentence: faker.lorem.sentence()
    }
  }

  getSize () {
    return this.size
  }

  getObjectAt (index) {
    if (index < 0 || index > this.size) {
      return undefined
    }
    if (this._cache[index] === undefined) {
      this._cache[index] = this.createFakeRowObjectData(index)
    }
    return this._cache[index]
  }

  /**
  * Populates the entire cache with data.
  * Use with Caution! Behaves slowly for large sizes
  * ex. 100,000 rows
  */
  getAll () {
    if (this._cache.length < this.size) {
      for (var i = 0; i < this.size; i++) {
        this.getObjectAt(i)
      }
    }
    return this._cache.slice()
  }
}

module.exports = FakeObjectDataListStore
