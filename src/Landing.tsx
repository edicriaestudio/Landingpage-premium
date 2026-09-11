import { useState } from 'react';
import { useLocation } from 'wouter';
import { MapPin, ArrowRight, Star, Lock, CheckCircle2, Globe } from 'lucide-react';

interface LandingProps {
  type: 'b2c' | 'b2b';
  title: React.ReactNode;
  subtitle: string;
  buttonText: string;
  nextRoute: string;
}

export default function Landing({ type, title, subtitle, buttonText, nextRoute }: LandingProps) {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Envio dos dados via Web3Forms (Substitua a chave de acesso depois)
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "4eebdc29-60d5-4416-9016-94aeae31fc47", 
          subject: `NOVO LEAD - Guia 360 (${type.toUpperCase()})`,
          name,
          whatsapp: phone,
          email: email || "N/A",
        })
      });
    } catch (err) {
      console.log("Erro ao enviar form:", err);
    }

    // Redirecionamento de Sucesso
    if (type === 'b2b') {
      // B2B vai para o WhatsApp pedir o material
      const msg = encodeURIComponent("Olá! Vim pelo site e quero receber meu Checklist de Lucro.");
      window.location.href = `https://wa.me/5521999999999?text=${msg}`;
    } else {
      // B2C vai para a página de obrigado para baixar o PDF direto
      setLocation(nextRoute);
    }
  };

  const isB2B = type === 'b2b';

  const bgImage = isB2B 
    ? "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070" 
    : "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070"; 

  const b2cCards = [
    { title: 'Lugares Secretos', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800' },
    { title: 'Vistas de Cinema', img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800' },
    { title: 'Gastronomia', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800' },
    { title: 'Pôr do Sol', img: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=800' },
    { title: 'Praias Escondidas', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800' },
  ];

  const b2bCards = [
    { name: 'Beira Mar (Icaraí)', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800' },
    { name: 'Buzin Gastronomia', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800' },
    { name: 'Gruta de Santo Antônio', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800' },
    { name: 'Tio Cotó', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800' },
    { name: 'Mercado São Pedro', img: 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=800' },
    { name: 'Polo Gastronômico', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800' },
  ];

  return (
    <div className="relative min-h-screen bg-brandDark text-white overflow-x-hidden selection:bg-brandGold/30 font-inter">
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Guia 360" className="w-16 h-16 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
          <span className="font-oswald text-2xl uppercase font-bold tracking-widest drop-shadow-md">
            <span className="text-brandGold">Guia 360</span> <span className="text-white">Niterói</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-brandGold text-sm font-bold tracking-wide">
          <svg xmlns="http://www.w3.0.svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> 
          @guia360.niteroi
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[110vh] flex items-center justify-center pt-24 pb-32 px-6 overflow-hidden bg-brandDark">
        
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-brandDark/50 z-10" />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-brandDark via-brandDark/80 to-transparent z-20 pointer-events-none" />
          <img 
            src={bgImage}
            alt="Background" 
            className="w-full h-full object-cover animate-slow-zoom"
          />
        </div>

        <div className="relative z-30 w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center mt-8">
          
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandGold/10 border border-brandGold/40 text-brandGold text-sm font-bold tracking-widest shadow-[0_0_10px_rgba(212,175,55,0.2)] uppercase">
              <Star size={16} />
              <span>{isB2B ? "Exclusivo para Lojistas" : "Guia Gratuito"}</span>
            </div>
            
            <h1 className="font-oswald text-5xl sm:text-6xl lg:text-7xl uppercase leading-tight font-extrabold drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
              {title}
            </h1>
            
            <p className="text-xl text-white max-w-lg mx-auto lg:mx-0 font-medium drop-shadow-md">
              {subtitle}
            </p>

            <div className="hidden lg:flex items-center gap-4 text-sm text-brandGold font-bold drop-shadow-md">
              <div className="flex items-center gap-1"><Lock size={16} /> 100% Gratuito</div>
              <div className="w-1 h-1 rounded-full bg-brandGold/50" />
              <div className="flex items-center gap-1"><MapPin size={16} /> Niterói, RJ</div>
            </div>
          </div>

          <div className="bg-brandDark/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl relative overflow-hidden mx-auto w-full max-w-md lg:max-w-full border border-brandGold/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brandGold to-transparent" />
            
            <h3 className="font-oswald text-2xl uppercase mb-6 text-white text-center font-bold tracking-wide">
              {isB2B ? <>Baixe o Guia <span className="text-brandGold">B2B</span></> : <>Destrave o Seu <span className="text-brandGold">Roteiro</span></>}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-brandGold mb-2 font-bold">Seu Nome</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-brandDark border border-brandGold/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brandGold transition-all shadow-sm"
                  placeholder="Seu nome"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-brandGold mb-2 font-bold">Seu WhatsApp</label>
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-brandDark border border-brandGold/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brandGold transition-all shadow-sm"
                  placeholder="(21) 99999-9999"
                />
              </div>

              {isB2B && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brandGold mb-2 font-bold">Seu Melhor E-mail</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-brandDark border border-brandGold/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brandGold transition-all shadow-sm"
                    placeholder="contato@suaempresa.com"
                  />
                </div>
              )}

              <button 
                type="submit"
                className="w-full group bg-brandGold text-brandDark font-oswald uppercase text-lg font-bold tracking-wide py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-brandGold/80 hover:text-white shadow-[0_5px_20px_rgba(212,175,55,0.3)] transition-all duration-300 mt-4"
              >
                {buttonText}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            
            <p className="text-center text-xs text-brandGold/50 mt-6 flex justify-center items-center gap-1 font-semibold">
              <Lock size={12} /> Dados criptografados e protegidos.
            </p>
          </div>

        </div>
      </section>

      {/* Seção 2: Marquee Infinito */}
      <section className="-mt-24 pt-32 pb-24 relative z-20 bg-brandDark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="font-oswald text-4xl md:text-5xl uppercase text-center font-extrabold">
            {isB2B 
              ? <><span className="text-white">Quem já está no </span><span className="text-brandGold">Guia 360</span></> 
              : <><span className="text-white">O que você vai </span><span className="text-brandGold">descobrir</span></>}
          </h2>
          <p className="text-center text-brandGold/80 mt-4 font-semibold text-lg max-w-2xl mx-auto">
            {isB2B 
              ? "Junte-se às empresas que já estão captando clientes sem pagar taxas de comissão." 
              : "Locais selecionados a dedo pela nossa equipe para você aproveitar o melhor da cidade."}
          </p>
        </div>
        
        {/* Carrossel Infinito */}
        <div className="flex w-full overflow-hidden mt-8">
          <div className="marquee-container py-4">
            
            {/* GRUPO 1 */}
            {!isB2B && b2cCards.map((card, i) => (
              <div key={`g1-${i}`} className="mx-4 w-72 md:w-80 h-96 rounded-3xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.5)] flex-shrink-0 relative group hover:shadow-[0_5px_25px_rgba(212,175,55,0.3)] transition-all duration-300">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${card.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-brandDark/40 to-transparent group-hover:from-brandGold/40 transition-colors duration-500" />
                <h3 className="absolute bottom-8 left-8 font-oswald text-2xl uppercase text-brandGold font-bold group-hover:text-white transition-colors drop-shadow-md">{card.title}</h3>
              </div>
            ))}
            {isB2B && b2bCards.map((item, i) => (
              <div key={`g1-${i}`} className="mx-4 w-72 md:w-80 h-80 bg-brandDark/80 rounded-3xl shadow-[0_5px_20px_rgba(0,0,0,0.5)] overflow-hidden flex-shrink-0 flex flex-col hover:shadow-[0_5px_25px_rgba(212,175,55,0.3)] transition-all duration-300 border border-transparent hover:border-brandGold/30">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }} />
                <div className="p-6 bg-brandDark">
                  <h4 className="font-oswald text-xl uppercase font-bold text-brandGold">{item.name}</h4>
                  <p className="text-white/80 text-sm mt-2 flex items-center gap-1 font-semibold">
                    <CheckCircle2 size={16} className="text-brandGold" /> Verificada no Guia
                  </p>
                </div>
              </div>
            ))}

            {/* GRUPO 2 DUPLICADO */}
            {!isB2B && b2cCards.map((card, i) => (
              <div key={`g2-${i}`} className="mx-4 w-72 md:w-80 h-96 rounded-3xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.5)] flex-shrink-0 relative group hover:shadow-[0_5px_25px_rgba(212,175,55,0.3)] transition-all duration-300">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${card.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-brandDark/40 to-transparent group-hover:from-brandGold/40 transition-colors duration-500" />
                <h3 className="absolute bottom-8 left-8 font-oswald text-2xl uppercase text-brandGold font-bold group-hover:text-white transition-colors drop-shadow-md">{card.title}</h3>
              </div>
            ))}
            {isB2B && b2bCards.map((item, i) => (
              <div key={`g2-${i}`} className="mx-4 w-72 md:w-80 h-80 bg-brandDark/80 rounded-3xl shadow-[0_5px_20px_rgba(0,0,0,0.5)] overflow-hidden flex-shrink-0 flex flex-col hover:shadow-[0_5px_25px_rgba(212,175,55,0.3)] transition-all duration-300 border border-transparent hover:border-brandGold/30">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }} />
                <div className="p-6 bg-brandDark">
                  <h4 className="font-oswald text-xl uppercase font-bold text-brandGold">{item.name}</h4>
                  <p className="text-white/80 text-sm mt-2 flex items-center gap-1 font-semibold">
                    <CheckCircle2 size={16} className="text-brandGold" /> Verificada no Guia
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Footer Profissional */}
      <footer className="relative z-30 bg-brandDark pt-8 pb-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          
          <img src="/logo.png" alt="Guia 360" className="w-24 h-24 object-contain mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          
          <h2 className="font-oswald text-3xl uppercase font-bold tracking-widest mb-4">
            <span className="text-brandGold">Guia 360</span> <span className="text-white">Niterói</span>
          </h2>
          
          <p className="text-white/80 text-sm max-w-md mx-auto mb-8 font-medium">
            {isB2B 
              ? "Transformando a forma como os comércios locais encontram clientes em Niterói."
              : "O roteiro definitivo para você descobrir os melhores lugares, sem perder tempo."}
          </p>
          
          {/* Botão sólido, sem o texto desaparecer no hover */}
          <a 
            href="https://guia360niteroi.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-10 py-5 rounded-xl bg-brandGold/10 border border-brandGold/30 text-brandGold hover:bg-brandGold/20 hover:text-white transition-all duration-300 font-bold mb-12 uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <Globe size={20} />
            Acessar guia360niteroi.com.br
          </a>

          <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 mt-4 text-xs text-brandGold uppercase tracking-widest font-semibold gap-4">
            <p>© 2026 Guia 360 Niterói. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
