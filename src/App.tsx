import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import Router from './router/router';

function App() {
  return (
    <BrowserRouter>
      <Router />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
