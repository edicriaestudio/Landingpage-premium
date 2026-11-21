import { useEffect, useRef } from 'react';
import { Star, TrendingUp, Users, MessageSquare, Quote, Target } from 'lucide-react';
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

    const images: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    let lastRenderedFrame = 0;
    const obj = { frame: 0 };

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

    // 1. CARREGAMENTO IMEDIATO DO FRAME 1 (Renderização Instantânea sem tela de espera)
    const firstImg = new Image();
    firstImg.src = currentFrame(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      renderFrame(firstImg);
    };

    // 2. CARREGAMENTO PROGRESSIVO EM SEGUNDO PLANO (Sem travar o usuário)
    // Carrega em lotes graduais para não saturar a rede
    let currentIndex = 1;
    const loadBatch = () => {
      const batchLimit = Math.min(currentIndex + 10, frameCount);
      for (let i = currentIndex; i < batchLimit; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
          images[i] = img;
        };
      }
      currentIndex = batchLimit;
      if (currentIndex < frameCount) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadBatch, { timeout: 200 });
        } else {
          setTimeout(loadBatch, 80);
        }
      }
    };
    // Inicia o stream suave em background
    setTimeout(loadBatch, 100);

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
        const targetFrame = Math.round(obj.frame);
        // Se o frame exato já estiver carregado, desenha ele
        if (images[targetFrame]) {
          renderFrame(images[targetFrame]!);
          lastRenderedFrame = targetFrame;
        } else {
          // Carrega com prioridade imediata o frame atual caso o usuário tenha rolado antes do batch
          const priorityImg = new Image();
          priorityImg.src = currentFrame(targetFrame);
          priorityImg.onload = () => {
            images[targetFrame] = priorityImg;
            if (Math.round(obj.frame) === targetFrame) {
              renderFrame(priorityImg);
              lastRenderedFrame = targetFrame;
            }
          };
          if (images[lastRenderedFrame]) {
            renderFrame(images[lastRenderedFrame]!);
          }
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} className="text-white min-h-screen font-dmsans selection:bg-brandGold/30 overflow-x-hidden relative bg-[#060b13]">
      
      {/* 1. BACKGROUND CANVAS (Fixo na tela, renderiza os frames 100% nítidos e limpos) */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none bg-[#060b13]">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        
        {/* Overlay escuro equilibrado para dar leitura aos textos sem criar sombra na transição */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b13]/40 via-transparent to-[#060b13]/50 pointer-events-none" />
      </div>

      {/* CONTEÚDO DA PÁGINA (Transparente para o fundo do drone aparecer) */}
      <div className="relative z-10">
        
        {/* Navbar Superior Otimizada para Mobile e Desktop */}
        <nav className="absolute top-0 left-0 w-full p-4 sm:p-6 flex justify-between items-center pointer-events-none z-30">
          <div className="flex items-center gap-2.5 sm:gap-3 pointer-events-auto">
            <img src="/logo.png" alt="Guia 360" className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-[0_0_12px_rgba(208,255,20,0.4)]" />
            <span className="font-montserrat text-sm sm:text-xl uppercase font-bold tracking-widest drop-shadow-md">
              <span className="text-brandGold">Guia 360</span> <span className="text-white">Niterói</span>
            </span>
          </div>
          <a 
            href="#planos" 
            className="bg-brandGold text-brandDark px-4 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest hover:bg-white transition-all pointer-events-auto shadow-[0_0_15px_rgba(208,255,20,0.3)] active:scale-95 flex items-center min-h-[40px]"
          >
            Ver Planos
          </a>
        </nav>

        {/* 2. HERO — Tipografia Fluida e Perfeita em Qualquer Celular */}
        <section className="min-h-[110vh] flex items-center pt-24 pb-28 px-5 sm:px-12 lg:px-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandGold/20 border border-brandGold/50 text-brandGold text-[11px] sm:text-xs font-bold tracking-widest shadow-sm uppercase mb-6 backdrop-blur-md">
              <Star size={13} className="shrink-0" /> O Maior Guia Comercial de Niterói
            </div>
            
            <h1 className="font-montserrat text-[clamp(2.1rem,6.2vw,5.2rem)] uppercase font-extrabold leading-[1.08] mb-6 drop-shadow-2xl">
              Liberte-se das Taxas. <br />
              <span className="text-brandGold">Domine a Cidade.</span>
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-white/90 max-w-2xl font-medium mb-8 leading-relaxed drop-shadow-lg">
              A plataforma definitiva para empresas, comércios, clínicas e profissionais de Niterói que querem <span className="text-brandGold font-bold">lotar o WhatsApp de clientes reais</span>, <span className="text-brandGold font-bold">sem deixar 27% de comissão</span> na mesa dos aplicativos.
            </p>

            {/* CARD DE METAPROVA: SE VOCÊ VIU, O SEU CLIENTE TAMBÉM VÊ */}
            <div className="p-5 sm:p-7 rounded-3xl bg-[#0B1528]/85 backdrop-blur-xl border border-brandGold/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brandGold/15 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-brandGold/20 border border-brandGold/40 flex items-center justify-center shrink-0 text-brandGold shadow-sm mt-0.5">
                  <Target size={22} />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-brandGold font-bold block mb-1">
                    A Prova Viva • Você Está Aqui
                  </span>
                  <h2 className="font-montserrat text-lg sm:text-xl md:text-2xl font-bold uppercase text-white leading-snug">
                    Se este anúncio encontrou você agora... <span className="text-brandGold">o seu cliente também vai ver a sua empresa.</span>
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
                    Você não caiu nesta página por acaso. É exatamente a mesma tecnologia de tráfego ultra-segmentado em Niterói que nós usamos para atrair você que colocará o seu negócio na frente de milhares de moradores no momento exato em que eles decidem onde comprar ou contratar.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs da Hero: Conhecer Planos & WhatsApp no Verde Fluorescente */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a 
                href="#planos" 
                className="bg-brandGold text-brandDark px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(208,255,20,0.4)] active:scale-95 text-center flex items-center justify-center min-h-[48px]"
              >
                Conhecer os Planos
              </a>
              <a
                href="https://wa.me/5521987147165?text=Ol%C3%A1!%20Vi%20o%20Guia%20360%20Niter%C3%B3i%20e%20gostaria%20de%20saber%20como%20anunciar%20minha%20empresa."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-brandGold hover:bg-white text-brandDark px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-[0_4px_20px_rgba(208,255,20,0.4)] active:scale-95 text-center min-h-[48px]"
              >
                <MessageSquare size={16} className="shrink-0" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* 3. BENEFÍCIOS */}
        <section className="py-32 px-6 sm:px-12 lg:px-24 min-h-[150vh] flex flex-col justify-center relative">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-16 max-w-2xl">
              <h2 className="font-montserrat text-4xl md:text-5xl uppercase font-bold text-white mb-4 drop-shadow-lg">
                Como vamos <span className="text-brandGold">acelerar o seu negócio</span>
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
            <img src="/logo.png" alt="Guia 360" className="w-24 h-24 object-contain mb-6 drop-shadow-[0_0_15px_rgba(208,255,20,0.4)]" />
            
            <h2 className="font-montserrat text-3xl uppercase font-bold tracking-widest mb-4">
              <span className="text-brandGold">Guia 360</span> <span className="text-white">Niterói</span>
            </h2>
            
            <p className="text-white/80 text-sm max-w-md mx-auto mb-10 font-medium">
              Transformando a forma como os negócios locais encontram clientes em Niterói.
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

        {/* 7. NAVEGAÇÃO DE POLEGAR FLUTUANTE (MOBILE-FIRST) */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm flex items-center justify-between gap-2.5 p-2 bg-[#0B1528]/90 backdrop-blur-xl border border-brandGold/40 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.7)] sm:hidden">
          <a
            href="#planos"
            className="flex-1 flex items-center justify-center gap-2 bg-brandGold text-brandDark px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md active:scale-95 min-h-[44px]"
          >
            Ver Planos & Preços
          </a>
          <a
            href="https://wa.me/5521987147165?text=Ol%C3%A1!%20Vi%20a%20p%C3%A1gina%20de%20an%C3%BAncios%20do%20Guia%20360%20Niter%C3%B3i%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20os%20planos."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="size-11 rounded-full bg-brandGold hover:bg-white text-brandDark flex items-center justify-center transition-all shrink-0 active:scale-95 shadow-lg shadow-emerald-950/40 min-h-[44px] min-w-[44px]"
          >
            <MessageSquare size={20} />
          </a>
        </div>

      </div>
    </div>
  );
}
