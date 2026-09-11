import { useEffect, useRef, useState } from 'react';

const cards = [
  { id: 1, title: 'Adeus, Taxas Abusivas', subtitle: 'Livre-se dos 27% do iFood', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800' },
  { id: 2, title: 'Tráfego Direto', subtitle: 'Seu WhatsApp Lotado', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800' },
  { id: 3, title: 'Posicionamento Premium', subtitle: 'Seja Visto como Autoridade', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800' },
  { id: 4, title: 'Sem Esforço Técnico', subtitle: 'Nós Cuidamos de Tudo', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800' },
];

export default function FeaturesHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !scrollContainerRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top / (rect.height - window.innerHeight);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      // maxTranslate é a largura total dos cards menos a largura da tela
      const maxTranslate = scrollContainerRef.current.scrollWidth - window.innerWidth;
      setTranslateX(-maxTranslate * clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="h-[400vh] relative bg-brandDark">
      
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        
        <div className="absolute top-20 left-16 z-20">
          <h2 className="font-oswald text-4xl md:text-5xl uppercase font-bold text-white mb-2">
            O Sistema de <span className="text-brandGold">Crescimento</span>
          </h2>
          <p className="text-white/60 font-medium">Role para baixo e acompanhe a esteira.</p>
        </div>

        {/* Trilho horizontal */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-12 px-16 w-max will-change-transform mt-16"
          style={{ transform: `translateX(${translateX}px)`, transition: 'transform 0.1s ease-out' }}
        >
          {cards.map((card, i) => (
            <div key={card.id} className="group relative w-[400px] md:w-[500px] h-[550px] overflow-hidden rounded-[2rem] border border-brandGold/20 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] ease-out group-hover:scale-[1.05]"
                style={{ backgroundImage: `url(${card.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-brandDark/50 to-transparent group-hover:from-brandDark/90 transition-all duration-500" />
              
              <div className="absolute bottom-0 left-0 p-10 w-full">
                <div className="text-brandGold text-sm font-bold tracking-widest uppercase mb-2">0{i + 1} // {card.subtitle}</div>
                <h3 className="text-4xl text-white font-oswald font-bold uppercase mb-6 leading-tight">{card.title}</h3>
                
                <div className="overflow-hidden">
                  <button className="flex items-center gap-2 text-brandGold uppercase text-sm font-bold translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] bg-brandGold/10 px-6 py-3 rounded-full border border-brandGold/30 hover:bg-brandGold hover:text-brandDark">
                    Como funciona <span className="text-xl leading-none">→</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
