import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const JokesPage = lazy(() => import('./pages/JokesPage'));
const NotFound = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading Component...</div>}>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/jokes/:category" element={<JokesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
