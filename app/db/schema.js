'use strict'

const cptoolsSchema = require('cp-tools/libcptools/realm/schema').schema

// Use cptools schema for now
let schema = cptoolsSchema

// or define your own schema here...
// Note: migration would be required when updates schema

module.exports.schema = schema
