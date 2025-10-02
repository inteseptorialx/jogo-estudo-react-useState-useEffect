import { useState, useEffect } from "react";
import "./App.css";

// ==================================================================
// COMPONENTE DA LOJA (AGORA MAIS INTELIGENTE)
// ==================================================================
// Recebe novas props: os custos e as funções de compra
function Loja({
  onClose,
  dinheiro,
  onComprarVida,
  custoVida,
  onComprarDinheiroPorClique,
  custoDinheiroPorClique,
  onComprarArmadura,
  custoArmadura,
  onComprarFazenda,
  custoFazenda,
  quantidadeFazendas,
  armaduraDoJogador,
  vidaMaxima,
  pocoesDeVida,
  onComprarPocao,
  onComprarEspada,
  custoEspada,
  nivelEspada,
}) {
  const proximoBonusEspada = (nivelEspada + 1) * 5;
  return (
    <div className="modal-overlay">
      <div className="loja-container">
        <h2>Lojinha Mágica 🛖</h2>
        <p>Seu Ouro: 💰 {dinheiro}</p>
        <div className="loja-itens">
          {/* O onClick agora chama a função que recebemos via props */}
          <div className="loja-item" onClick={onComprarVida}>
            <p>
              <strong>+20 Vida Máxima</strong>
              <p className="loja-item-detalhe">(Atual: {vidaMaxima})</p>
            </p>
            <p>Custo: {custoVida} 💰</p>
          </div>

          <div className="loja-item" onClick={onComprarDinheiroPorClique}>
            <p>
              <strong>+1 Dinheiro/Clique</strong>
            </p>
            <p>Custo: {custoDinheiroPorClique} 💰</p>
          </div>
          <div className="loja-item" onClick={onComprarArmadura}>
            <p>
              <strong>+1 Armadura 🛡️</strong>
            </p>
            <p className="loja-item-detalhe">(Você tem: {armaduraDoJogador})</p>
            <p>Custo: {custoArmadura} 💰</p>
          </div>
          <div className="loja-item" onClick={onComprarPocao}>
            <p>
              <strong>Poção de Vida</strong>
            </p>
            <p className="loja-item-detalhe">(Cura 25 ❤️)</p>
            <p className="loja-item-detalhe">(Você tem: {pocoesDeVida})</p>
            <p>Custo: 15 💰</p>
          </div>

          <div className="loja-item" onClick={onComprarFazenda}>
            <p>
              <strong>Fazenda de Dinheiro</strong>
            </p>
            <p>+1 💰 a cada 10s</p>
            <p className="loja-item-detalhe">
              (Você tem: {quantidadeFazendas})
            </p>
            <p>Custo: {custoFazenda} 💰</p>
          </div>

          <div className="loja-item" onClick={onComprarEspada}>
            <p>
              <strong>Forjar Espada ⚔️</strong>
            </p>
            {/* Mostra o bônus que o jogador VAI receber */}
            <p className="loja-item-detalhe">
              (Próximo Bônus: +{proximoBonusEspada} 🔥)
            </p>
            <p className="loja-item-detalhe">(Nível Atual: {nivelEspada})</p>
            <p>Custo: {custoEspada} 💰</p>
          </div>

          {/* Outros itens desabilitados por enquanto */}
        </div>
        <button onClick={onClose}>Fechar Loja</button>
      </div>
    </div>
  );
}

// NOVO COMPONENTE: TELA DE INTRODUÇÃO
function TelaDeIntroducao({ onIniciar }) {
  return (
    <div className="modal-overlay">
      <div className="loja-container">
        <h1>A Torre dos 100 Andares</h1>
        <p>
          Um dragão terrível raptou a princesa e a aprisionou no topo da torre.
        </p>
        <p>
          Sua missão, nobre herói, é subir cada andar, derrotar o mal e
          resgatá-la!
        </p>
        <button onClick={onIniciar}>Iniciar Aventura!</button>
      </div>
    </div>
  );
}

// NOVO COMPONENTE: TELA DE GAME OVER
function TelaDeGameOver({ onResetar }) {
  return (
    <div className="modal-overlay">
      <div className="loja-container">
        <h1>Fim de Jogo ☠️</h1>
        <p>A sorte não estava do seu lado, e a torre venceu desta vez.</p>
        <p>A princesa ainda aguarda um herói...</p>
        <button onClick={onResetar}>Tentar Novamente</button>
      </div>
    </div>
  );
}

// NOVO COMPONENTE: TELA DE VITÓRIA!
function TelaDeVitoria({ onResetar }) {
  return (
    <div className="modal-overlay">
      <div className="loja-container">
        <h1>Vitória! 🎉</h1>
        <p>
          Você subiu os 100 andares, derrotou o terrível Dragão e salvou a
          princesa!
        </p>
        <p>Seu nome será cantado por bardos por gerações!</p>
        <button onClick={onResetar}>Jogar Novamente</button>
      </div>
    </div>
  );
}

// ==================================================================
// COMPONENTE PRINCIPAL: APP
// ==================================================================
function App() {
  // ESTADOS DO JOGO (Valores Iniciais)

  const estadoInicial = {
    vida: 100,
    vidaMaxima: 100,
    dinheiro: 0,
    mana: 3,
    manaMaxima: 3,
    ataqueDoJogador: 1,
    armaduraDoJogador: 0,
    andar: 1,
    vidaMaximaDoMonstro: 50,
    vidaDoMonstro: 50,
    recompensaDoMonstro: 10,
    isBonusAtaqueAtivo: false,
    dinheiroPorClique: 1,
    pocoesDeVida: 0,
    custoArmadura: 75,
    custoVida: 50,
    custoDinheiroPorClique: 25,
    custoFazenda: 200,
    quantidadeFazendas: 0,
    nivelEspada: 0,
    custoEspada: 40,
    monstrosDerrotados: 0,
  };

  const [gameState, setGameState] = useState("introducao");
  const [isLojaAberta, setIsLojaAberta] = useState(false);

  // Declaração de todos os estados
  const [vida, setVida] = useState(estadoInicial.vida);
  const [vidaMaxima, setVidaMaxima] = useState(estadoInicial.vidaMaxima);
  const [dinheiro, setDinheiro] = useState(estadoInicial.dinheiro);
  const [mana, setMana] = useState(estadoInicial.mana);
  const [manaMaxima, setManaMaxima] = useState(estadoInicial.manaMaxima);
  const [ataqueDoJogador, setAtaqueDoJogador] = useState(
    estadoInicial.ataqueDoJogador
  );
  const [dinheiroPorClique, setDinheiroPorClique] = useState(
    estadoInicial.dinheiroPorClique
  );
  const [isForcaAtiva, setIsForcaAtiva] = useState(false);
  const [isTempoAtivo, setIsTempoAtivo] = useState(false);
  const [isBonusAtaqueAtivo, setIsBonusAtaqueAtivo] = useState(
    estadoInicial.isBonusAtaqueAtivo
  );
  const [andar, setAndar] = useState(estadoInicial.andar);
  const [vidaMaximaDoMonstro, setVidaMaximaDoMonstro] = useState(
    estadoInicial.vidaMaximaDoMonstro
  );
  const [vidaDoMonstro, setVidaDoMonstro] = useState(
    estadoInicial.vidaDoMonstro
  );
  const [recompensaDoMonstro, setRecompensaDoMonstro] = useState(
    estadoInicial.recompensaDoMonstro
  );
  const [armaduraDoJogador, setArmaduraDoJogador] = useState(
    estadoInicial.armaduraDoJogador
  );
  const [custoArmadura, setCustoArmadura] = useState(
    estadoInicial.custoArmadura
  );
  const [custoVida, setCustoVida] = useState(estadoInicial.custoVida);
  const [custoDinheiroPorClique, setCustoDinheiroPorClique] = useState(
    estadoInicial.custoDinheiroPorClique
  );
  const [custoFazenda, setCustoFazenda] = useState(estadoInicial.custoFazenda);
  const [quantidadeFazendas, setQuantidadeFazendas] = useState(
    estadoInicial.quantidadeFazendas
  );
  const [log, setLog] = useState(["O mundo aguarda seu comando..."]);
  const [pocoesDeVida, setPocoesDeVida] = useState(estadoInicial.pocoesDeVida);
  const [nivelEspada, setNivelEspada] = useState(estadoInicial.nivelEspada);
  const [custoEspada, setCustoEspada] = useState(estadoInicial.custoEspada);
  const [monstrosDerrotados, setMonstrosDerrotados] = useState(
    estadoInicial.monstrosDerrotados
  );
  const [cooldownForca, setCooldownForca] = useState(false);
  const [cooldownTempo, setCooldownTempo] = useState(false);

  // VIGIA DA MORTE DO MONSTRO ATUALIZADO COM LÓGICA DE CHEFÃO
  // --- UseEffects ---
  useEffect(() => {
    if (vidaDoMonstro <= 0 && vidaDoMonstro !== null) {
      if (andar === 100) {
        setGameState("vitoria");
        return;
      }
      setMonstrosDerrotados((m) => m + 1);
      adicionarLog(
        `Você derrotou o monstro do Andar ${andar} e ganhou ${Math.floor(
          recompensaDoMonstro
        )} de ouro!`
      );
      setDinheiro((d) => d + Math.floor(recompensaDoMonstro));
      const proximoAndar = andar + 1;
      setAndar(proximoAndar);
      let proximaVida, proximaRecompensa;
      if (proximoAndar === 100) {
        adicionarLog("Um rugido terrível ecoa... O DRAGÃO LHE AGUARDA!");
        proximaVida = 5000;
        proximaRecompensa = 0;
      } else if (proximoAndar % 10 === 0) {
        adicionarLog(`UM CHEFE APARECE NO ANDAR ${proximoAndar}!`);
        proximaVida = Math.floor(vidaMaximaDoMonstro * 2);
        proximaRecompensa = recompensaDoMonstro * 2;
      } else {
        proximaVida = Math.floor(vidaMaximaDoMonstro * 1.3);
        proximaRecompensa = recompensaDoMonstro * 1.15;
      }
      setVidaMaximaDoMonstro(proximaVida);
      setVidaDoMonstro(proximaVida);
      setRecompensaDoMonstro(proximaRecompensa);
    }
  }, [vidaDoMonstro]);

  useEffect(() => {
    if (monstrosDerrotados > 0 && monstrosDerrotados % 10 === 0) {
      adicionarLog(`Poder arcano cresce! Mana Máxima +1!`);
      setManaMaxima((mm) => mm + 1);
      setMana((m) => m + 1);
    }
  }, [monstrosDerrotados]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setMana((manaAtual) =>
        manaAtual < manaMaxima ? manaAtual + 1 : manaAtual
      );
    }, 45000);
    return () => clearInterval(intervalo);
  }, [manaMaxima]);

  useEffect(() => {
    if (quantidadeFazendas > 0) {
      const intervalo = setInterval(() => {
        setDinheiro((dinheiroAtual) => dinheiroAtual + quantidadeFazendas);
      }, 10000);
      return () => clearInterval(intervalo);
    }
  }, [quantidadeFazendas]);

  useEffect(() => {
    if (dinheiro >= 100 && !isBonusAtaqueAtivo) {
      setAtaqueDoJogador((ataqueAnterior) => ataqueAnterior + 2);
      setIsBonusAtaqueAtivo(true);
    }
  }, [dinheiro, isBonusAtaqueAtivo]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setMana((manaAtual) => (manaAtual < 3 ? manaAtual + 1 : manaAtual));
    }, 30000);
    return () => clearInterval(intervalo);
  }, []);

  function ativarMagiaDeForca() {
    // Só ativa se tiver mana e se a magia não estiver ativa ou em cooldown
    if (mana > 0 && !isForcaAtiva && !cooldownForca) {
      setMana((m) => m - 1);

      // Ativa o Buff
      setIsForcaAtiva(true);
      setTimeout(() => setIsForcaAtiva(false), 10000); // Duração de 10s

      // Ativa o Cooldown
      setCooldownForca(true);
      setTimeout(() => setCooldownForca(false), 30000); // Cooldown de 30s

      adicionarLog("Você sente a fúria crescer! Força dobrada por 10s.");
    }
  }

  function ativarMagiaDeTempo() {
    if (mana > 0 && !isTempoAtivo && !cooldownTempo) {
      setMana((m) => m - 1);

      // Ativa o Buff
      setIsTempoAtivo(true);
      setDinheiroPorClique((dpc) => dpc * 2);
      setTimeout(() => {
        setIsTempoAtivo(false);
        setDinheiroPorClique((dpc) => dpc / 2); // Retorna ao normal
      }, 10000);

      // Ativa o Cooldown
      setCooldownTempo(true);
      setTimeout(() => setCooldownTempo(false), 30000);

      adicionarLog("O tempo se curva à sua vontade! Moedas em dobro por 10s.");
    }
  }

  function comprarPocaoDeVida() {
    const custoPocao = 15;
    if (dinheiro >= custoPocao) {
      setDinheiro((d) => d - custoPocao);
      setPocoesDeVida((p) => p + 1);
      adicionarLog("Você comprou uma Poção de Vida.");
    } else {
      adicionarLog("Voz da Loja: Dinheiro insuficiente para a poção!");
    }
  }

  function usarPocaoDeVida() {
    if (pocoesDeVida > 0) {
      if (vida === vidaMaxima) {
        adicionarLog("Sua vida já está cheia!");
        return;
      }
      setPocoesDeVida((p) => p - 1);
      setVida((v) => Math.min(vidaMaxima, v + 25)); // Cura 25, sem passar do máximo
      adicionarLog("Você usou uma poção e recuperou 25 de vida!");
    }
  }

  function resetarJogo() {
    setGameState("jogando");
    setVida(estadoInicial.vida);
    setVidaMaxima(estadoInicial.vidaMaxima);
    setDinheiro(estadoInicial.dinheiro);
    setMana(estadoInicial.mana);
    setManaMaxima(estadoInicial.manaMaxima);
    setAtaqueDoJogador(estadoInicial.ataqueDoJogador);
    setArmaduraDoJogador(estadoInicial.armaduraDoJogador);
    setAndar(estadoInicial.andar);
    setVidaMaximaDoMonstro(estadoInicial.vidaMaximaDoMonstro);
    setVidaDoMonstro(estadoInicial.vidaDoMonstro);
    setRecompensaDoMonstro(estadoInicial.recompensaDoMonstro);
    setCustoArmadura(estadoInicial.custoArmadura);
    setCustoVida(estadoInicial.custoVida);
    setCustoDinheiroPorClique(estadoInicial.custoDinheiroPorClique);
    setCustoFazenda(estadoInicial.custoFazenda);
    setQuantidadeFazendas(estadoInicial.quantidadeFazendas);
    setPocoesDeVida(estadoInicial.pocoesDeVida);
    setNivelEspada(estadoInicial.nivelEspada);
    setCustoEspada(estadoInicial.custoEspada);
    setMonstrosDerrotados(estadoInicial.monstrosDerrotados);
    setLog(["O mundo aguarda um novo herói..."]);
  }

  function comprarEspada() {
    if (dinheiro >= custoEspada) {
      setDinheiro((d) => d - custoEspada);

      // A fórmula mágica em ação!
      const bonusDeAtaque = (nivelEspada + 1) * 5;
      setAtaqueDoJogador((ataqueAtual) => ataqueAtual + bonusDeAtaque);

      // Aumenta o nível e o custo para a próxima
      setNivelEspada((n) => n + 1);
      setCustoEspada((c) => c * 3);

      adicionarLog(
        `Sua espada foi forjada! Você ganhou +${bonusDeAtaque} de ataque!`
      );
    } else {
      adicionarLog("Voz da Loja: Dinheiro insuficiente para forjar a espada!");
    }
  }

  function adicionarLog(novaMensagem) {
    setLog((logs) => [novaMensagem, ...logs.slice(0, 4)]);
  }

  function comprarFazenda() {
    if (dinheiro >= custoFazenda) {
      setDinheiro((d) => d - custoFazenda);
      setQuantidadeFazendas((f) => f + 1);
      setCustoFazenda((c) => Math.floor(c * 1.25));
    } else {
      alert("Dinheiro insuficiente!");
    }
  }

  function comprarArmadura() {
    if (dinheiro >= custoArmadura) {
      setDinheiro((d) => d - custoArmadura);
      setArmaduraDoJogador((a) => a + 1); // Aumenta a armadura
      setCustoArmadura((c) => Math.floor(c * 1.75)); // Aumenta bastante o preço
    } else {
      alert("Dinheiro insuficiente!");
    }
  }

  function comprarVidaMaxima() {
    // 1. O gerente verifica se o jogador tem dinheiro
    if (dinheiro >= custoVida) {
      // 2. Se tiver, ele faz a transação
      setDinheiro((d) => d - custoVida); // Tira o dinheiro
      setVidaMaxima((vm) => vm + 20); // Aumenta a vida máxima
      setVida((v) => v + 20); // Cura o jogador em 20 também!

      // 3. REGRA DE NEGÓCIO: Aumenta o preço para a próxima compra!
      setCustoVida((custoAtual) => Math.floor(custoAtual * 1.25));
    } else {
      alert("Dinheiro insuficiente!"); // Avisa o jogador
    }
  }

  function comprarDinheiroPorClique() {
    if (dinheiro >= custoDinheiroPorClique) {
      setDinheiro((d) => d - custoDinheiroPorClique);
      setDinheiroPorClique((dpc) => dpc + 1);
      setCustoDinheiroPorClique((custoAtual) => Math.floor(custoAtual * 1.5)); // Fica 50% mais caro
    } else {
      alert("Dinheiro insuficiente!");
    }
  }

  function atacarMonstro() {
    const ataqueFinal = isForcaAtiva ? ataqueDoJogador * 2 : ataqueDoJogador;
    setVidaDoMonstro((vidaAtual) => vidaAtual - ataqueFinal);
    const tentativasDeAtaque = 3 + Math.floor(andar / 5);
    let acertosDoMonstro = 0;
    for (let i = 0; i < tentativasDeAtaque; i++) {
      if (Math.random() < 0.33) acertosDoMonstro++;
    }
    const danoSofrido = Math.max(0, acertosDoMonstro - armaduraDoJogador);
    if (danoSofrido > 0) {
      adicionarLog(`O monstro revidou e causou ${danoSofrido} de dano!`);
      const novaVida = vida - danoSofrido;
      if (novaVida <= 0) {
        setVida(0);
        setGameState("derrota");
      } else {
        setVida(novaVida);
      }
    }
  }

  function coletarDinheiro() {
    setDinheiro((d) => d + dinheiroPorClique);
  }
  // (Lembre-se de ter as funções ativarMagiaDeForca, ativarMagiaDeTempo e renascer aqui também)
  // --- Renderização ---
  if (gameState === "introducao")
    return <TelaDeIntroducao onIniciar={() => setGameState("jogando")} />;
  if (gameState === "derrota")
    return <TelaDeGameOver onResetar={resetarJogo} />;
  if (gameState === "vitoria") return <TelaDeVitoria onResetar={resetarJogo} />;

  // Se não for intro nem derrota, mostra o jogo principal
  // --- A PARTE VISUAL (HUD) ---
  return (
    <div className="jogo-container">
      {/* AQUI PASSAMOS AS NOVAS FUNÇÕES E CUSTOS PARA A LOJA */}
      {isLojaAberta && (
        <Loja
          onClose={() => setIsLojaAberta(false)}
          dinheiro={dinheiro}
          onComprarVida={comprarVidaMaxima}
          custoVida={custoVida}
          onComprarDinheiroPorClique={comprarDinheiroPorClique}
          custoDinheiroPorClique={custoDinheiroPorClique}
          onComprarArmadura={comprarArmadura}
          custoArmadura={custoArmadura}
          onComprarFazenda={comprarFazenda}
          custoFazenda={custoFazenda}
          vidaMaxima={vidaMaxima}
          armaduraDoJogador={armaduraDoJogador}
          quantidadeFazendas={quantidadeFazendas}
          onComprarPocao={comprarPocaoDeVida}
          pocoesDeVida={pocoesDeVida}
          onComprarEspada={comprarEspada}
          custoEspada={custoEspada}
          nivelEspada={nivelEspada}
        />
      )}

      {/* TUDO ABAIXO É O SEU CÓDIGO ANTIGO, SEM MUDANÇAS */}

      {/* Seção do Monstro */}
      <div className="monstro-container">
        <h2>Monstro do Andar: {andar}</h2>
        <p>
          ❤️ Vida: {vidaDoMonstro} / {vidaMaximaDoMonstro}
        </p>
        <p>🛡️ Armadura: {armaduraDoJogador}</p>
        <p>💰 Recompensa: {Math.floor(recompensaDoMonstro)}</p>
      </div>

      <hr />

      {/* Seção do Jogador */}
      <div className="jogador-container">
        <h1>Seu Herói</h1>
        <div className="status">
          <p>
            ❤️ Sua Vida: {vida} / {vidaMaxima}
          </p>
          <p>🛡️ Batalhões: {"🛡️".repeat(armaduraDoJogador) || "Nenhum"}</p>
          <p>🚜 Fazendas: {"🚜".repeat(quantidadeFazendas) || "Nenhuma"}</p>
          <p>💰 Dinheiro: {dinheiro}</p>
          <p>
            🔮 Mana: {mana} / {manaMaxima}
          </p>
          <p>
            💥 Seu Ataque:{" "}
            {isForcaAtiva ? ataqueDoJogador * 2 : ataqueDoJogador} (Base:{" "}
            {ataqueDoJogador})
          </p>
        </div>
        <div className="status-magias">
          <p>Magia de Força: {isForcaAtiva ? "ATIVA 🔥" : "Inativa"}</p>
          <p>Magia de Tempo: {isTempoAtivo ? "ATIVA ⏳" : "Inativa"}</p>
        </div>
      </div>

      <div className="log-container">
        <h3>Voz do Arauto Real</h3>
        {log.map((mensagem, index) => (
          <p key={index} style={{ opacity: 1 - index * 0.2 }}>
            {mensagem}
          </p>
        ))}
      </div>

      <div className="acoes">
        <button onClick={atacarMonstro} disabled={vidaDoMonstro <= 0}>
          ⚔️ Atacar Monstrengo
        </button>

        {pocoesDeVida > 0 && (
          <button onClick={usarPocaoDeVida}>
            🧪 Usar Poção ({pocoesDeVida})
          </button>
        )}

        <button
          onClick={ativarMagiaDeForca}
          disabled={mana === 0 || cooldownForca}
        >
          {isForcaAtiva
            ? "FORÇA ATIVA!"
            : cooldownForca
            ? "Recarregando..."
            : "Magia de Força"}
        </button>

        <button
          onClick={ativarMagiaDeTempo}
          disabled={mana === 0 || cooldownTempo}
        >
          {isTempoAtivo
            ? "TEMPO ATIVO!"
            : cooldownTempo
            ? "Recarregando..."
            : "Magia do Tempo"}
        </button>

        {/* AQUI ESTÁ O NOVO BOTÃO */}
        <button onClick={() => setIsLojaAberta(true)}>🛖 Abrir Loja</button>
        <button onClick={coletarDinheiro}>🌳 Árvore de Dinheiro</button>
        {/* Lembre-se de ter os botões de magia aqui também */}
      </div>
    </div>
  );
}

export default App;
