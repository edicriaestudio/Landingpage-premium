import { CheckCircle2 } from 'lucide-react';

export default function Pricing() {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl uppercase font-extrabold text-white mb-4 drop-shadow-lg">
            Escolha sua <span className="text-brandGold">Jornada</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium drop-shadow-md">
            Planos desenhados para lojistas que querem transformar a visibilidade local em lucro real.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Plano Gratuito */}
          <div className="bg-white/0 backdrop-blur-sm border border-white/5 rounded-3xl p-8 flex flex-col hover:border-brandGold/30 hover:bg-white/5 transition-all duration-300 relative shadow-2xl">
            <h3 className="text-xl text-white font-montserrat uppercase font-bold mb-2">Presença</h3>
            <p className="text-white/60 mb-6 text-xs">O básico para sua loja existir digitalmente no nosso Guia.</p>
            
            <div className="mb-6 flex items-end gap-1">
              <span className="text-5xl text-white font-montserrat font-bold drop-shadow-md">Grátis</span>
            </div>

            <ul className="space-y-3 mb-8 flex-grow text-sm font-dmsans">
              <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="text-brandGold shrink-0" size={16} /> Cadastro no Aplicativo</li>
              <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="text-brandGold shrink-0" size={16} /> Perfil Básico (Sem fotos extras)</li>
              <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="text-brandGold shrink-0" size={16} /> Busca Simples</li>
            </ul>

            <a 
              href="https://www.guia360niteroi.com.br/cadastrar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-montserrat uppercase tracking-widest font-bold text-xs bg-white/5 text-white border border-white/20 hover:bg-white hover:text-brandDark transition-all duration-300 text-center block"
            >
              Criar Conta Grátis
            </a>
          </div>

          {/* Plano Performance (Central) */}
          <div className="bg-white/5 backdrop-blur-sm border border-brandGold/50 rounded-3xl p-8 flex flex-col hover:bg-white/10 transition-all duration-300 relative shadow-2xl transform md:-translate-y-4">
            <h3 className="text-xl text-brandGold font-montserrat uppercase font-bold mb-2">Performance</h3>
            <p className="text-white/60 mb-6 text-xs">O ponto de equilíbrio perfeito para lotar seu WhatsApp.</p>
            
            <div className="mb-6 flex items-end gap-1">
              <span className="text-sm text-brandGold font-bold mb-1">R$</span>
              <span className="text-5xl text-white font-montserrat font-bold drop-shadow-md">97</span>
              <span className="text-white/70 mb-1 text-xs">/mês</span>
            </div>

            <ul className="space-y-3 mb-8 flex-grow text-sm font-dmsans">
              <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="text-brandGold shrink-0" size={16} /> <span className="font-bold">Tudo do Grátis, mais:</span></li>
              <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="text-brandGold shrink-0" size={16} /> Botão Direto para o seu WhatsApp</li>
              <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="text-brandGold shrink-0" size={16} /> Galeria de Fotos Completa</li>
              <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="text-brandGold shrink-0" size={16} /> Sistema de Avaliações Verificadas</li>
            </ul>

            <a 
              href="https://mpago.la/1ka6TB8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-montserrat uppercase tracking-widest font-bold text-xs bg-brandGold text-brandDark hover:bg-white transition-all duration-300 text-center block"
            >
              Assinar Performance
            </a>
          </div>

          {/* Plano Enterprise */}
          <div className="bg-white/0 backdrop-blur-sm border border-white/5 rounded-3xl p-8 flex flex-col hover:border-brandGold/30 hover:bg-white/5 transition-all duration-300 relative shadow-2xl">
            <h3 className="text-xl text-white font-montserrat uppercase font-bold mb-2">Enterprise</h3>
            <p className="text-white/60 mb-6 text-xs">A máquina completa de atração e exposição VIP.</p>
            
            <div className="mb-6 flex items-end gap-1">
              <span className="text-sm text-brandGold font-bold mb-1">R$</span>
              <span className="text-5xl text-white font-montserrat font-bold drop-shadow-md">297</span>
              <span className="text-white/70 mb-1 text-xs">/mês</span>
            </div>

            <ul className="space-y-3 mb-8 flex-grow text-sm font-dmsans">
              <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="text-brandGold shrink-0" size={16} /> <span className="font-bold">Tudo do Performance, mais:</span></li>
              <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="text-brandGold shrink-0" size={16} /> Topo absoluto na sua Categoria</li>
              <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="text-brandGold shrink-0" size={16} /> Divulgação nas nossas Redes</li>
              <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="text-brandGold shrink-0" size={16} /> 1 Reels Premium /mês Exclusivo</li>
            </ul>

            <a 
              href="https://mpago.la/2dahgJD"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-montserrat uppercase tracking-widest font-bold text-xs bg-white/5 text-white border border-white/20 hover:bg-white hover:text-brandDark transition-all duration-300 text-center block"
            >
              Assinar Enterprise
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
