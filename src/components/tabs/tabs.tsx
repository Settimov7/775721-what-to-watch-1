import * as React from 'react';

type Tab = {
  title: string,
  component: React.ReactElement,
}

interface Props {
  tabs: Tab[];
  activeItem: number;
  onChange: (index: number) => void;
}

export const Tabs = (props: Props) => {
  const {tabs, activeItem, onChange} = props;

  const activeComponent = tabs[activeItem].component;

  const renderNavigation = () => (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {tabs.map((tab, index) => {
          const {title} = tab;
          const isActive = index === activeItem;

          return (
            <li key={title} className={`movie-nav__item ${isActive && 'movie-nav__item--active'}`}>
              <a className="movie-nav__link"
                onClick={(evt) => {
                  evt.preventDefault();

                  onChange(index)
                }}>
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return(
    <React.Fragment>
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {renderNavigation()}
        </ul>
      </nav>

      {activeComponent}
    </React.Fragment>
  );
};
