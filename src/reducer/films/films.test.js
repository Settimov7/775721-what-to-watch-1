import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api";
import {reducer, ActionCreator, ActionType, Operation} from "./films";

describe(`Action creators work correctly`, () => {
  it(`Loading films correctly`, () => {
    expect(ActionCreator.loadFilms([
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
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      films: [],
    });
  });

  it(`Reducer should change films by a given array of films`, () => {
    expect(reducer({
      films: [],
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
    });
  });
});

describe(`Operations works correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const questionLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [
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
      ]);

    return questionLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
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
  });
});
