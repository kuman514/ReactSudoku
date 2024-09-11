import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '^/app';
import '^/app/styles/global.css';

(() => {
  const root = document.querySelector('#root');
  if (root) {
    ReactDOM.createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
})();
