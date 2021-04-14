import './App.css';
import { PageWrapper, ContentWrapper, toggleDarkmode } from 'reacthalfmoon';
import Navbar from './components/Navbar';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import UserPage from './components/UserPage';
import LoginPage from './components/LoginPage';

function App() {

  const userData = useStoreState((state) => state.userData);
  const darkmode = useStoreState((state) => state.darkmode);

  const setLoginLoading = useStoreActions((actions) => actions.setLoginLoading);
  
  useEffect(() => {
    toggleDarkmode(darkmode)
  }, [darkmode]);

  useEffect(() => {
    if (window.location.href.includes('?code=')) {
      setLoginLoading(true);
      const code = window.location.href.split('?code=')[1];
      fetch(process.env.REACT_APP_API_URL+'/auth/login?code='+code).then((res) => {
        res.json().then((data) => {
          console.log(data)
          setLoginLoading(false);
          if (!data.error) {
            console.log('Logged in!');
            login(data);
          }
        });
      });
    }
  }, [setLoginLoading, login])

  return (
    <PageWrapper withNavbar>
        <Navbar />
        <ContentWrapper>
          {userData ? <UserPage /> : <LoginPage />}
        </ContentWrapper>
    </PageWrapper>
  );
}

export default App;
