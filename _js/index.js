import React from 'react';
import { render } from 'react-dom';
import BackgroundArt from './components/background-art';

render(<BackgroundArt count={12} />, document.getElementById('app'));