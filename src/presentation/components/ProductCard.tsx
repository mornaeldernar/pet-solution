import React, { useState, useEffect, useRef } from 'react';
import './ProductCard.css';
import productData from '../../data/product.json';

export const ProductCard: React.FC = () => {
  //const [selectedSection, setSelectedSection] = useState<'features' | 'benefits' | 'ingredients'>('features');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
  // Referencias para efecto paralax
  
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const productInfoRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  // Imágenes del producto
  const productImages = [
    "/images/producto.png",
    "/images/perrito_jugando.png",
    "/images/pet-solution.png",
    "/images/producto.png"
  ];
  

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  // Autorotación cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

// Observador de intersección para las animaciones
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-visible');
      }
    });
  }, { threshold: 0.3 }); // El elemento se anima cuando el 30% está visible

  // Observar las secciones
  if (featuresRef.current) observer.observe(featuresRef.current);
  if (benefitsRef.current) observer.observe(benefitsRef.current);
  if (ingredientsRef.current) observer.observe(ingredientsRef.current);

  return () => observer.disconnect();
}, []);

  return (
    <div className="product-card">
      <div className="product-layout">
        <div className="product-images-container" ref={imagesContainerRef}>
          <button className="carousel-button prev" onClick={prevImage}>
            ‹
          </button>
          <div className="product-image">
            <img 
              src={productImages[currentImageIndex]} 
              alt={`Producto ${currentImageIndex + 1}`}
              className="carousel-image"
            />
          </div>
          <button className="carousel-button next" onClick={nextImage}>
            ›
          </button>
          
        </div>
        
        <div className="product-info" ref={productInfoRef}>
          <div className="product-header">
            <h2>{productData.product.name}</h2>
            <p className="description">{productData.product.description}</p>
          </div>
          <div className="product-quote">
            <p>"Mi mascota es parte de mi familia, pero no puedo lavarlo a diario"</p>
          </div>
          <div className="product-slides">
            <div className="slide features-slide" ref={featuresRef}>
              <h3>Características</h3>
              <ul>
                {productData.product.features.map((feature, index) => (
                  <li key={index} style={{animationDelay: `${index * 0.2}s`}}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="slide benefits-slide" ref={benefitsRef}>
              <h3>Beneficios</h3>
              <ul>
                {productData.product.benefits.map((benefit, index) => (
                  <li key={index} style={{animationDelay: `${index * 0.2}s`}}>{benefit}</li>
                ))}
              </ul>
            </div>
            
            <div className="slide ingredients-slide" ref={ingredientsRef}>
              <h3>Uso</h3>
              <ul className="ingredients-list">
                {productData.product.ingredients.map((ingredient, index) => (
                  <li key={index} style={{animationDelay: `${index * 0.2}s`}}>
                    {ingredient[1] && (
                      <img 
                        src={ingredient[1]} 
                        alt={`Paso ${index + 1}`} 
                        className="ingredient-image"
                      />
                    )}
                    <span className="ingredient-text">{ingredient[0] || ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="availability" ref={productInfoRef}>
            <div className="store-logo">
              <img src="/costco-logo.png" alt="Costco Logo" />
            </div>
            <p className="availability-text">Disponible en tiendas Costco</p>
            <a href="https://www.costco.com.mx" target="_blank" rel="noopener noreferrer" className="store-link">
              Ver en Costco
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 