import { useEffect, useRef, useState } from 'react';

const destinations = [
  { id: 1, name: 'Polar Regions', desc: 'Beyond the ice edge.', img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/05b11cf5-028b-41dd-9248-8b56e028f570_3840w.png' }, // Note: Using a Supabase asset as requested in prompt for Polar region
  { id: 2, name: 'Deep Jungle', desc: 'Into the wild unknown.', img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800' },
  { id: 3, name: 'Desert Sands', desc: 'Silence of the dunes.', img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800' },
  { id: 4, name: 'Volcanic Peaks', desc: 'Where earth breathes.', img: 'https://images.unsplash.com/photo-1612294119866-9dcde82fb323?q=80&w=800' },
];

export default function PopularDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumbPos, setThumbPos] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (maxScrollLeft > 0) {
        const ratio = el.scrollLeft / maxScrollLeft;
        setThumbPos(ratio * 75); // 100% track width - 25% thumb width = 75% max transform
      }
    };

    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // Initial trigger
      handleScroll();
    }

    // Intersection Observer for fade-up
    const fadeElements = document.querySelectorAll('.fade-up-element');
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <section className="bg-[#0B101A] py-32 px-8 md:px-16 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 fade-up-element opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div>
          <h2 className="font-oswald text-[#F4F4F5] text-5xl md:text-7xl uppercase">Explore Maps</h2>
          <p className="text-[#C8A96A] mt-4 font-medium tracking-wide">CHOOSE YOUR NEXT REALITY</p>
        </div>
        <div className="mt-8 md:mt-0 w-64 h-1 bg-[#1F3E3D] relative rounded-full">
          <div 
            className="absolute top-0 left-0 h-full w-1/4 bg-[#C8A96A] rounded-full"
            style={{ transform: `translateX(${thumbPos * 4}%)`, transition: 'transform 0.1s linear' }}
          />
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto hide-scrollbar pb-12 snap-x snap-mandatory"
      >
        {destinations.map((dest, i) => (
          <div 
            key={dest.id} 
            className="fade-up-element opacity-0 translate-y-8 transition-all duration-1000 ease-out flex-shrink-0 w-[85vw] md:w-[400px] snap-center group"
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <div className="overflow-hidden rounded-sm relative aspect-[4/5] cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${dest.img})` }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
            <div className="mt-6 flex justify-between items-start">
              <div>
                <h3 className="font-oswald text-2xl text-white uppercase">{dest.name}</h3>
                <p className="text-[#F4F4F5]/60 text-sm mt-1">{dest.desc}</p>
              </div>
              <button className="w-10 h-10 rounded-full border border-[#C8A96A] flex items-center justify-center text-[#C8A96A] hover:bg-[#C8A96A] hover:text-[#0B101A] transition-colors duration-300">
                <iconify-icon icon="lucide:arrow-up-right"></iconify-icon>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
