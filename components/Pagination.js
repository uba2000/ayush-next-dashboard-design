import React, { Component } from 'react'

export class Pagination extends Component {

  pageinationTitle = {
    fontWeight: 'normal',
    fontSize: '14.9316px',
    lineHeight: '26px',
    letterSpacing: '0.106655px',
    color: '#44444F',
  }

  render() {
    return (
      <div className="flex justify-between">
        <span className="" style={this.pageinationTitle}>
          1-10 of 32 Projects
        </span>
        <div className="">

        </div>
      </div>
    )
  }
}

export default Pagination