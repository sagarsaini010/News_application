import React, { Component } from 'react'
import spinnerGif from './spinner.gif.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={spinnerGif} alt="loading"/>

      </div>
    )
  }
}
