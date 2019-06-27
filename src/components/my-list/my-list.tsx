import * as React from 'react';
import {connect} from 'react-redux';

import {Logo} from "../logo/logo";
import UserBlock from "../user-block/user-block";
import {Footer} from "../footer/footer";

import {getFavoriteFilms} from '../../reducer/films/selectors';
import {Operation} from "../../reducer/films/films";

import {Film} from "../../types";
import {FilmsList} from "../films-list/films-list";

interface Props {
  favoriteFilms: Film[];
  loadFavoriteFilms: () => void;
}

export class MyList extends React.PureComponent<Props, null> {
  componentDidMount(): void {
    this.props.loadFavoriteFilms()
  }

  render() {
    const {favoriteFilms} = this.props;

    return (
      <React.Fragment>
        <div className="user-page">
          <header className="page-header user-page__head">
            <Logo />

            <h1 className="page-title user-page__title">My list</h1>

            <UserBlock />
          </header>

          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <FilmsList films={favoriteFilms} />
          </section>

          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  favoriteFilms: getFavoriteFilms(state),
});

const mapDispatchToProps = {
  loadFavoriteFilms: Operation.loadFavoriteFilms,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
