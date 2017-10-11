/**
 * Copyright Schrodinger, LLC
 */
// http://schrodinger.github.io/fixed-data-table-2/example-sort.html
// ===> modified for cp-tools

'use strict'
import Paper from 'material-ui/Paper'
const Cell = Paper

const ExampleImage = require('./ExampleImage')
// const { Cell } = require('fixed-data-table-2')
// ===> broken

const React = require('react')
const ReactTooltip = require('react-tooltip')

class CollapseCell extends React.PureComponent {
  render () {
    // const {data, rowIndex, columnKey, collapsedRows, callback} = this.props
    const {rowIndex, collapsedRows, callback} = this.props
    return (
      <Cell {...this.props}>
        <a onClick={() => callback(rowIndex)}>
          {collapsedRows.has(rowIndex) ? '\u25BC' : '\u25BA'}
        </a>
      </Cell>
    )
  }
}
module.exports.CollapseCell = CollapseCell

class ColoredTextCell extends React.PureComponent {
  render () {
    const {data, rowIndex, columnKey} = this.props
    return (
      <Cell {...this.props}>
        {this.colorizeText(data.getObjectAt(rowIndex)[columnKey], rowIndex)}
      </Cell>
    )
  }

  colorizeText (str, index) {
    let val = 0
    let n = 0
    return str.split('').map((letter) => {
      val = index * 70 + n++
      let color = 'hsl(' + val + ', 100%, 50%)'
      return <span style={{color}} key={val}>{letter}</span>
    })
  }
}
module.exports.ColoredTextCell = ColoredTextCell

class DateCell extends React.PureComponent {
  render () {
    const {data, rowIndex, columnKey} = this.props
    return (
      <Cell {...this.props}>
        {data.getObjectAt(rowIndex)[columnKey].toLocaleString()}
      </Cell>
    )
  }
}
module.exports.DateCell = DateCell

class ImageCell extends React.PureComponent {
  render () {
    // const {data, rowIndex, columnKey, ...props} = this.props
    const {data, rowIndex, columnKey} = this.props
    return (
      <ExampleImage
        src={data.getObjectAt(rowIndex)[columnKey]}
      />
    )
  }
}
module.exports.ImageCell = ImageCell

class LinkCell extends React.PureComponent {
  render () {
    const {data, rowIndex, columnKey} = this.props
    return (
      <Cell {...this.props}>
        <a href='#'>{data.getObjectAt(rowIndex)[columnKey]}</a>
      </Cell>
    )
  }
}
module.exports.LinkCell = LinkCell

class PendingCell extends React.PureComponent {
  render () {
    // const {data, rowIndex, columnKey, dataVersion} = this.props
    const {data, rowIndex, columnKey} = this.props
    const rowObject = data.getObjectAt(rowIndex)
    return (
      <Cell {...this.props}>
        {rowObject ? rowObject[columnKey] : 'pending'}
      </Cell>
    )
  }
}

const PagedCell = (props) => {
  const dataVersion = props.data.getDataVersion()
  return (
    <PendingCell
      data={props.data}
      dataVersion={dataVersion}
      {...props} />
  )
}
module.exports.PagedCell = PagedCell

class RemovableHeaderCell extends React.PureComponent {
  render () {
    // const {data, rowIndex, columnKey, callback, children} = this.props
    const {columnKey, callback, children} = this.props
    return (
      <Cell {...this.props}>
        {children}
        <a style={{float: 'right'}} onClick={() => callback(columnKey)}>
          {'\u274C'}
        </a>
      </Cell>
    )
  }
}
module.exports.RemovableHeaderCell = RemovableHeaderCell

class TextCell extends React.PureComponent {
  render () {
    const {data, rowIndex, columnKey} = this.props
    return (
      <Cell {...this.props}>
        {data.getObjectAt(rowIndex)[columnKey]}
      </Cell>
    )
  }
}
module.exports.TextCell = TextCell

class TooltipCell extends React.PureComponent {
  render () {
    const {data, rowIndex, columnKey} = this.props
    const value = data.getObjectAt(rowIndex)[columnKey]
    return (
      <Cell {...this.props}
        onMouseEnter={() => { ReactTooltip.show() }}
        onMouseLeave={() => { ReactTooltip.hide() }}>
        <div ref='valueDiv' data-tip={value}>
          {value}
        </div>
      </Cell>
    )
  }
}
module.exports.TooltipCell = TooltipCell
