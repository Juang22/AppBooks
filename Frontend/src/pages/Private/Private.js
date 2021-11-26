import { Menu } from '../../components';
import { Books } from '../../components/Books';
import Footer from '../../components/Footer/Footer';

import './Private.css';

export function Private() {
  return (
    <div className='private-container'>
      <Menu />
      <div className='private-content'>
        <h3>List of Books</h3>
        <Books />
      </div>
      <Footer />
    </div>
  );
}
