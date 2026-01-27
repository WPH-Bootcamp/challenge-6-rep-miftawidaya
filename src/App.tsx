import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { ScrollToTop } from './components/ScrollToTop';

/**
 * Main application router entry point.
 * Uses useRoutes hook with BrowserRouter from main.tsx.
 */
function App() {
  const element = useRoutes(routes);

  return (
    <>
      <ScrollToTop />
      {element}
    </>
  );
}

export default App;
