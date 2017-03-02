import React, { Component } from 'react';

export default class Letter extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.letter !== nextProps.letter ||
      this.props.used !== nextProps.used) {
      return true;
    }

    return false;
  }
  render() {
    const className = `letter-box${(this.props.used ? ' used' : '')}`;
    return (
      <div data-letter={this.props.letter} className={className}>
        <div data-letter={this.props.letter}>{ this.props.letter.toUpperCase() }</div>
      </div>
    );
  }
}
