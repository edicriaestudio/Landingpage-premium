import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let targetScrollPos = 0;
    let currentScrollPos = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      
      let progress = scrolled / scrollHeight;
      progress = Math.max(0, Math.min(1, progress));
      targetScrollPos = progress;
    };

    const updateScroll = () => {
      currentScrollPos += (targetScrollPos - currentScrollPos) * 0.08;
      setScrollProgress(currentScrollPos);
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    updateScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scale = 1 + scrollProgress * 30; // Mais zoom para atravessar a porta de vez
  // A porta abre mais rápido
  const doorAngle = scrollProgress > 0.02 ? -120 * Math.sin(((scrollProgress - 0.02) / 0.98) * (Math.PI / 2)) : 0;
  
  // Parallax para o texto sumir suavemente
  const textOpacity = Math.max(0, 1 - scrollProgress * 4);
  const textTranslateY = scrollProgress * -150;

  const roomBg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"; // Parede de concreto escuro (moderno)
  const niteroiBg = "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070";

  return (
    // Trilho maior para o efeito não ser brusco
    <div ref={containerRef} className="h-[400vh] z-10 relative bg-[#060b13]">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: '1200px' }}>
        
        {/* Background da Sala Fechada */}
        <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${roomBg})` }} />

        {/* Scene Wrapper */}
        <div 
          className="absolute inset-0 flex items-center justify-center transform-gpu"
          style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 55%', transform: `scale(${scale})` }}
        >
          {/* A PRAIA DE NITERÓI (Atrás da Porta) */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${niteroiBg})`, transform: 'translateZ(-4px)' }} />

          {/* O Marco da Porta (Mais luxuoso) */}
          <div className="relative w-[340px] h-[560px] border-[12px] border-brandDark rounded-t-[160px] bg-transparent shadow-[0_0_80px_rgba(212,175,55,0.4)]" style={{ transform: 'translateZ(1px)' }}>
            
            {/* O Painel da Porta */}
            <div 
              className="absolute inset-0 bg-[#0B1528] rounded-t-[148px] flex flex-col items-center justify-center overflow-hidden"
              style={{ transformOrigin: 'left', transform: `translateZ(2px) rotateY(${doorAngle}deg)` }}
            >
              {/* Textura na porta e detalhes dourados para não ficar "feia/chapada" */}
              <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${roomBg})` }} />
              <div className="absolute inset-3 border border-brandGold/30 rounded-t-[140px]" />
              <div className="absolute inset-8 border border-brandGold/10 rounded-t-[120px]" />
              
              {/* Maçaneta luxuosa */}
              <div className="w-16 h-4 bg-brandGold/80 absolute right-4 rounded-full shadow-lg" style={{ top: '50%' }} />
            </div>
          </div>
        </div>

        {/* UI Flutuante (Texto Principal antes de abrir) */}
        <div 
          className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center pt-32"
          style={{ opacity: textOpacity, transform: `translateY(${textTranslateY}px)` }}
        >
          <div className="text-center px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandGold/10 border border-brandGold/40 text-brandGold text-sm font-bold tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.3)] uppercase mb-8">
              <Star size={16} /> O Guia Definitivo
            </div>
            <h1 className="text-6xl md:text-8xl text-white font-oswald font-extrabold uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] leading-[1.1]">
              Abra as Portas <br/>
              <span className="text-brandGold">de Niterói</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white font-medium max-w-2xl mx-auto drop-shadow-xl bg-black/30 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              Role para baixo e descubra como lotar o seu WhatsApp de clientes sem depender das taxas abusivas dos aplicativos.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
