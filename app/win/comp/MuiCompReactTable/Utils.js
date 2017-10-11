import React from 'react'
import namor from 'namor'
// ### ===> inside namor package, require('../data.json') should be
// ###      fixed to require('../data'). The data.json is renamed to data.js.
// ###      module.exports={....}
import faker from 'faker'
// import timeUtil from 'cp-tools/libcptools/node/timeUtil'
// ### try multiple byte character
faker.locale = 'ja'
// faker
// https://github.com/marak/Faker.js/
// https://rawgit.com/Marak/faker.js/master/examples/browser/index.html

// import "./index.css"
// https://react-table.js.org/#/story/simple-table

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()

  // let d = faker.date.future()
  // console.log('type of faker.date.future', typeof d, d) // object
  // ### Note that created new Date(...) is recognized as 'object'.

  return {
    fName: namor.generate({ words: 1, numbers: 0 }),
    lName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66
      ? 'relationship'
      : (statusChance > 0.33 ? 'complicated' : 'single'),

    check: Math.floor(Math.random() * 100) % 2 === 0,
    date: faker.date.future(),

    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    address: faker.address.streetAddress() + faker.address.city() + faker.address.country(),
    bio: faker.lorem.sentences(),
    coins: faker.finance.amount(),
    image: faker.image.avatar()
  }
}

export function makeData (len = 5) {
  return range(len).map(d => {
    // ### modified
    let obj = newPerson()
    return Object.assign(
      obj,
      {children: range(2).map(newPerson)}
    )
  })
}

export const Logo = () =>
  <div style={{margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
    For more examples, visit {''}
    <br />
    <a href='https://github.com/react-tools/react-table' target='_blank'>
      <img
        src='https://github.com/react-tools/media/raw/master/logo-react-table.png'
        style={{ width: `150px`, margin: '.5em auto .3em' }}
      />
    </a>
  </div>

export const Tips = () =>
  <div style={{ textAlign: 'center' }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>
