import './App.css';
import { PageWrapper, ContentWrapper, toggleDarkmode } from 'reacthalfmoon';
import Navbar from './components/Navbar';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect   } from 'react';
import UserPage from './components/UserPage';
import LoginPage from './components/LoginPage';
import LoadingAnimation from './components/LoadingAnimation';
import { fetchScore } from './api';

function App() {

  const userData = useStoreState((state) => state.userData);
  const jwt = useStoreState((state) => state.jwt);
  const darkmode = useStoreState((state) => state.darkmode);

  const appLoading = useStoreState((state) => state.appLoading);
  const setAppLoading = useStoreActions((actions) => actions.setAppLoading);

  const login = useStoreActions((actions) => actions.login);
  const updateScore = useStoreActions((actions) => actions.updateScore);
  
  useEffect(() => {
    toggleDarkmode(darkmode)
  }, [darkmode]);

  useEffect(() => {
    if (userData) {
      console.log('Fetching score');
      setAppLoading(true);
      fetchScore(jwt).then((score) => {
        console.log('Score updated', score)
        updateScore(score);
        setAppLoading(false);
      });
    }
  }, [userData]);

  useEffect(() => {
    if (window.location.href.includes('?code=')) {
      console.log('Code detected. Logging in...');
      setAppLoading(true);
      const code = window.location.href.split('?code=')[1];
      fetch(process.env.REACT_APP_API_URL+'/auth/login?code='+code).then((res) => {
        window.history.pushState({}, document.title, "/");
        res.json().then((data) => {
          console.log(data)
          setAppLoading(false);
          if (!data.error) {
            console.log('Logged in!');
            login(data);
          }
        });
      });
    }
  }, []);

  return (
    <PageWrapper withNavbar>
        <Navbar />
        <ContentWrapper>
          {appLoading ? <LoadingAnimation /> : userData ? <UserPage /> : <LoginPage />}
        </ContentWrapper>
    </PageWrapper>
  );
}

export default App;
