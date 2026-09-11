import { ArrowDownToLine, MapPin } from 'lucide-react';
import { Link } from 'wouter';

export default function ThankYouB2C() {
  return (
    <div className="min-h-screen bg-brandDark font-inter flex flex-col relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brandGold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brandGold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <header className="p-6 relative z-10 flex justify-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Guia 360 Niterói" className="w-12 h-12 object-contain" />
          <span className="font-montserrat text-xl font-bold uppercase tracking-widest text-white">
            <span className="text-brandGold">Guia 360</span> Niterói
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 text-center max-w-2xl mx-auto">
        
        <div className="w-20 h-20 bg-brandGold/20 rounded-full flex items-center justify-center mb-8 border border-brandGold/30">
          <MapPin className="text-brandGold" size={40} />
        </div>

        <h1 className="font-montserrat text-4xl md:text-5xl font-extrabold text-white uppercase mb-6 drop-shadow-md">
          Tudo Certo!
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 font-dmsans mb-12">
          Seu <strong className="text-brandGold">Roteiro Secreto de Niterói</strong> está pronto. Baixe o PDF abaixo e descubra as melhores experiências que a nossa cidade tem a oferecer hoje mesmo!
        </p>

        <a 
          href="https://gamma.app/docs/O-Roteiro-Secreto-de-Niteroi-rh2p5ia03vwrrz6" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full sm:w-auto bg-brandGold text-brandDark font-montserrat uppercase font-bold tracking-widest py-5 px-10 rounded-xl hover:bg-white transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)] mb-8"
        >
          <ArrowDownToLine size={24} />
          Baixar Meu Roteiro (PDF)
        </a>

        <Link href="/">
          <span className="text-white/60 hover:text-brandGold font-dmsans underline transition-colors cursor-pointer text-sm">
            Voltar para a página inicial
          </span>
        </Link>
      </main>
    </div>
  );
}
