import { CheckCircle2, ArrowRight, Smartphone, Globe } from 'lucide-react';

interface ThankYouProps {
  type: 'b2c' | 'b2b';
}

export default function ThankYou({ type }: ThankYouProps) {
  const isB2B = type === 'b2b';

  return (
    <div className="relative min-h-screen bg-brandDark text-white overflow-hidden flex flex-col p-6 selection:bg-brandGold/30 font-inter">
      
      {/* Header Minimalista */}
      <header className="absolute top-0 left-0 w-full z-50 p-6 flex justify-center items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Guia 360" className="w-14 h-14 object-contain drop-shadow-md" />
          <span className="font-oswald text-xl uppercase font-bold tracking-widest drop-shadow-md">
            <span className="text-brandGold">Guia 360</span> <span className="text-white">Niterói</span>
          </span>
        </div>
      </header>

      <div className="absolute inset-0 bg-brandDark" />

      <div className="relative z-10 w-full max-w-2xl bg-white/5 rounded-[2rem] p-8 md:p-16 text-center shadow-2xl mx-auto my-auto mt-24">
        <div className="w-24 h-24 bg-brandGold/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <CheckCircle2 size={48} className="text-brandGold" />
        </div>

        <h1 className="font-oswald text-5xl md:text-6xl uppercase text-white mb-6 font-bold">
          Tudo <span className="text-brandGold">Certo!</span>
        </h1>

        <p className="text-xl text-white/90 mb-12 font-medium">
          {isB2B 
            ? "O Guia 'Fim da Taxa de 27%' foi enviado para o seu e-mail e WhatsApp." 
            : "O 'Roteiro Secreto de Niterói' acabou de chegar no seu WhatsApp."}
        </p>

        <div className="p-8 rounded-2xl bg-black/40 mb-12 shadow-inner">
          <h3 className="font-oswald text-3xl text-brandGold uppercase mb-4 font-bold tracking-wide">
            {isB2B ? "Atenção Lojista" : "Enquanto você espera..."}
          </h3>
          <p className="text-base text-white/90 font-medium leading-relaxed">
            {isB2B 
              ? "Quer parar de pagar comissão e plugar sua loja direto no Guia 360 hoje mesmo? Fale comigo agora no WhatsApp para uma consultoria gratuita." 
              : "Já aproveite para acessar a plataforma oficial do Guia 360 Niterói e começar a explorar os melhores picos da cidade agora mesmo."}
          </p>
        </div>

        <a 
          href={isB2B ? "https://wa.me/5521999999999?text=Quero%20colocar%20minha%20loja%20no%20Guia%20360" : "https://guia360niteroi.com.br"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full gap-3 font-oswald uppercase text-xl px-8 py-5 rounded-xl text-brandDark bg-brandGold hover:bg-white transition-all duration-300 shadow-[0_5px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_5px_30px_rgba(255,255,255,0.5)] font-bold tracking-wide"
        >
          {isB2B ? <Smartphone size={28} /> : <Globe size={28} />}
          {isB2B ? "Falar no WhatsApp" : "Acessar o Guia 360"}
          <ArrowRight size={24} />
        </a>
      </div>
    </div>
  );
}
