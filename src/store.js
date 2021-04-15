import { createStore, action, persist } from 'easy-peasy';

const store = createStore(persist({
    userData: null,
    scoreData: null,
    jwt: null,
    appLoading: false,
    products: [],
    history: [],
    updateScore: action((state, payload) => {
        state.scoreData = payload;
    }),
    updateHistory: action((state, payload) => {
        state.history = payload;
    }),
    update: action((state, payload) => {
        state.scoreData = payload.scoreData;
        state.products = payload.products;
        state.history = payload.history;
    }),
    setAppLoading: action((state, toggled) => {
        state.appLoading = toggled;
    }),
    login: action((state, payload) => {
        state.userData = payload.data.userData;
        state.scoreData = payload.data.scoreData;
        state.history = payload.data.history;
        state.jwt = payload.jwt;
    }),
    logout: action((state) => {
        state.userData = null;
        state.scoreData = null;
        state.history = null;
        state.jwt = null;
    }),
    darkmode: false,
    setDarkmode: action((state, toggled) => {
        state.darkmode = toggled;
    })
}));

export default store;
