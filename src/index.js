import * as React from 'react';
import {render} from 'react-dom';

import {App} from './components/app/app';
import {films} from './mocks/films';

render(<App films={films}/>, document.getElementById(`root`));
