import * as React from 'react';
import {shallow} from 'enzyme';

import {AddReview} from "./add-review";

it(`On input comment change correctly change state`, () => {
  const postReview = jest.fn();
  const props = {
    filmId: 1,
    filmName: `Film-1`,
    backgroundImage: `/image.jpg`,
    poster: `/image.jpg`,
    backgroundColor: `#123456`,
    userAvatarSrc: `/image.jpg`,
    postReview,
  };
  const RATING  = 5;
  const addReview = shallow(<AddReview {...props} />);

  addReview.instance()._ratingChangeHandler(RATING);

  expect(addReview.state()).toEqual({
    rating: RATING,
    comment: ``,
  });
});

it(`On input comment change correctly change state`, () => {
  const postReview = jest.fn();
  const props = {
    filmId: 1,
    filmName: `Film-1`,
    backgroundImage: `/image.jpg`,
    poster: `/image.jpg`,
    backgroundColor: `#123456`,
    userAvatarSrc: `/image.jpg`,
    postReview,
  };
  const COMMENT_TEXT  = `Some random comment text`;
  const addReview = shallow(<AddReview {...props} />);
  const commentInput = addReview.find(`.add-review__textarea`);

  commentInput.simulate(`input`, {
    target: {
      value: COMMENT_TEXT,
    }
  });

  addReview.update();

  expect(addReview.state()).toEqual({
    rating: 3,
    comment: COMMENT_TEXT,
  });
});

it(`On submit function trigger handler with prevent default`, () => {
  const postReview = jest.fn();
  const props = {
    filmId: 1,
    filmName: `Film-1`,
    backgroundImage: `/image.jpg`,
    poster: `/image.jpg`,
    backgroundColor: `#123456`,
    userAvatarSrc: `/image.jpg`,
    postReview,
  };
  const formSendPrevention = jest.fn();
  const addReview = shallow(<AddReview {...props} />);
  const form = addReview.find(`.add-review__form`);

  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(formSendPrevention).toHaveBeenCalledTimes(1);
  expect(postReview).toHaveBeenCalledTimes(1);
});