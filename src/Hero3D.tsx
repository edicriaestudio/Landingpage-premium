import { useEffect, useRef, useState } from 'react';

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
    handleScroll(); // Init
    updateScroll(); // Start loop

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scale = 1 + scrollProgress * 25;
  const doorAngle = scrollProgress > 0.05 ? -115 * Math.sin(((scrollProgress - 0.05) / 0.95) * (Math.PI / 2)) : 0;
  const parallaxY = scrollProgress * -100;
  const whiteoutOpacity = scrollProgress > 0.8 ? (scrollProgress - 0.8) / 0.2 : 0;

  return (
    <div ref={containerRef} className="h-[300vh] z-10 relative">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: '1200px' }}>
        
        {/* Background Base */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1fb0d000-28e3-4a63-9571-a768c099c566_3840w.png)' }}
        />

        {/* Scene Wrapper */}
        <div 
          className="absolute inset-0 flex items-center justify-center transform-gpu"
          style={{ 
            transformStyle: 'preserve-3d', 
            transformOrigin: '50% 55%',
            transform: `scale(${scale})`
          }}
        >
          {/* Portal View (What's inside the door) */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1968)',
              transform: 'translateZ(-2px)' 
            }}
          />

          {/* Door Frame */}
          <div 
            className="relative w-[300px] h-[500px] border-[16px] border-[#EAE6DF] rounded-t-[160px] bg-transparent"
            style={{ transform: 'translateZ(1px)' }}
          >
            {/* Door Panel */}
            <div 
              className="absolute inset-0 bg-[#0B101A] border-2 border-[#C8A96A]/20 rounded-t-[144px] flex items-center justify-center overflow-hidden"
              style={{ 
                transformOrigin: 'left', 
                transform: `translateZ(2px) rotateY(${doorAngle}deg)`,
                zIndex: 20
              }}
            >
              {/* Inner Door Details */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1F3E3D]/50 to-transparent" />
              <div className="w-12 h-12 border border-[#C8A96A] rounded-full flex items-center justify-center absolute right-4">
                <div className="w-8 h-8 bg-[#C8A96A] rounded-full" />
              </div>
            </div>
          </div>

          {/* Ground Plane */}
          <div 
            className="absolute top-[60%] w-[200vw] h-[100vh] bg-cover bg-top"
            style={{ 
              backgroundImage: 'url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/05b11cf5-028b-41dd-9248-8b56e028f570_3840w.png)',
              transform: 'rotateX(80deg) translateZ(-100px)',
              zIndex: 10
            }}
          />
        </div>

        {/* UI Overlay */}
        <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-between py-12">
          
          <header className="w-full px-8 flex justify-between items-center pointer-events-auto" style={{ transform: `translateY(${parallaxY * 0.2}px)` }}>
            <div className="text-[#C8A96A] font-oswald text-2xl font-bold uppercase tracking-widest">Portalra</div>
            <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase">
              <a href="#" className="hover:text-[#C8A96A] transition-colors duration-300">Destinations</a>
              <a href="#" className="hover:text-[#C8A96A] transition-colors duration-300">Experiences</a>
              <a href="#" className="hover:text-[#C8A96A] transition-colors duration-300">About</a>
            </nav>
            <button className="bg-[#C8A96A] text-[#0B101A] px-6 py-2 font-medium uppercase text-sm hover:bg-white transition duration-300">
              Book Now
            </button>
          </header>

          <div className="text-center pointer-events-auto" style={{ transform: `translateY(${parallaxY}px)` }}>
            <h1 className="font-oswald text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter text-white mb-4 drop-shadow-2xl">
              Escape <br/> The Ordinary
            </h1>
            <p className="text-lg md:text-xl text-[#F4F4F5] max-w-lg mx-auto font-light drop-shadow-md">
              Step through the portal to untouched destinations and bespoke adventures.
            </p>
          </div>
          
          <div className="text-[#C8A96A] flex flex-col items-center animate-bounce pointer-events-auto" style={{ transform: `translateY(${parallaxY * 0.5}px)`, opacity: 1 - scrollProgress * 5 }}>
            <span className="text-xs uppercase tracking-[0.2em] mb-2 font-medium">Scroll to enter</span>
            <iconify-icon icon="lucide:arrow-down" width="24" height="24"></iconify-icon>
          </div>
        </div>

        {/* Whiteout transition to next section */}
        <div 
          className="absolute inset-0 bg-white pointer-events-none z-[60]"
          style={{ opacity: whiteoutOpacity }}
        />
      </div>
    </div>
  );
}
