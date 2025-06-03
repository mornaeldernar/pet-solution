import { ProductCard } from './presentation/components/ProductCard';
import { CommentsSection } from './presentation/components/CommentsSection';
import ScrollDog from './presentation/components/ScrollDog';
import { useState } from 'react';
import './App.css';

function App() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleLogoLoad = () => {
    setLogoLoaded(true);
    setLogoError(false);
  };

  const handleLogoError = () => {
    setLogoLoaded(false);
    setLogoError(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-container">
          {!logoError && (
            <img 
              src={`${import.meta.env.BASE_URL}/images/pet_solution.png`} 
              alt="Pet SOLUTION Logo" 
              className={`logo ${logoLoaded ? 'loaded' : 'loading'}`}
              onLoad={handleLogoLoad}
              onError={handleLogoError}
            />
          )}
          {logoError && (
            <div className="logo-text">
              <span className="pet">Pet</span>
              <span className="solution">SOLUTION</span>
            </div>
          )}
        </div>
        <h1>Toallitas de limpieza humectantes</h1>
        <h2 className="no-alcohol">Sin alcohol</h2>
      </header>
      <main>
        <ProductCard />
        <CommentsSection />
      </main>
      <footer className="app-footer">
        <div className="footer-content">
        <p>© 2024 <img 
              src={`${import.meta.env.BASE_URL}/images/logo.png`} 
              alt="OPSM Logo" 
              className={`footer-logo`}
            /> - Todos los derechos reservados</p>
        </div>
      </footer>
      <ScrollDog />
    </div>
  );
}

export default App;
