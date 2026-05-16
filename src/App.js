import { Analytics } from '@vercel/analytics/react';
import Home from './component/Home/home';

function App() {
  return (
    <>
      <Home />
      <Analytics />
    </>
  );
}

export default App;
