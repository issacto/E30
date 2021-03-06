import React, { Component } from 'react'
import { BrandGithub, BrandLinkedin } from 'tabler-icons-react'

export class LayoutFooter extends Component {
  render() {
    return (
      <div className="layoutFooter">
        <a href="https://github.com/issacto">
          <BrandGithub
            size={58}
            strokeWidth={2}
            color={'white'}
            style={{ cursor: 'pointer' }}
          />
        </a>
        <a href="https://hk.linkedin.com/in/issacto">
          <BrandLinkedin
            size={58}
            strokeWidth={2}
            color={'white'}
            style={{ marginLeft: '3vh', cursor: 'pointer' }}
          />
        </a>
      </div>
    )
  }
}
