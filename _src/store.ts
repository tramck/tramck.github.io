import { createStore, action, Action } from 'easy-peasy';

interface Colors {
    strokeColor: string;
    bgColor: string;
    faceColor: string;
};

interface ColorsModel extends Colors {
    updateColors: Action<ColorsModel, Colors>;
}

interface StoreModel {
    colors: ColorsModel;
}

export default ({ strokeColor, bgColor, faceColor }) => {
    const colorsModel: ColorsModel = {
        strokeColor,
        bgColor,
        faceColor,
        updateColors: action((state, payload) => {
            state.strokeColor = payload.strokeColor;
            state.bgColor = payload.bgColor;
            state.faceColor = payload.faceColor;
        }),
    };
    const storeModel: StoreModel = {
        colors: colorsModel
    };
    return createStore(storeModel);
};