import {
  reducer,
  actionCreator,
} from "./reducer";

describe(`Action creators work correctly`, () => {
  it(`Filter change correct`, () => {
    expect(actionCreator.changeCurrentFilterByFilmGenre(`comedy`)).toEqual({
      type: `CHANGE_CURRENT_FILTER_BY_FILM_GENRE`,
      payload: `comedy`,
    });
  });

  it(`Loading films correctly`, () => {
    expect(actionCreator.loadFilms([
      {
        id: 1,
        title: `Fantastic Beasts: The Crimes of Grindelwald`,
        genre: `fantastic`,
        posterSrc: `poster.jpg`,
        videoSrc: `video.mp4`,
      },
      {
        id: 2,
        title: `Bohemian Rhapsody`,
        genre: `drama`,
        posterSrc: `poster.jpg`,
        videoSrc: `video.mp4`,
      },
    ])).toEqual({
      type: `LOAD_FILMS`,
      payload: [
        {
          id: 1,
          title: `Fantastic Beasts: The Crimes of Grindelwald`,
          genre: `fantastic`,
          posterSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
        {
          id: 2,
          title: `Bohemian Rhapsody`,
          genre: `drama`,
          posterSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
      ],
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      currentFilterByFilmGenre: `all`,
      films: [],
    });
  });

  it(`Reducer should change filter by a given value`, () => {
    expect(reducer({
      currentFilterByFilmGenre: `all`,
      films: [],
    }, {
      type: `CHANGE_CURRENT_FILTER_BY_FILM_GENRE`,
      payload: `drama`,
    })).toEqual({
      currentFilterByFilmGenre: `drama`,
      films: [],
    });
  });

  it(`Reducer should change films by a given array of films`, () => {
    expect(reducer({
      currentFilterByFilmGenre: `all`,
      films: [],
    }, {
      type: `LOAD_FILMS`,
      payload: [
        {
          id: 1,
          title: `Fantastic Beasts: The Crimes of Grindelwald`,
          genre: `fantastic`,
          posterSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
        {
          id: 2,
          title: `Bohemian Rhapsody`,
          genre: `drama`,
          posterSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
      ],
    })).toEqual({
      currentFilterByFilmGenre: `all`,
      films: [
        {
          id: 1,
          title: `Fantastic Beasts: The Crimes of Grindelwald`,
          genre: `fantastic`,
          posterSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
        {
          id: 2,
          title: `Bohemian Rhapsody`,
          genre: `drama`,
          posterSrc: `poster.jpg`,
          videoSrc: `video.mp4`,
        },
      ],
    });
  });
});
