import './NotFound.css';

import Icon from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';

export function NotFound() {
  return (
    <div className='not-found-container'>
      <div className='not-found-msg'>
        <Icon
          path={mdiAlertCircle}
          title='alert'
          size={1}
          className='waitAnimate'
        />
        <h4>Page not found!</h4>
      </div>
    </div>
  );
}
