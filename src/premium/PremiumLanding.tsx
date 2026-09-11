import { useEffect, useRef, useState } from 'react';
import { Star, TrendingUp, Users, MessageSquare, Quote } from 'lucide-react';
import Pricing from './components/Pricing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: 'Pizzaria Napolitana', location: 'Icaraí', text: 'Aumentamos o lucro em 35% logo no primeiro mês só porque paramos de pagar as taxas absurdas.', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=200' },
  { name: 'Burger Artesanal', location: 'Itaipu', text: 'O fluxo de novos clientes que chegam perguntando do Guia é absurdo. Recomendo demais!', img: 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=200' },
  { name: 'Studio Beauty', location: 'Centro', text: 'Nossa agenda de sábado está sempre lotada agora. O tráfego direto pro WhatsApp mudou o jogo.', img: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=200' },
  { name: 'Academia Fit', location: 'Icaraí', text: 'Conseguimos dobrar as matrículas mensais focando na exposição do Guia 360.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200' },
  { name: 'Boutique Elegance', location: 'São Francisco', text: 'As clientes acham a nossa loja no guia e já vêm com a foto da roupa que querem. Perfeito.', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200' },
  { name: 'Café da Praça', location: 'Santa Rosa', text: 'As avaliações no Guia chamaram tanta atenção que o movimento da manhã quase triplicou.', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=200' }
];

export default function PremiumLanding() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const frameCount = 480;

  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Define fixed canvas size
    canvas.width = 1920;
    canvas.height = 1080;

    const currentFrame = (index: number) => 
      `/frames/${(index + 1).toString().padStart(4, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const obj = { frame: 0 };
    let loaded = 0;

    // Pré-carregamento dos 480 frames
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loaded++;
        setImagesLoaded(Math.floor((loaded / frameCount) * 100));
        // Draw the first frame once loaded
        if (loaded === 1 && i === 0) {
          renderFrame(img);
        }
      };
      images.push(img);
    }

    const renderFrame = (img: HTMLImageElement) => {
      // Cover crop effect
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    // GSAP ScrollTrigger timeline matching the entire page wrapper height
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5 // 0.5s smooth scrubbing
      }
    });

    tl.to(obj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => {
        if (images[obj.frame]) {
          renderFrame(images[obj.frame]);
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} className="text-white min-h-screen font-dmsans selection:bg-brandGold/30 overflow-x-hidden relative bg-[#060b13]">
      
      {/* 1. BACKGROUND CANVAS (Fixo na tela, renderiza os frames) */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none bg-[#060b13]">
        <canvas ref={canvasRef} className="w-full h-full object-cover opacity-60" />
        
        {/* Loading overlay - some enquanto as imagens carregam */}
        {imagesLoaded < 100 && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#060b13] z-10 transition-opacity duration-500">
            <div className="text-brandGold font-montserrat text-xl uppercase tracking-widest flex flex-col items-center">
              <span>Carregando Experiência...</span>
              <span className="mt-2 text-4xl">{imagesLoaded}%</span>
            </div>
          </div>
        )}

        {/* Overlay escuro para dar contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b13]/40 via-transparent to-[#060b13]/50" />
      </div>

      {/* CONTEÚDO DA PÁGINA (Transparente para o fundo aparecer) */}
      <div className="relative z-10">
        
        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Guia 360" className="w-14 h-14 object-contain" />
            <span className="font-montserrat text-xl uppercase font-bold tracking-widest drop-shadow-md">
              <span className="text-brandGold">Guia 360</span> <span className="text-white">Niterói</span>
            </span>
          </div>
          <a href="#planos" className="bg-brandGold text-brandDark px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all pointer-events-auto shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            Ver Planos
          </a>
        </nav>

        {/* 2. HERO */}
        <section className="min-h-[120vh] flex items-center pt-24 pb-32 px-6 sm:px-12 lg:px-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandGold/20 border border-brandGold/50 text-brandGold text-xs font-bold tracking-widest shadow-sm uppercase mb-8 backdrop-blur-md">
              <Star size={14} /> O Maior Guia Comercial de Niterói
            </div>
            
            <h1 className="font-montserrat text-5xl md:text-7xl lg:text-[5.5rem] uppercase font-extrabold leading-[1.05] mb-8 drop-shadow-2xl">
              Liberte-se das Taxas. <br />
              <span className="text-brandGold">Domine a Cidade.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-medium mb-12 leading-relaxed drop-shadow-lg">
              A plataforma definitiva para lojistas de Niterói que querem <span className="text-brandGold font-bold">lotar o WhatsApp de clientes reais</span>, <span className="text-brandGold font-bold">sem deixar 27% de comissão</span> na mesa dos aplicativos.
            </p>
          </div>
        </section>

        {/* 3. BENEFÍCIOS */}
        <section className="py-32 px-6 sm:px-12 lg:px-24 min-h-[150vh] flex flex-col justify-center relative">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-16 max-w-2xl">
              <h2 className="font-montserrat text-4xl md:text-5xl uppercase font-bold text-white mb-4 drop-shadow-lg">
                Como vamos <span className="text-brandGold">acelerar sua loja</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-brandDark/10 backdrop-blur-lg border border-brandGold/20 p-8 rounded-[2rem] shadow-2xl">
                <div className="w-14 h-14 bg-brandGold/20 rounded-2xl flex items-center justify-center mb-6 border border-brandGold/30">
                  <MessageSquare className="text-brandGold" size={28} />
                </div>
                <h3 className="font-montserrat text-2xl uppercase font-bold text-brandGold mb-3 drop-shadow-md">WhatsApp Lotado</h3>
                <p className="text-white/90 font-medium leading-relaxed">Os clientes chamam você diretamente no WhatsApp, construindo sua base de contatos própria e permanente.</p>
              </div>

              <div className="bg-brandDark/10 backdrop-blur-lg border border-brandGold/20 p-8 rounded-[2rem] shadow-2xl transform md:translate-y-12">
                <div className="w-14 h-14 bg-brandGold/20 rounded-2xl flex items-center justify-center mb-6 border border-brandGold/30">
                  <Users className="text-brandGold" size={28} />
                </div>
                <h3 className="font-montserrat text-2xl uppercase font-bold text-brandGold mb-3 drop-shadow-md">Público Qualificado</h3>
                <p className="text-white/90 font-medium leading-relaxed">Tráfego pago inteligente focado exatamente nos bairros de Niterói, trazendo clientes com alto poder de compra.</p>
              </div>

              <div className="bg-brandDark/10 backdrop-blur-lg border border-brandGold/20 p-8 rounded-[2rem] shadow-2xl transform md:translate-y-24">
                <div className="w-14 h-14 bg-brandGold/20 rounded-2xl flex items-center justify-center mb-6 border border-brandGold/30">
                  <TrendingUp className="text-brandGold" size={28} />
                </div>
                <h3 className="font-montserrat text-2xl uppercase font-bold text-brandGold mb-3 drop-shadow-md">Lucro Máximo</h3>
                <p className="text-white/90 font-medium leading-relaxed">0% de taxas embutidas. O que você vende é 100% seu. Pague apenas a assinatura transparente da nossa plataforma.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PROVA SOCIAL (Transparente) */}
        <section className="py-40 min-h-screen flex flex-col justify-center relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10 px-6 mb-16 w-full">
            <div className="text-center">
              <h2 className="font-montserrat text-4xl md:text-5xl uppercase font-bold text-white mb-4 drop-shadow-lg">
                Quem está no Guia, <span className="text-brandGold">Vende.</span>
              </h2>
            </div>
          </div>

          <div className="relative w-full overflow-hidden pb-10">
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#060b13] to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#060b13] to-transparent z-20 pointer-events-none" />
            
            <div className="marquee-container">
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div key={idx} className="w-[400px] shrink-0 mx-4 bg-[#0B1528]/10 backdrop-blur-xl p-8 rounded-[2rem] border border-brandGold/30 relative shadow-xl hover:bg-[#0B1528]/20 transition-colors">
                  <Quote size={40} className="text-brandGold/20 absolute top-8 right-8" />
                  <div className="flex text-brandGold mb-6">
                    <Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} />
                  </div>
                  <p className="text-lg text-white/90 italic mb-8 font-medium h-[120px]">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-600 rounded-full bg-cover bg-center border-2 border-brandGold/50" style={{backgroundImage: `url(${t.img})`}} />
                    <div>
                      <h4 className="font-montserrat font-bold text-white uppercase tracking-wide drop-shadow-md">{t.name}</h4>
                      <p className="text-sm text-brandGold font-bold drop-shadow-sm">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PREÇOS */}
        <div id="planos" className="min-h-screen flex items-center py-20">
          <div className="w-full">
            <Pricing />
          </div>
        </div>

        {/* 6. FOOTER (Totalmente Transparente) */}
        <footer className="bg-transparent pt-16 pb-12 px-6 border-t border-brandGold/10 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <img src="/logo.png" alt="Guia 360" className="w-24 h-24 object-contain mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
            
            <h2 className="font-montserrat text-3xl uppercase font-bold tracking-widest mb-4">
              <span className="text-brandGold">Guia 360</span> <span className="text-white">Niterói</span>
            </h2>
            
            <p className="text-white/80 text-sm max-w-md mx-auto mb-10 font-medium">
              Transformando a forma como os comércios locais encontram clientes em Niterói.
            </p>

            <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 mt-4 text-xs text-white/60 uppercase tracking-widest font-semibold gap-4">
              <p>© 2026 Guia 360 Niterói. Todos os direitos reservados.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-brandGold transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-brandGold transition-colors">Política de Privacidade</a>
                <a href="#" className="hover:text-brandGold transition-colors">Aviso Legal</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
