import { useEffect, useRef,useState } from 'react';
import './ScrollDog.css';

const ScrollDog = () => {
  const dogRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [isFacingRight, setIsFacingRight] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!dogRef.current) return;
      // Detectar la dirección del scroll
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      // Actualizar la dirección en la que mira el perrito
      if (isScrollingDown !== isFacingRight) {
        setIsFacingRight(isScrollingDown);
      }

      
      lastScrollY.current = currentScrollY;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = currentScrollY / maxScroll;
      
      // Calcula la posición horizontal del perrito (de izquierda a derecha)
      const startPosition = -110;
      const endPosition = window.innerWidth - (375*.3)-110; // Restamos el ancho de un frame
      const currentPosition = startPosition + (scrollProgress * (endPosition - startPosition));
      
      // Calcula el frame de la animación basado en el scroll
      const totalFrames = 8;
      const currentFrame = Math.floor((scrollProgress * totalFrames * 4) % totalFrames);
      
      // Calcula la posición x,y del sprite
      const frameX = (currentFrame % 4) * 390; // 4 frames por fila, cada uno de 375px
      const frameY = Math.floor(currentFrame / 4) * 358; // 2 filas, cada una de 326px
      
      const scaleX = isScrollingDown ? 0.10 : -0.10;

      dogRef.current.style.transform = `translateX(${currentPosition}px) translateY(-10px) scale(${scaleX}, 0.10)`;
      dogRef.current.style.backgroundPosition = `-${frameX}px -${frameY}px`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-dog-container">
      <div ref={dogRef} className="scroll-dog"></div>
    </div>
  );
};

export default ScrollDog; 