import React from 'react';
import { render } from 'react-dom';
import BackgroundArt from './components/background-art';

render(<BackgroundArt rowCount={4} colCount={4} />, document.getElementById('app'));