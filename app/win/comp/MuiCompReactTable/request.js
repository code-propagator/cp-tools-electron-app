import { makeData } from './Utils'
import _ from 'lodash'
import sorty from 'sorty'

// data for React Table example
// const rawData = makeData()

const sortRecords = (records, sorted, useSorty) => {
  console.log('sortRecords useSorty', useSorty)
  if (useSorty === true) {
    return sortRecordsSorty(records, sorted)
  } else {
    return sortRecordsCustom(records, sorted)
  }
}

const sorter = require('cp-tools/libcptools/node/sorter')

// https://www.npmjs.com/package/sorty
const sortRecordsSorty = (records, sorted) => {
  let sortInfo = sorted.map(sort => {
    if (sort.id === 'firstName') {
      return {
        name: sort.id,
        dir: (sort.desc ? 'desc' : 'asc'),
        fn: sorter.sortByLength
      }
    } else if (sort.id === 'lastName') {
      return {
        name: sort.id,
        dir: (sort.desc ? 'desc' : 'asc'),
        fn: sorter.sortByReverse
      }
    } else if (sort.id === 'date') {
      return {
        name: sort.id,
        dir: (sort.desc ? 'desc' : 'asc'),
        fn: sorter.sortByDate
      }
    } else {
      return {
        name: sort.id,
        dir: (sort.desc ? 'desc' : 'asc')
      }
    }
  })
  console.log('SORTY SORT', sortInfo)
  let sort = sorty(sortInfo)
  return sort(records)
}

const sortRecordsCustom = (records, sorted) => {
  // You can also use the sorting in your request,
  // but again, you are responsible for applying it.
  // https://stackoverflow.com/questions/38293059/alter-source-array-with-orderby
  // Returns (Array): Returns the new sorted array.
  // filteredData ---> sortedData
  // FIRST, APPLY SIMPLE STRING SORT
  let sortedData = _.orderBy(
    records,
    sorted.map(sort => {
      // console.log('###### SORT #######', sort)
      // {id: 'firstName', desc: false}
      return row => {
        // console.log('###### SORT row[sort.id] #######', row[sort.id])
        // console.log('instanceof Date', row[sort.id] instanceof Date)
        if (row[sort.id] === null || row[sort.id] === undefined) {
          return -Infinity
        }
        return typeof row[sort.id] === 'string'
          ? row[sort.id].toLowerCase()
          : row[sort.id]
      }
    }),
    sorted.map(d => (d.desc ? 'desc' : 'asc'))
  )
  // -------------------------------------------
  // ### ADD CUSTOM SORT FOR SPECIFIC COLUMN
  // ==> Note that if you omit FIRST sort with string order,
  // the result vary depanding on record order in sortedData.
  // ==> you should maintain 'multiple column sort' here too, if you want.
  // it's DIFFERENT from React Table's client-sort implementation.
  sortedData = _.orderBy(
    sortedData,
    sorted.map(sort => {
      // console.log('###### SORT #######', sort)
      // {id: 'firstName', desc: false}
      return row => {
        if (row[sort.id] === null || row[sort.id] === undefined) {
          return -Infinity
        }
        // -------------------------------------------
        // ### INJECT CUSTOM SORT FOR SPECIFIC COLUMN
        // -------------------------------------------
        if (sort.id === 'firstName') {
          return row[sort.id].length
        } else if (sort.id === 'lastName') {
          return row[sort.id].split('').reverse().join('')
        } else if (sort.id === 'date') {
          let t = row[sort.id].getTime()
          console.log('=== SORT DATE by getTime', t)
          return t
        }
        // -------------------------------------------
        // console.log('###### SORT row[sort.id] #######', row[sort.id])
        // console.log('instanceof Date', row[sort.id] instanceof Date)
        // if (row[sort.id] instanceof Date) {
        //   return row[sort.id].getTime()
        // }
        // -------------------------------------------
        return typeof row[sort.id] === 'string'
          ? row[sort.id].toLowerCase()
          : row[sort.id]
      }
    }),
    sorted.map(d => (d.desc ? 'desc' : 'asc'))
  )
  return sortedData
}

const SHOW_ALL = 'all'

let raw = {
  // {instancdId}: []
}

let getRawDataFromDataSource = (searchConf) => {
  if (searchConf === null || searchConf === {}) {
    return []
  }
  let instanceId = searchConf.instanceId
  if (typeof instanceId === 'undefined') {
    return []
  }
  let makeCount = searchConf.makeCount
  if (typeof makeCount === 'undefined') {
    return []
  }
  console.log('getRawDataFromDataSource', instanceId, makeCount, raw)
  console.log('raw[instanceId]', raw[instanceId])
  if (typeof raw[instanceId] === 'undefined') {
    let md = makeData(makeCount)
    console.log('makeData', md)
    raw[instanceId] = md
  }
  console.log('---> raw', raw)
  return raw[instanceId]
}

let clearRawData = (instanceId) => {
  delete raw[instanceId]
}

const requestData = (
  pageSize, page, sorted, filtered,
  useSorty,
  searchConf
) => {
  console.log('####### REQUEST DATA ##########')
  console.log('pageSize', pageSize)
  console.log('page', page)
  console.log('sorted', sorted)
  console.log('filtered', filtered)
  console.log('useSorty', useSorty)

  return new Promise((resolve, reject) => {
    // Get rawData from the data source
    let rawData = getRawDataFromDataSource(searchConf)
    console.log('requestData Promise: rawData', rawData)
    // ### start with whole data from the data source
    let filteredData = rawData
    let countAll = rawData.length
    // ===> Because the requestData is called when the React Table needs
    // latest data from datasoruce, you are responsible to get them.
    // Don't generate new data with makeData() here. makeData creates
    // entirely new records.

    // You can use the filters in your request,
    // but you are responsible for applying them.
    if (filtered.length) {
      filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
        // console.log('filteredSoFar', nextFilter)
        // nextFileter {id: 'firstName', value: 'aaa'}
        let targetColumnId = nextFilter.id
        let keyword = nextFilter.value
        // apply value filter
        return filteredSoFar.filter(row => {
          // ------------------------------------
          // if SHOW_ALL is specified, return all
          if (nextFilter.value === SHOW_ALL) {
            return true
          }
          // ------------------------------------
          let candidateStr = row[targetColumnId] + ''
          // return candidateStr.includes(keyword)
          // ===> Use indexOf instead of includes.
          let f = (candidateStr.indexOf(keyword) > -1)
          // console.log(candidateStr, keyword, f)
          return f
        })
      }, filteredData)
    }

    let sortedData = sortRecords(filteredData, sorted, useSorty)

    // You must return an object containing the rows of the current page,
    // and optionally the total pages number.
    // ### ===> ONLY DATA FOR CURRENT PAGE IS RETURNED
    const res = {
      rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(filteredData.length / pageSize),
      countAll: countAll
    }

    // Here we'll simulate a server response with some of delay.
    setTimeout(() => resolve(res), 100)
  })
}

module.exports = {
  requestData,
  clearRawData
}
