import React, {Component} from 'react'
import Paper from 'material-ui/Paper'

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC'
}

let reverseSortDirection = (sortDir) => {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC
}

// const {Cell} = require('fixed-data-table-2')
// ===> broken
const Cell = Paper

class SortHeaderCell extends Component {
  constructor (props) {
    super(props)
    this._onClick = this._onClick.bind(this)
  }

  render () {
    console.log('render SortHeaderCell', this.props.columnKey)
    let mystyle = {width: '100%', height: '100%'}
    // ### Don't assing {...this.props} to the Cell, i.e. Paper.
    // ### Paper creates <div>, which cannot have custom props like onSortChange etc.
    return (
      <Cell
        onClick={this._onClick}
        style={{...mystyle}}>
        {this.props.children} {this.props.sortDir ? (this.props.sortDir === SortTypes.DESC ? 'DESC' : 'ASC') : ''}
      </Cell>
    )
  }

  _onClick (e) {
    console.log('_onClick')
    e.preventDefault()
    if (this.props.onSortChange) {
      // callback
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ? reverseSortDirection(this.props.sortDir) : SortTypes.DESC
      )
    }
  }
}

export default SortHeaderCell
