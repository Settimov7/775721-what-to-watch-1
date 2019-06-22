import * as React from 'react';

interface Props {
  value: number;
  isChecked: boolean;
  onClick: React.MouseEventHandler<HTMLInputElement>;
}

export const RatingStar: React.FunctionComponent<Props> = (props) => {
  const {value, isChecked, onClick} = props;

  return (
    <React.Fragment>
      <input
        className="rating__input"
        id={`star-${value}`}
        type="radio"
        name="rating"
        value={value}
        checked={isChecked}
        onClick={onClick}
      />
      <label
        className="rating__label"
        htmlFor={`star-${value}`}
      >
        Rating {value}
      </label>
    </React.Fragment>
  );
};
