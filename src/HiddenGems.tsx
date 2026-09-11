import { useEffect, useRef, useState } from 'react';

const gems = [
  { id: 1, title: 'Nordic Silence', location: 'Norway', img: 'https://images.unsplash.com/photo-1520681283627-2c5e7b29a272?q=80&w=800' },
  { id: 2, title: 'Desert Mirage', location: 'Namibia', img: 'https://images.unsplash.com/photo-1547333590-47aa8c642eeb?q=80&w=800' },
  { id: 3, title: 'Emerald Canopy', location: 'Costa Rica', img: 'https://images.unsplash.com/photo-1518182170546-076616fd4fda?q=80&w=800' },
  { id: 4, title: 'Alpine Retreat', location: 'Switzerland', img: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=800' },
  { id: 5, title: 'Oceanic Abyss', location: 'Maldives', img: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=800' },
];

export default function HiddenGems() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !scrollContainerRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top / (rect.height - window.innerHeight);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      const maxTranslate = scrollContainerRef.current.scrollWidth - window.innerWidth;
      setTranslateX(-maxTranslate * clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="h-[500vh] relative bg-[#F4F4F5]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        
        <div className="px-8 md:px-16 mb-12">
          <h2 className="font-oswald text-4xl md:text-6xl text-[#0B101A] uppercase">Hidden Gems</h2>
          <p className="text-[#1F3E3D] mt-2 max-w-md">Discover locations untouched by the masses. Where silence is the only sound you'll hear.</p>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-8 px-8 md:px-16 w-max will-change-transform"
          style={{ transform: `translateX(${translateX}px)`, transition: 'transform 0.1s ease-out' }}
        >
          {gems.map((gem) => (
            <div key={gem.id} className="group relative w-[300px] md:w-[450px] h-[400px] md:h-[600px] overflow-hidden cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] ease-out group-hover:scale-[1.05]"
                style={{ backgroundImage: `url(${gem.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B101A]/80 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="text-[#C8A96A] text-sm uppercase tracking-widest font-semibold mb-2">{gem.location}</div>
                <h3 className="font-oswald text-3xl text-white uppercase mb-4">{gem.title}</h3>
                
                <div className="overflow-hidden">
                  <button className="flex items-center gap-2 text-white uppercase text-sm font-medium tracking-wide translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    style={{ transition: 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)' }}>
                    View Escape Details 
                    <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
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
