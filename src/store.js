import { createStore, action, persist } from 'easy-peasy';

const store = createStore(persist({
    userData: null,
    scoreData: null,
    jwt: null,
    loginLoading: false,
    updateScore: action((state, payload) => {
        state.scoreData = payload;
    }),
    setLoginLoading: action((state, payload) => {
        state.loginLoading = payload;
    }),
    login: action((state, payload) => {
        state.userData = payload.data.userData;
        state.scoreData = payload.data.scoreData;
        state.jwt = payload.jwt;
    }),
    logout: action((state) => {
        state.userData = null;
        state.scoreData = null;
        state.jwt = null;
    }),
    darkmode: false,
    setDarkmode: action((state, toggled) => {
        state.darkmode = toggled;
    })
}));

export default store;
