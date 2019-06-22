import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api";
import {
  reducer,
  ActionCreator,
  ActionType,
  Operation,
  DEFAULT_DISPLAYED_FILMS_NUMBER,
  INCREASE_DISPLAYED_FILMS_NUMBER_STEP,
} from "./films";

describe(`Action creators work correctly`, () => {
  it(`Loading films correctly`, () => {
    expect(ActionCreator.loadFilms([
      {
        id: 1,
        name: `Bronson`,
        [`poster_image`]: `https://es31-server.appspot.com/wtw/static/film/poster/bronson.jpg`,
        [`preview_image`]: `https://es31-server.appspot.com/wtw/static/film/preview/bronson.jpg`,
        [`background_image`]: `https://es31-server.appspot.com/wtw/static/film/background/bronson.jpg`,
        [`background_color`]: `#73B39A`,
        description: `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
        rating: 7.1,
        [`scores_count`]: 109661,
        director: `Nicolas Winding Refn`,
        starring: [`Tom Hardy`, `Kelly Adams`, `Luing Andrews`],
        [`run_time`]: 92,
        genre: `Action`,
        released: 2008,
        [`is_favorite`]: false,
        [`video_link`]: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
        [`preview_video_link`]: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      },
    ])).toEqual({
      type: ActionType.LOAD_FILMS,
      payload: [
        {
          id: 1,
          name: `Bronson`,
          posterImageSrc: `https://es31-server.appspot.com/wtw/static/film/poster/bronson.jpg`,
          previewImageSrc: `https://es31-server.appspot.com/wtw/static/film/preview/bronson.jpg`,
          backgroundImageSrc: `https://es31-server.appspot.com/wtw/static/film/background/bronson.jpg`,
          backgroundColor: `#73B39A`,
          description: `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
          rating: 7.1,
          scores: 109661,
          director: `Nicolas Winding Refn`,
          starring: [`Tom Hardy`, `Kelly Adams`, `Luing Andrews`],
          runTime: 92,
          genre: `Action`,
          releasedYear: 2008,
          isFavorite: false,
          videoSrc: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
          previewVideoSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
        },
      ],
    });
  });

  it(`Loading promo film correctly`, () => {
    expect(ActionCreator.loadPromoFilm({
      id: 1,
      name: `Bronson`,
      [`poster_image`]: `https://es31-server.appspot.com/wtw/static/film/poster/bronson.jpg`,
      [`preview_image`]: `https://es31-server.appspot.com/wtw/static/film/preview/bronson.jpg`,
      [`background_image`]: `https://es31-server.appspot.com/wtw/static/film/background/bronson.jpg`,
      [`background_color`]: `#73B39A`,
      description: `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
      rating: 7.1,
      [`scores_count`]: 109661,
      director: `Nicolas Winding Refn`,
      starring: [`Tom Hardy`, `Kelly Adams`, `Luing Andrews`],
      [`run_time`]: 92,
      genre: `Action`,
      released: 2008,
      [`is_favorite`]: false,
      [`video_link`]: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
      [`preview_video_link`]: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    })).toEqual({
      type: ActionType.LOAD_PROMO_FILM,
      payload: {
        id: 1,
        name: `Bronson`,
        posterImageSrc: `https://es31-server.appspot.com/wtw/static/film/poster/bronson.jpg`,
        previewImageSrc: `https://es31-server.appspot.com/wtw/static/film/preview/bronson.jpg`,
        backgroundImageSrc: `https://es31-server.appspot.com/wtw/static/film/background/bronson.jpg`,
        backgroundColor: `#73B39A`,
        description: `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
        rating: 7.1,
        scores: 109661,
        director: `Nicolas Winding Refn`,
        starring: [`Tom Hardy`, `Kelly Adams`, `Luing Andrews`],
        runTime: 92,
        genre: `Action`,
        releasedYear: 2008,
        isFavorite: false,
        videoSrc: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
        previewVideoSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      },
    });
  });

  it(`Correctly increase displayed films number`, () => {
    expect(ActionCreator.increaseDisplayedFilmsNumber()).toEqual({
      type: ActionType.INCREASE_DISPLAYED_FILMS_NUMBER,
    });
  });

  it(`Correctly reset displayed films number`, () => {
    expect(ActionCreator.resetDisplayedFilmsNumber()).toEqual({
      type: ActionType.RESET_DISPLAYED_FILMS_NUMBER,
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      films: [],
      promoFilm: null,
      displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
    });
  });

  it(`Reducer should change films by a given array of films`, () => {
    expect(reducer({
      films: [],
      promoFilm: null,
      displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
    }, {
      type: ActionType.LOAD_FILMS,
      payload: [
        {
          id: 1,
          name: `Bronson`,
          posterImageSrc: `https://es31-server.appspot.com/wtw/static/film/poster/bronson.jpg`,
          previewImageSrc: `https://es31-server.appspot.com/wtw/static/film/preview/bronson.jpg`,
          backgroundImageSrc: `https://es31-server.appspot.com/wtw/static/film/background/bronson.jpg`,
          backgroundColor: `#73B39A`,
          description: `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
          rating: 7.1,
          scores: 109661,
          director: `Nicolas Winding Refn`,
          starring: [`Tom Hardy`, `Kelly Adams`, `Luing Andrews`],
          runTime: 92,
          genre: `Action`,
          releasedYear: 2008,
          isFavorite: false,
          videoSrc: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
          previewVideoSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
        },
      ],
    })).toEqual({
      films: [
        {
          id: 1,
          name: `Bronson`,
          posterImageSrc: `https://es31-server.appspot.com/wtw/static/film/poster/bronson.jpg`,
          previewImageSrc: `https://es31-server.appspot.com/wtw/static/film/preview/bronson.jpg`,
          backgroundImageSrc: `https://es31-server.appspot.com/wtw/static/film/background/bronson.jpg`,
          backgroundColor: `#73B39A`,
          description: `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
          rating: 7.1,
          scores: 109661,
          director: `Nicolas Winding Refn`,
          starring: [`Tom Hardy`, `Kelly Adams`, `Luing Andrews`],
          runTime: 92,
          genre: `Action`,
          releasedYear: 2008,
          isFavorite: false,
          videoSrc: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
          previewVideoSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
        },
      ],
      promoFilm: null,
      displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
    });
  });

  it(`Reducer should change promo film by a given film`, () => {
    expect(reducer({
      films: [],
      promoFilm: null,
      displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
    }, {
      type: ActionType.LOAD_PROMO_FILM,
      payload: {
        id: 1,
        name: `Bronson`,
        posterImageSrc: `https://es31-server.appspot.com/wtw/static/film/poster/bronson.jpg`,
        previewImageSrc: `https://es31-server.appspot.com/wtw/static/film/preview/bronson.jpg`,
        backgroundImageSrc: `https://es31-server.appspot.com/wtw/static/film/background/bronson.jpg`,
        backgroundColor: `#73B39A`,
        description: `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
        rating: 7.1,
        scores: 109661,
        director: `Nicolas Winding Refn`,
        starring: [`Tom Hardy`, `Kelly Adams`, `Luing Andrews`],
        runTime: 92,
        genre: `Action`,
        releasedYear: 2008,
        isFavorite: false,
        videoSrc: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
        previewVideoSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      },
    })).toEqual({
      films: [],
      promoFilm: {
        id: 1,
        name: `Bronson`,
        posterImageSrc: `https://es31-server.appspot.com/wtw/static/film/poster/bronson.jpg`,
        previewImageSrc: `https://es31-server.appspot.com/wtw/static/film/preview/bronson.jpg`,
        backgroundImageSrc: `https://es31-server.appspot.com/wtw/static/film/background/bronson.jpg`,
        backgroundColor: `#73B39A`,
        description: `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
        rating: 7.1,
        scores: 109661,
        director: `Nicolas Winding Refn`,
        starring: [`Tom Hardy`, `Kelly Adams`, `Luing Andrews`],
        runTime: 92,
        genre: `Action`,
        releasedYear: 2008,
        isFavorite: false,
        videoSrc: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
        previewVideoSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      },
      displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
    });
  });

  it(`Reducer should increase display films number by a default step`, () => {
    expect(reducer({
      films: [],
      promoFilm: null,
      displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
    }, {
      type: ActionType.INCREASE_DISPLAYED_FILMS_NUMBER,
    })).toEqual({
      films: [],
      promoFilm: null,
      displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER + INCREASE_DISPLAYED_FILMS_NUMBER_STEP,
    });
  });

  it(`Reducer should reset display films number`, () => {
    expect(reducer({
      films: [],
      promoFilm: null,
      displayedFilmsNumber: 60,
    }, {
      type: ActionType.RESET_DISPLAYED_FILMS_NUMBER,
    })).toEqual({
      films: [],
      promoFilm: null,
      displayedFilmsNumber: DEFAULT_DISPLAYED_FILMS_NUMBER,
    });
  });
});

describe(`Operations works correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{
        id: 1,
        name: `Bronson`,
        [`poster_image`]: `https://es31-server.appspot.com/wtw/static/film/poster/bronson.jpg`,
        [`preview_image`]: `https://es31-server.appspot.com/wtw/static/film/preview/bronson.jpg`,
        [`background_image`]: `https://es31-server.appspot.com/wtw/static/film/background/bronson.jpg`,
        [`background_color`]: `#73B39A`,
        description: `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
        rating: 7.1,
        [`scores_count`]: 109661,
        director: `Nicolas Winding Refn`,
        starring: [`Tom Hardy`, `Kelly Adams`, `Luing Andrews`],
        [`run_time`]: 92,
        genre: `Action`,
        released: 2008,
        [`is_favorite`]: false,
        [`video_link`]: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
        [`preview_video_link`]: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      }]);

    return filmsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [{
            id: 1,
            name: `Bronson`,
            posterImageSrc: `https://es31-server.appspot.com/wtw/static/film/poster/bronson.jpg`,
            previewImageSrc: `https://es31-server.appspot.com/wtw/static/film/preview/bronson.jpg`,
            backgroundImageSrc: `https://es31-server.appspot.com/wtw/static/film/background/bronson.jpg`,
            backgroundColor: `#73B39A`,
            description: `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
            rating: 7.1,
            scores: 109661,
            director: `Nicolas Winding Refn`,
            starring: [`Tom Hardy`, `Kelly Adams`, `Luing Andrews`],
            runTime: 92,
            genre: `Action`,
            releasedYear: 2008,
            isFavorite: false,
            videoSrc: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
            previewVideoSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
          }],
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const promoFilmLoader = Operation.loadPromoFilm();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, {
        id: 1,
        name: `Bronson`,
        [`poster_image`]: `https://es31-server.appspot.com/wtw/static/film/poster/bronson.jpg`,
        [`preview_image`]: `https://es31-server.appspot.com/wtw/static/film/preview/bronson.jpg`,
        [`background_image`]: `https://es31-server.appspot.com/wtw/static/film/background/bronson.jpg`,
        [`background_color`]: `#73B39A`,
        description: `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
        rating: 7.1,
        [`scores_count`]: 109661,
        director: `Nicolas Winding Refn`,
        starring: [`Tom Hardy`, `Kelly Adams`, `Luing Andrews`],
        [`run_time`]: 92,
        genre: `Action`,
        released: 2008,
        [`is_favorite`]: false,
        [`video_link`]: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
        [`preview_video_link`]: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
      });

    return promoFilmLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: {
            id: 1,
            name: `Bronson`,
            posterImageSrc: `https://es31-server.appspot.com/wtw/static/film/poster/bronson.jpg`,
            previewImageSrc: `https://es31-server.appspot.com/wtw/static/film/preview/bronson.jpg`,
            backgroundImageSrc: `https://es31-server.appspot.com/wtw/static/film/background/bronson.jpg`,
            backgroundColor: `#73B39A`,
            description: `A young man who was sentenced to seven years in prison for robbing a post office ends up spending three decades in solitary confinement. During this time, his own personality is supplanted by his alter-ego, Charles Bronson.`,
            rating: 7.1,
            scores: 109661,
            director: `Nicolas Winding Refn`,
            starring: [`Tom Hardy`, `Kelly Adams`, `Luing Andrews`],
            runTime: 92,
            genre: `Action`,
            releasedYear: 2008,
            isFavorite: false,
            videoSrc: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
            previewVideoSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
          },
        });
      });
  });
});
