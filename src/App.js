import './App.css';
import { PageWrapper, ContentWrapper, toggleDarkmode } from 'reacthalfmoon';
import Navbar from './components/Navbar';
import { useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

function App() {

  const darkmode = useStoreState((state) => state.darkmode);
  
  useEffect(() => {
    toggleDarkmode(darkmode)
  }, [darkmode]);

  return (
    <PageWrapper withNavbar>
        <Navbar />
        <ContentWrapper>
            <h3>Content</h3>
            <h5>Content will go inside content wrapper</h5>
        </ContentWrapper>
    </PageWrapper>
  );
}

export default App;
