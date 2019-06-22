import * as React from 'react';
import {connect} from 'react-redux';

import FilmCard from '../film-card/film-card';
import FilterList from '../filter-list/filter-list';
import FilmsList from '../films-list/films-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import {Footer} from '../footer/footer';

import {withActiveItem} from '../../hocs/with-active-item/with-active-item';

import {ActionCreator} from '../../reducer/films/films';

import {Film} from '../../types';

const WrappedFilterList = withActiveItem(FilterList);

interface Props {
  film: Film;
  onPlayButtonClick: () => void;
  resetDisplayedFilmsNumber: () => void,
}

export class MainPage extends React.PureComponent<Props, null> {
  componentDidMount(): void {
    const {resetDisplayedFilmsNumber} = this.props;

    resetDisplayedFilmsNumber();
  }

  render(): JSX.Element {
    const {film, onPlayButtonClick} = this.props;

    return (
      <React.Fragment>
        <FilmCard film={film} onPlayButtonClick={onPlayButtonClick}/>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <WrappedFilterList />

            <FilmsList />

            <ShowMoreButton />
          </section>

          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetDisplayedFilmsNumber: (): void => {
    dispatch(ActionCreator.resetDisplayedFilmsNumber());
  },
});

export default connect(null, mapDispatchToProps)(MainPage);
