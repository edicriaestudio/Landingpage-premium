import { Route, Switch } from 'wouter';
import Landing from './Landing';
import ThankYou from './ThankYou';
import PremiumLanding from './premium/PremiumLanding';
import ThankYouB2C from './components/ThankYouB2C';

function App() {
  return (
    <>
      <div className="bg-noise"></div>
      <Switch>
        {/* Rota Landing Page Premium (Principal) */}
        <Route path="/">
          <PremiumLanding />
        </Route>

        {/* Rota B2C (Público Geral - Moradores) */}
        <Route path="/morador">
          <Landing 
            type="b2c"
            title={<><span className="text-white">Descubra uma Niterói</span><br/><span className="text-brandGold">Que Poucos Conhecem</span></>}
            subtitle="Baixe agora o Mapa Secreto com 5 picos absurdos (e gratuitos) para o seu final de semana."
            buttonText="Quero meu Roteiro Secreto"
            nextRoute="/obrigado-b2c"
          />
        </Route>

        <Route path="/obrigado-b2c" component={ThankYouB2C} />

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
      </Switch>
    </>
  );
}

export default App;
