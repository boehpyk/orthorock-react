import React, { Component } from 'react';

class Loader extends Component {

    state = {
        points: '.'
    };

    componentDidMount() {
        this.showPoints('.', 5);
    }

    componentWillUnmount() {
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
            this.timerHandle = 0;
        }
    };

    render() {
        return (
            <div className="loader">
                { `${this.props.text}${this.state.points}` }
            </div>
        );
    }

  showPoints = (sign, num) => {
      if (num > (this.state.points.length)) {
          const newPoints = this.state.points + sign;
          this.setState(
              {
                  points: newPoints
              }
          );
          this.timerHandle = setTimeout( () => { this.showPoints(sign, num) }, 500 );
      }
      else {
          this.setState(
              {
                  points: '.'
              }
          );
          this.timerHandle = setTimeout( () => { this.showPoints(sign, num) }, 500 );
      }
  }
}

export default Loader;
