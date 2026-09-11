import { Route, Switch } from 'wouter';
import Landing from './Landing';
import ThankYou from './ThankYou';
import PremiumLanding from './premium/PremiumLanding';

function App() {
  return (
    <Switch>
      {/* Rota B2C (Público Geral) */}
      <Route path="/">
        <Landing 
          type="b2c"
          title={<><span className="text-white">Descubra uma Niterói</span><br/><span className="text-brandGold">Que Poucos Conhecem</span></>}
          subtitle="Baixe agora o Mapa Secreto com 5 picos absurdos (e gratuitos) para o seu final de semana."
          buttonText="Quero meu Roteiro Secreto"
          nextRoute="/obrigado"
        />
      </Route>

      <Route path="/obrigado">
        <ThankYou type="b2c" />
      </Route>

      {/* Rota B2B (Lojistas) */}
      <Route path="/b2b">
        <Landing 
          type="b2b"
          title={<><span className="text-white">O Fim da Taxa de</span><br/><span className="text-brandGold">27% do iFood</span></>}
          subtitle="Descubra como as melhores hamburguerias de Niterói estão usando tráfego local para lotar o WhatsApp de pedidos diretos."
          buttonText="Quero Receber o Guia"
          nextRoute="/b2b/obrigado"
        />
      </Route>

      <Route path="/b2b/obrigado">
        <ThankYou type="b2b" />
      </Route>

      {/* Rota Landing Page Premium (Tráfego Direto) */}
      <Route path="/premium">
        <PremiumLanding />
      </Route>
    </Switch>
  );
}

export default App;
