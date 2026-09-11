import { useEffect, useRef } from 'react';

export default function Footer() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fadeElements = document.querySelectorAll('.footer-fade');
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
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <footer className="bg-[#0B101A] border-t border-[#1F3E3D]/30 pt-24 pb-12 px-8 md:px-16 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        
        <div className="md:col-span-2 footer-fade opacity-0 translate-y-8 transition-all duration-700 delay-100">
          <h2 className="font-oswald text-[#C8A96A] text-5xl md:text-7xl uppercase mb-6">Portalra</h2>
          <p className="text-[#F4F4F5]/60 max-w-sm">
            Exclusive escapes for the modern traveler. Step outside the boundaries of the known world.
          </p>
        </div>

        <div className="footer-fade opacity-0 translate-y-8 transition-all duration-700 delay-300">
          <h4 className="text-white font-oswald uppercase text-xl mb-6">Explore</h4>
          <ul className="space-y-4 text-[#F4F4F5]/70 text-sm">
            <li><a href="#" className="hover:text-[#C8A96A] transition-colors duration-300">Destinations</a></li>
            <li><a href="#" className="hover:text-[#C8A96A] transition-colors duration-300">Our Story</a></li>
            <li><a href="#" className="hover:text-[#C8A96A] transition-colors duration-300">The Portal</a></li>
            <li><a href="#" className="hover:text-[#C8A96A] transition-colors duration-300">Membership</a></li>
          </ul>
        </div>

        <div className="footer-fade opacity-0 translate-y-8 transition-all duration-700 delay-500">
          <h4 className="text-white font-oswald uppercase text-xl mb-6">Connect</h4>
          <ul className="space-y-4 text-[#F4F4F5]/70 text-sm">
            <li><a href="#" className="hover:text-[#C8A96A] transition-colors duration-300">Instagram</a></li>
            <li><a href="#" className="hover:text-[#C8A96A] transition-colors duration-300">Twitter</a></li>
            <li><a href="#" className="hover:text-[#C8A96A] transition-colors duration-300">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#1F3E3D]/30 pt-8 flex flex-col md:flex-row justify-between items-center footer-fade opacity-0 translate-y-8 transition-all duration-700 delay-700">
        <p className="text-[#F4F4F5]/40 text-xs uppercase tracking-widest">© 2026 Portalra Escape. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-[#F4F4F5]/40 hover:text-[#C8A96A] text-xs uppercase tracking-widest transition-colors duration-300">Privacy</a>
          <a href="#" className="text-[#F4F4F5]/40 hover:text-[#C8A96A] text-xs uppercase tracking-widest transition-colors duration-300">Terms</a>
        </div>
      </div>
    </footer>
  );
}
