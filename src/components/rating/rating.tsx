import * as React from 'react';

import {RatingStar} from '../rating-star/rating-star';

interface Props {
  max: number;
  onChange?: Function;
}

interface State {
  value: number,
}

export class Rating extends React.PureComponent <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: 3,
    };

    this._handleRatingElementClick = this._handleRatingElementClick.bind(this);
  }

  render() {
    const {max} = this.props;

    return (
      <div className="rating">
        <div className="rating__stars">
          {new Array(max).fill(null).map((star, index) => {
            const value = index + 1;
            const isChecked = value === this.state.value;

            return (
              <RatingStar
                key={value}
                value={value}
                isChecked={isChecked}
                onClick={this._handleRatingElementClick}
              />
            );
          })}
        </div>
      </div>
    )
  }

  _handleRatingElementClick(evt) {
    const {onChange} = this.props;
    const value = parseInt(evt.target.value);

    this.setState({
      value,
    });

    onChange && onChange(value);
  }
}
