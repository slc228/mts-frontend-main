import React from "react";
import Lodash from 'lodash';

class AutofitWrap extends React.Component {
  constructor() {
    super();
    this.state = {
      height: 0,
    };
  }

  handleResize = Lodash.debounce(() => {
    // console.log('window resize');
    // console.log(document.body.offsetHeight);
    this.setState({
      height: document.body.offsetHeight - this.props.padding,
    });
  }, 500);

  componentDidMount() {
    this.setState({
      height: document.body.offsetHeight - this.props.padding,
    });
    this.event = window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.event);
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={{ height: `${this.state.height}px`, minHeight: `${this.props.minHeight}px` }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default AutofitWrap;