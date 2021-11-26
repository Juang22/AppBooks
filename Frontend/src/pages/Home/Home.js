import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Home.css';

export function Home() {
  return (
    <>
      <div className='home-container'>
        <Header />
        <div className='home-content'>
          <h3>Welcome to</h3>
          <h1>YourBooks</h1>
        </div>
        <Footer />
      </div>
    </>
  );
}
