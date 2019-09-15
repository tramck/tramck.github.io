import { createStore, action, Action } from 'easy-peasy';

interface Colors {
    strokeColor: string;
    bgColor: string;
};

interface ColorsModel extends Colors {
    updateColors: Action<ColorsModel, Colors>;
}

interface StoreModel {
    colors: ColorsModel;
}

export default ({ strokeColor, bgColor }) => {
    const colorsModel: ColorsModel = {
        strokeColor,
        bgColor,
        updateColors: action((state, payload) => {
            state.strokeColor = payload.strokeColor;
            state.bgColor = payload.bgColor;
        }),
    };
    const storeModel: StoreModel = {
        colors: colorsModel
    };
    return createStore(storeModel);
};