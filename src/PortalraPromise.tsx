import { useEffect, useRef, useState } from 'react';

export default function PortalraPromise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clipProgress, setClipProgress] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress as the element enters and moves through the viewport
      // 0 progress when element top hits bottom of screen
      // 1 progress when element center hits center of screen
      const totalDist = windowHeight;
      const currentDist = windowHeight - rect.top;
      let progress = currentDist / totalDist;
      
      progress = Math.max(0, Math.min(1, progress));
      setClipProgress(100 - (progress * 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-cover bg-fixed bg-center flex items-center justify-center py-32 px-8"
      style={{ backgroundImage: 'url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/09fd4820-ff21-47a8-b915-20b74cb1a37a_3840w.png)' }}
    >
      <div className="absolute inset-0 bg-[#0B101A]/80 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="font-oswald text-2xl md:text-3xl text-white/50 uppercase tracking-widest mb-8">The Portalra Promise</h2>
        
        <div className="relative font-oswald text-4xl md:text-6xl lg:text-8xl uppercase leading-tight font-bold">
          {/* Base Text (Muted) */}
          <div className="text-white/10" aria-hidden="true">
            We don't just take you places. We redefine your perspective on what an escape can truly be.
          </div>
          
          {/* Highlight Text (Gold) */}
          <div 
            className="absolute top-0 left-0 w-full h-full text-[#C8A96A]"
            style={{ clipPath: `inset(0 ${clipProgress}% 0 0)` }}
          >
            We don't just take you places. We redefine your perspective on what an escape can truly be.
          </div>
        </div>
      </div>
    </section>
  );
}
