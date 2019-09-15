import React from 'react';
import { render } from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import Background from './Background';
import './styles/style.less';

import createStore from './store';

const root = document.getElementById('background-canvas');

const INITIAL_STATE = {
    strokeColor: root.dataset['strokeColor'],
    bgColor: root.dataset['bgColor'],
};

const store = createStore(INITIAL_STATE);


const changeBgEls = (document.querySelectorAll('.change-bg')) as NodeListOf<HTMLElement>;

changeBgEls.forEach(el => {
    el.addEventListener('mouseenter', e => {
        store.dispatch.colors.updateColors({
            strokeColor: el.dataset['strokeColor'],
            bgColor: el.dataset['bgColor'],
        });
    });

    el.addEventListener('mouseleave', e => {
        store.dispatch.colors.updateColors(INITIAL_STATE);
    });
});


render(
    <StoreProvider store={store}>
        <Background still={typeof root.dataset['still'] !== 'undefined'} />
    </StoreProvider>,
    root
);