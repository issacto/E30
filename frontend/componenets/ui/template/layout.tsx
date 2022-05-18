import React, { Component, useEffect } from 'react'
import { LayoutHeader, LayoutFooter } from '../component'

export class NonLoginLayout extends Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <LayoutHeader />
        <div className="main">{children}</div>
        <LayoutFooter />
      </div>
    )
  }
}
