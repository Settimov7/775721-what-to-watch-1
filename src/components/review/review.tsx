import * as React from 'react';
import * as moment from 'moment';

import {User} from '../../types';

interface Props {
  comment: string;
  user: User;
  date: string;
  rating: number;
}

export const Review: React.FunctionComponent<Props> = (props) => {
  const {comment, user, date, rating} = props;
  const momentDate = moment(date);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={momentDate.format(`YYYY-MM-DD`)}>{momentDate.format(`MMMM DD, YYYY`)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};
