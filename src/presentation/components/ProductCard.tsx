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
    `${import.meta.env.BASE_URL}/images/producto.png`,
    `${import.meta.env.BASE_URL}/images/pet-solution.png`,
    `${import.meta.env.BASE_URL}/images/producto.png`
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
            <p className="description" dangerouslySetInnerHTML={{__html: productData.product.description}}></p>
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
              <h4>Cada Toallitas PET SOLUTION es segura de usar en perros, gatos y otros animales pequeños y dejará a su mascota... ¡mirando y oliendo fresco!</h4>
              <ul>
                {productData.product.benefits.map((benefit, index) => (
                  <li key={index} style={{animationDelay: `${index * 0.2}s`}}>{benefit}</li>
                ))}
              </ul>
            </div>
            
            <div className="slide ingredients-slide" ref={ingredientsRef}>
              <h3>Uso</h3>
              <ul className="ingredients-list">
                <li>
                  
                  <img 
                    src="images/cara_orejas.png" 
                    alt="Cara y orejas"
                    className="ingredient-image"
                  />
                  <span className="ingredient-text">Cara y orejas</span>
                  <span className="ingredient-description">
                    <h4>Limpieza de la cara</h4>
                    <ol>
                      <li>Utiliza una toallita pet Solution paño húmedo</li>
                      <li>Evita el contacto con ojos, nariz y oídos</li>
                      <li>Masajeale suavemente la cabeza</li>
                      <li>Limpia los pliegues de su cara, especialemtne alrededor de los ojos y la boca.</li>
                      <li>Asegúrate de que no quede humedad en la cara</li>
                    </ol>
                    <h4>Limpieza de las orejas</h4>
                    <ol>
                      <li>Revisa las orejas: Busca signos de infección o irritación antes de comenzar la limpieza</li>
                      <li>Masaea suavemente la base de la oreja con una toallita Pet Solution con movimiento regulares hasta que se desprenda el cerumen y la suciedad No ingresar a su pabelloón auricular.</li>
                      <li>Deja que sacuda la cabeza:Esto ayudará a que la suciedad salga del oído.</li>
                      <li>Limpia el exterior de la oreja: utiliza otra toallita Pet Solution para limpiar la parte externa de la oreja y la entrada del canal auditivo.</li>
                      <li>Nunca uses hisopos: pueden dañar el oído iterno.</li>
                      <li>Consulta con el veterinario: Si notas algún signo de infeccón o irritación, consulta con tu veterinario</li>
                    </ol>
                  </span>
                </li>
                
                <li>
                  
                  <img 
                    src="images/extremidades.png" 
                    alt="Extremidades"
                    className="ingredient-image"
                  />
                  <span className="ingredient-text">Extremidades</span>
                  <span className="ingredient-description">
                    <h4>Pasos para limpiar las patas</h4>
                    <ol>
                      <li>Si las patas está muy sucias:<br/>Si las patas están muy sucias, puedes usar un champú para perrors diluido en agua tibia. Frota suavemente las patas, especialmente entre los dedos y las almohadillas, y luego enjuaga con agua</li>
                      <li>Utiliza toallitas Pet Solution:<br/>Estas toallitas son suaves y ayudan a eliminar la suciedad y los residuos de las patas de tu perro.</li>
                      <li>Sécalas con una toalla:<br/>Después de limpiar, sécalas bien con una toalla limpia para evitar que resbalen o dejen huellas de humedad en la casa.</li>
                      <li>Sécalas con una toalla:<br/>Desúes de limpiar, sécalas bien con una toalla limpia para evitar que resbalen o dejen huellas de humedad en la casa.</li>
                      <li>Revisa las patas:<br/>Busca heridas, cortes o ampollas. Si encuentras alguna, lávala con agua y un antiséptico para mascotas y, si parece grave, consulta a tu veterinario.</li>
                    </ol>
                    <h4>Consideraciones adicionales:</h4>
                    <ol>
                      <li>No uses toallitas húmedas para humanos:<br/>Estas pueden contener sustancias perjudiciales para la piel de tu perro</li>
                      <li>Corta las uñas regularmente:Esto ayudará a que las patas de tu perro estén más limpias y saludables.</li>
                      <li>Crea una estación de limpieza:<br/>Coloca un recipiente con agua y toallas cerca de la puerta de entrada para facilitar la limpieza de las patas de tu perro después de cada paseo.</li>
                    </ol>
                  </span>
                </li>
                
                <li>
                  
                  <img 
                    src="images/pelaje_cuerpo.png" 
                    alt="Pelaje y cuerpo"
                    className="ingredient-image"
                  />
                  <span className="ingredient-text">Pelaje y cuerpo</span>
                  <span className="ingredient-description">
                    <h4>Para mantener el pelo de tu perro limpio, puedes optar por el baño tradicional con champú para perros, cepillado regular y para una limpieza rápida o parcial con toallitas Pet Solution.</h4>
                    <br/>Utiliza las toallitas húmedas Pet Solution diseñadas limpiar áreas específicas o para un alimpieza rápida. <br/>
                    <ol>
                      <li>Empieza estirando la toallita de cabeza a la cola y pasa después en los flancos.</li>
                      <li>Busca de pasar si es posible, la toallita, siempre en el sentido del pelo, si un área es muy sucia puedes limpiarla en el sentido contrario del pelo, con movimientos suaves y armoniosos.</li>
                      <li>Coje sistemáticamente una toallita limpia para limpiar las zonas alrededor de sus órganos genitales y de su ano.</li>
                    </ol>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  );
}; 