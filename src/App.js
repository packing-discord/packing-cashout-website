import './App.css';
import { PageWrapper, ContentWrapper } from 'reacthalfmoon';
import Navbar from './components/Navbar';

function App() {
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
