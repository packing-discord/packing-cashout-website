import { createStore, action, persist } from 'easy-peasy';

const store = createStore(persist({
    userData: null,
    scoreData: null,
    jwt: null,
    loginLoading: false,
    setLoginLoading: action((state, payload) => {
        state.loginLoading = payload;
    }),
    login: action((state, payload) => {
        state.userData = payload.userData;
        state.scoreData = payload.scoreData
    }),
    darkmode: false,
    setDarkmode: action((state, toggled) => {
        state.darkmode = toggled;
    })
}));

export default store;
