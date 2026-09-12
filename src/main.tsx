// @ts-nocheck
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const C = {
  accent: '#ff7849', blue: '#7eb7c8', gold: '#d9b96e', good: '#7fc09b', line: '#2b3a40', muted: '#a8b1b3'
};

const waveVals = [48,42,51,39,56,62,52,68,61,75,59,66,83,73,65,79,70,54,58,43,52,47,60,55,68,73,64,79,86,71,66,58,51,62,49,44,56,63,72,67,54,46,51,42,55,61,50,57];
const linePath = (vals:number[], w=1180, h=240, pad=10) => vals.map((v,i)=>`${i===0?'M':'L'} ${pad+i*(w-2*pad)/(vals.length-1)} ${h-pad-(v-35)/(90-35)*(h-2*pad)}`).join(' ');
const gaussianPath = (center:number, spread:number, w=520, h=220) => {
  const pts=[]; for(let i=0;i<=80;i++){ const x=i*w/80; const y=Math.exp(-0.5*Math.pow((x-center)/spread,2)); pts.push(`${i?'L':'M'} ${x.toFixed(1)} ${(h-20-y*(h-50)).toFixed(1)}`);} return pts.join(' ');
};

function Footer({source, index}:{source:string,index:number}){
  return <div className="footerline"><div className="source">{source}</div><div className="slideNo">{String(index+1).padStart(2,'0')} / 27</div></div>;
}
function Frame({index, section, headline, children, source='Fonte: Projeto de qualificação, 2026.', small=false, xl=false}:{index:number,section:string,headline:string,children:any,source?:string,small?:boolean,xl?:boolean}){
  return <section className="slide" data-slide={index+1}>
    <div className="slide__inner qa-box">
      <header className="stack" style={{gap:16}}><div className="eyebrow">{section}</div><h1 className={`headline ${small?'small':''} ${xl?'xl':''}`}>{headline}</h1></header>
      <main style={{minHeight:0}}>{children}</main>
      <Footer source={source} index={index}/>
    </div>
  </section>;
}
function AnnualWave({windows=false}:{windows?:boolean}){
  return <div className="timeline qa-box" style={{height:330}}>
    <svg className="wave" viewBox="0 0 1180 240" style={{position:'absolute',left:70,right:70,top:30,width:'1280px'}}>
      <path className="faint" d={linePath(waveVals,1180,240,10)}/>
      <path className="main" d={linePath(waveVals,1180,240,10)}/>
    </svg>
    {windows && <div style={{display:'contents'}}><div className="window" style={{left:'18%',width:'14%'}}/><div className="window bluebox" style={{left:'63%',width:'14%'}}/></div>}
    <div style={{position:'absolute',left:70,right:70,bottom:22,display:'grid',gridTemplateColumns:'repeat(12,1fr)',fontSize:15,color:'#718087'}}>{['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'].map(m=><span key={m} style={{textAlign:'center'}}>{m}</span>)}</div>
  </div>;
}

const slides = [
  {
    note:'Abra situando a banca: o projeto trata de um problema específico de desenho temporal de campanhas de MP10. Evite começar pela norma. Primeiro estabeleça a questão científica e, depois, mostre por que ela importa para a gestão ambiental.',
    render:(i:number)=><Frame index={i} section="Qualificação de mestrado" headline="Representatividade temporal do monitoramento de MP10" xl source="André Henrique Oliveira Santos · MPGA/IFPE · Recife, 2026">
      <div className="grid-2" style={{gridTemplateColumns:'1.25fr .75fr'}}>
        <div className="stack" style={{justifyContent:'center'}}>
          <p className="subhead">Proposta de protocolo técnico estadual para a avaliação da qualidade do ar em Pernambuco</p>
          <div className="rule" style={{maxWidth:760}}/>
          <p className="smallcopy">Projeto de pesquisa para qualificação · foco científico: representatividade temporal de campanhas de MP10</p>
        </div>
        <div className="center" style={{position:'relative'}}><div className="hero-pm">MP<small>10</small></div><div className="particle-field">{Array.from({length:26},(_,k)=><span key={k} className="particle" style={{width:6+(k%5)*5,height:6+(k%5)*5,left:`${(k*37)%690}px`,top:`${(k*71)%250}px`,opacity:.25+(k%4)*.14}}/>)}</div></div>
      </div>
    </Frame>
  },
  {
    note:'A concentração observada em um ponto não depende apenas da emissão. Transporte, dispersão, deposição, ressuspensão e meteorologia produzem variabilidade. O monitoramento converte esse fenômeno continuamente variável em observações discretas.',
    render:(i:number)=><Frame index={i} section="1 · Introdução" headline="Monitorar a qualidade do ar é observar um fenômeno que varia continuamente">
      <div className="grid-2">
        <div className="stack"><div className="label">Fenômeno contínuo</div><div className="big-number blue">tempo</div><p className="body">As concentrações de MP10 mudam em escalas horárias, diárias, sazonais e interanuais.</p></div>
        <div><svg className="wave" viewBox="0 0 1180 240"><path className="main" d={linePath(waveVals,1180,240,10)}/>{waveVals.filter((_,k)=>k%5===0).map((v,k)=><circle key={k} cx={10+(k*5)*(1160)/(waveVals.length-1)} cy={230-(v-35)/55*220} r="7"/>)}</svg><p className="smallcopy" style={{textAlign:'right'}}>Esquema conceitual: fenômeno contínuo → observações discretas</p></div>
      </div>
    </Frame>
  },
  {
    note:'Esta é a distinção que sustenta o projeto. Uma campanha pode descrever corretamente o intervalo em que ocorreu e, ainda assim, não ser uma boa estimativa da condição anual. É aqui que entra a representatividade temporal.',
    render:(i:number)=><Frame index={i} section="1 · Introdução" headline="Uma campanha pode representar bem o período medido e ainda não representar o ano" small>
      <div className="stack" style={{justifyContent:'center'}}><AnnualWave windows/><div className="grid-2" style={{gap:80}}><div className="soft-panel"><div className="label accent">janela amostrada</div><p className="body">Descreve o período efetivamente observado.</p></div><div className="soft-panel"><div className="label blue">condição anual</div><p className="body">Exige que a distribuição das observações represente adequadamente o período de interesse.</p></div></div></div>
    </Frame>
  },
  {
    note:'Delimite o estudo antes de aprofundar o problema. Suape é a base empírica, não uma representação climatológica de todo Pernambuco. O foco analítico é temporal, o poluente é MP10, a referência é anual e o produto é orientado ao estado.',
    render:(i:number)=><Frame index={i} section="1.1 · Tema e delimitação" headline="O problema investigado é temporal">
      <div className="grid-4" style={{alignItems:'end'}}>
        {[['Poluente','MP10','séries históricas com cobertura potencialmente adequada'],['Base empírica','Suape','domínio para desenvolver e testar a metodologia'],['Período','2017–2025','condicionado à validade e à completude dos registros'],['Aplicação','Pernambuco','planejamento temporal do monitoramento, especialmente no licenciamento']].map(([a,b,c],k)=><div key={a} className="metric soft-panel"><span>{a}</span><strong className={k===1?'accent':''}>{b}</strong><span>{c}</span></div>)}
      </div>
    </Frame>
  },
  {
    note:'O problema surge quando uma campanha restrita coincide com condições particulares de dispersão, remoção, ressuspensão ou atividade das fontes. A média obtida pode subestimar ou superestimar a média anual. O sentido do viés não é conhecido previamente.',
    render:(i:number)=><Frame index={i} section="1.2 · Situação-problema" headline="O período escolhido para medir pode alterar a concentração estimada">
      <div className="stack"><AnnualWave windows/><div className="grid-3"><div className="soft-panel"><div className="label">janela A</div><p className="body">Pode coincidir com condições de menor concentração.</p></div><div className="soft-panel"><div className="label">referência</div><p className="body">A série anual funciona como base comparativa comum.</p></div><div className="soft-panel"><div className="label">janela B</div><p className="body">Pode coincidir com condições de maior concentração.</p></div></div></div>
    </Frame>
  },
  {
    note:'Mostre que tamanho amostral e cobertura temporal são dimensões diferentes. O exemplo com 24 observações é conceitual: a mesma quantidade pode ficar concentrada em um intervalo curto ou distribuída ao longo do ano.',
    render:(i:number)=><Frame index={i} section="1.2 · Situação-problema" headline="Mais amostras não significam, necessariamente, maior representatividade" small>
      <div className="stack" style={{justifyContent:'center',gap:44}}>
        <div className="sample-row"><div className="sample-label"><strong style={{color:C.accent,fontSize:34}}>24</strong><br/>observações concentradas</div><div className="sample-track">{Array.from({length:24},(_,k)=><span className={k<8?'hot':''} key={k}/>)}</div></div>
        <div className="sample-row"><div className="sample-label"><strong style={{color:C.blue,fontSize:34}}>24</strong><br/>observações distribuídas</div><div className="sample-track">{Array.from({length:24},(_,k)=><span className={k%2===0?'on':''} key={k}/>)}</div></div>
        <div className="rule"/><p className="subhead" style={{maxWidth:1320}}>Aumentar a densidade de medições em um intervalo restrito melhora a descrição daquele intervalo, mas pode acrescentar pouca informação sobre períodos ausentes.</p>
      </div>
    </Frame>
  },
  {
    note:'A lacuna local deve ser apresentada com precisão. O projeto não afirma que não exista literatura internacional sobre campanhas reduzidas. A lacuna específica é a ausência, entre as referências reunidas, de avaliação sistemática de desenhos temporais reduzidos de MP10 em Suape comparados a médias anuais e relacionados ao esforço operacional.',
    render:(i:number)=><Frame index={i} section="1.3 · Justificativa" headline="Existe uma lacuna entre medir MP10 e demonstrar que o desenho temporal representa o longo prazo" small>
      <div className="grid-2" style={{gridTemplateColumns:'.9fr 1.1fr'}}><div className="stack"><div className="label">A literatura local já aborda</div>{['biomonitoramento','inventários e modelagem de emissões','caracterização de dados observados','planejamento espacial da rede'].map(x=><div key={x} className="body soft-panel">{x}</div>)}</div><div className="stack" style={{justifyContent:'center',paddingLeft:40}}><div className="label accent">não identificada no conjunto reunido para o projeto</div><p className="headline small" style={{fontSize:46}}>Comparação sistemática de desenhos temporais reduzidos de MP10 com médias anuais de referência em Suape, associando desempenho ao esforço operacional.</p></div></div>
    </Frame>
  },
  {
    note:'Aqui está a contribuição científica que deve permanecer na memória da banca: integrar três dimensões que aparecem frequentemente separadas. A meteorologia caracteriza a variabilidade; as simulações quantificam a incerteza; e o esforço operacional permite discutir eficiência amostral.',
    render:(i:number)=><Frame index={i} section="1.3 · Justificativa" headline="A contribuição está em integrar três dimensões normalmente tratadas separadamente" small>
      <div className="triad"><div className="a"><h3>Variabilidade temporal</h3><p>Como as concentrações de MP10 se comportam no tempo e sob diferentes condições meteorológicas.</p></div><div className="b"><h3>Incerteza das campanhas</h3><p>Quanto estratégias temporalmente reduzidas se afastam da referência anual e quão estáveis são.</p></div><div className="c"><h3>Esforço de monitoramento</h3><p>Quanto cada desenho exige em amostragens, mobilizações, duração e frequência.</p></div></div>
    </Frame>
  },
  {
    note:'Leia o objetivo geral de forma sintética e depois destaque sua lógica: avaliar representatividade e esforço para propor um protocolo. O protocolo não vem antes da análise.',
    render:(i:number)=><Frame index={i} section="2.1 · Objetivo geral" headline="Avaliar quando uma estratégia temporal consegue representar a concentração média anual de MP10" small>
      <div className="grid-2" style={{gridTemplateColumns:'1.2fr .8fr'}}><p className="body" style={{fontSize:34,lineHeight:1.35}}>Avaliar diferentes estratégias temporais de amostragem de MP10 quanto à <span className="blue">capacidade de representar a concentração média anual</span> e ao <span className="gold">esforço necessário para sua execução</span>, a fim de propor um protocolo técnico estadual.</p><div className="stack"><div className="metric soft-panel"><span>critério científico</span><strong>representatividade</strong></div><div className="metric soft-panel"><span>critério operacional</span><strong>esforço</strong></div></div></div>
    </Frame>
  },
  {
    note:'Os seis objetivos específicos já formam uma sequência metodológica. Use esta lâmina para mostrar a progressão, sem ler cada item integralmente.',
    render:(i:number)=><Frame index={i} section="2.2 · Objetivos específicos" headline="A pesquisa avança da série histórica ao protocolo técnico">
      <div className="flow">{[
        ['Caracterizar','variabilidade temporal do MP10 e associação com meteorologia'],['Estabelecer referência','concentrações anuais a partir de séries válidas e completas'],['Simular','quantidade, frequência, duração e distribuição temporal'],['Avaliar','erro, viés, dispersão e estabilidade das estratégias'],['Comparar esforço','representatividade versus demanda amostral e operacional'],['Propor protocolo','orientação técnica estadual para o planejamento temporal']
      ].map(([a,b])=><div className="step" key={a}><strong>{a}</strong><p>{b}</p></div>)}</div>
    </Frame>
  },
  {
    note:'A revisão bibliográfica começa pelo fenômeno e converge para o problema de desenho temporal. A variabilidade em diferentes escalas impede assumir que uma janela curta represente automaticamente o ano.',
    render:(i:number)=><Frame index={i} section="3 · Revisão bibliográfica" headline="A variabilidade do MP10 ocorre em múltiplas escalas temporais">
      <div className="scale-row"><div className="scale-item"><div className="num">h</div><div className="word">horária</div><p>atividade das fontes, tráfego, turbulência e camada limite</p></div><div className="scale-item"><div className="num">d</div><div className="word">diária</div><p>mudanças na dispersão, remoção e condições atmosféricas</p></div><div className="scale-item"><div className="num">m</div><div className="word">sazonal</div><p>precipitação, vento, estabilidade e ciclos das emissões</p></div><div className="scale-item"><div className="num">a</div><div className="word">interanual</div><p>variações meteorológicas e alterações nas condições de emissão</p></div></div>
    </Frame>
  },
  {
    note:'A meteorologia é um eixo explicativo complementar. O projeto não pretende estabelecer causalidade automática nem generalizar Suape para todo Pernambuco. O objetivo é demonstrar empiricamente a existência e a magnitude da variabilidade temporal na base estudada.',
    render:(i:number)=><Frame index={i} section="3.4 · Variabilidade temporal e meteorologia" headline="Meteorologia torna o momento da amostragem parte do problema">
      <div className="grid-2"><div className="meteo-orbit"><div className="meteo-core">MP<sub style={{fontSize:24}}>10</sub></div><div className="meteo-node n1">precipitação</div><div className="meteo-node n2">vento</div><div className="meteo-node n3">temperatura</div><div className="meteo-node n4">umidade</div></div><div className="stack"><p className="body">Campanhas com o mesmo número de observações podem ocorrer sob regimes meteorológicos distintos.</p><div className="soft-panel"><div className="label accent">alcance da análise</div><p className="smallcopy">Associação e contextualização local, sem pressupor causalidade e sem extrapolação automática para outras regiões.</p></div></div></div>
    </Frame>
  },
  {
    note:'Use esta definição como centro conceitual. Representatividade temporal envolve proximidade em relação à referência, incerteza entre diferentes realizações e estabilidade entre anos. Uma única campanha “que deu certo” não basta.',
    render:(i:number)=><Frame index={i} section="3.5 · Representatividade temporal" headline="Representatividade temporal é proximidade, incerteza e estabilidade">
      <div className="triad"><div className="a"><h3>Proximidade</h3><p>Quão próxima a estimativa da campanha fica da média anual de referência.</p></div><div className="b"><h3>Incerteza</h3><p>Quanto diferentes combinações de datas do mesmo desenho variam entre si.</p></div><div className="c"><h3>Estabilidade</h3><p>Se o desempenho se mantém consistente diante da variabilidade entre anos.</p></div></div>
    </Frame>
  },
  {
    note:'Este é um dos poucos números externos que vale mostrar. Jurado et al. encontraram, no conjunto francês analisado, erros médios de aproximadamente 12–14% com um mês e 4–6% com seis meses. O projeto é explícito: esses números não devem ser transferidos diretamente para Suape.',
    render:(i:number)=><Frame index={i} section="3.6 · Estratégias temporais de amostragem" headline="A literatura indica que a distribuição das medições pode importar tanto quanto sua quantidade" small source="Jurado et al. (2023), conforme revisão do projeto de qualificação. Valores não transferíveis diretamente para Suape.">
      <div className="grid-2"><div className="quote-stat"><div><div className="big-number accent">12–14%</div><div className="kicker">erro médio aproximado<br/>com <strong>1 mês</strong> de medição</div></div><div className="arrowbig">→</div><div><div className="big-number blue">4–6%</div><div className="kicker">erro médio aproximado<br/>com <strong>6 meses</strong></div></div></div><div className="stack"><p className="body">Os maiores ganhos ocorreram nos primeiros incrementos de cobertura.</p><div className="soft-panel"><div className="label gold">ponto metodológico</div><p className="smallcopy">A lógica de avaliação é transferível. Os resultados numéricos precisam ser recalculados localmente.</p></div></div></div>
    </Frame>
  },
  {
    note:'Uma estratégia deve ser repetida muitas vezes, porque diferentes combinações de datas podem gerar resultados diferentes. A distribuição dos resultados mostra risco, viés e estabilidade que uma média isolada esconderia.',
    render:(i:number)=><Frame index={i} section="3.7 · Avaliação quantitativa" headline="Avaliar uma estratégia exige uma distribuição de resultados, não apenas uma média" small>
      <div className="dist-wrap"><div className="dist"><svg viewBox="0 0 520 220"><line className="baseline" x1="0" y1="200" x2="520" y2="200"/><line className="mean" x1="260" y1="20" x2="260" y2="205"/><path className="a" d={gaussianPath(260,58)}/></svg><div className="label blue">estratégia mais estável</div></div><div className="dist"><svg viewBox="0 0 520 220"><line className="baseline" x1="0" y1="200" x2="520" y2="200"/><line className="mean" x1="260" y1="20" x2="260" y2="205"/><path className="b" d={gaussianPath(260,108)}/></svg><div className="label accent">mesma média, maior dispersão</div></div></div>
    </Frame>
  },
  {
    note:'Introduza eficiência amostral como problema multiobjetivo. A menor diferença em relação à média anual pode exigir esforço muito maior. O interesse é verificar onde os ganhos adicionais deixam de ser proporcionais à demanda de monitoramento.',
    render:(i:number)=><Frame index={i} section="3.8 · Eficiência amostral" headline="A estratégia de menor erro pode não ser a estratégia mais eficiente">
      <div className="grid-2"><div className="curve-box"><svg viewBox="0 0 620 360"><line className="guide" x1="70" y1="300" x2="590" y2="300"/><line className="guide" x1="70" y1="40" x2="70" y2="300"/><path className="curve" d="M 90 74 C 180 145, 235 200, 300 238 C 390 285, 470 294, 570 296"/><circle className="point" cx="310" cy="244" r="9"/><text x="335" y="235">ganho marginal diminui</text><text x="250" y="338">esforço de monitoramento →</text><text transform="translate(24 220) rotate(-90)">erro / incerteza →</text></svg></div><div className="stack"><p className="body">A comparação busca identificar estratégias dominadas e alternativas que mantenham desempenho satisfatório com menor demanda operacional.</p><div className="pillrow"><span className="pill">amostragens</span><span className="pill">mobilizações</span><span className="pill">dias por campanha</span><span className="pill">duração anual</span></div></div></div>
    </Frame>
  },
  {
    note:'A metodologia é organizada em dois eixos. O primeiro caracteriza a variabilidade local e dá contexto. O segundo é o eixo principal e testa estratégias temporais contra referências anuais.',
    render:(i:number)=><Frame index={i} section="4 · Metodologia" headline="A metodologia responde à lacuna em dois eixos complementares">
      <div className="axis-pair"><div className="axis-card"><div className="tag" style={{color:C.blue}}>eixo 1 · suporte</div><h3>Variabilidade temporal e meteorologia</h3><p>Caracterizar o comportamento do MP10 em Suape e explorar sua associação com as condições meteorológicas.</p></div><div className="axis-card main"><div className="tag">eixo 2 · principal</div><h3>Simulação de estratégias temporais</h3><p>Usar séries históricas mais completas como referência para testar se campanhas reduzidas conseguem reproduzir concentrações anuais.</p></div></div>
    </Frame>
  },
  {
    note:'Apresente Suape como domínio empírico e destaque o período inicialmente previsto de 2017 a 2025, condicionado à disponibilidade, validade e completude. Os dados de MP10 virão das estações da CPRH e plataformas indicadas; a meteorologia de INMET, APAC e CEMADEN, conforme disponibilidade.',
    render:(i:number)=><Frame index={i} section="4.1 · Área de estudo e dados" headline="Suape fornece a base empírica para testar a representatividade temporal">
      <div className="grid-2"><div className="stack"><div className="label">janela histórica inicialmente considerada</div><div className="big-number accent" style={{fontSize:96}}>2017–2025</div><p className="body">Anos completos, condicionados à disponibilidade, validade e completude necessárias às análises.</p><div className="soft-panel"><div className="label blue">delimitação</div><p className="smallcopy">Suape funciona como domínio para desenvolver e testar a metodologia. O comportamento atmosférico local não é tratado como representativo de todo Pernambuco.</p></div></div><div className="data-sources"><div className="source-cluster"><h3>MP10</h3><strong>qualidade do ar</strong><div className="list"><span>CPRH</span><span>IEMA</span><span>MonitorAr</span></div></div><div className="source-cluster"><h3>meteorologia</h3><strong>condições atmosféricas</strong><div className="list"><span>INMET</span><span>APAC</span><span>CEMADEN</span></div></div></div></div>
    </Frame>
  },
  {
    note:'A referência anual só pode ser construída depois do controle de qualidade. O projeto prevê manter bases individualizadas, padronizar datas, horários, unidades e resolução, identificar duplicidades, ausências, períodos de manutenção e avaliar completude por estação, variável, mês e ano.',
    render:(i:number)=><Frame index={i} section="4.2 · Preparação e controle de qualidade" headline="Antes de simular campanhas, é necessário construir uma referência confiável" small>
      <div className="pipeline"><div className="pipe-step"><strong>Dados brutos</strong><p>bases por estação e variável</p></div><div className="pipe-step blue"><strong>Padronização</strong><p>data, hora, fuso, unidades e resolução</p></div><div className="pipe-step"><strong>Validação</strong><p>duplicidades, ausências, códigos e manutenção</p></div><div className="pipe-step"><strong>Completude</strong><p>estação, variável, mês e ano</p></div><div className="pipe-step hot"><strong>Referência anual</strong><p>melhor aproximação observacional disponível</p></div></div>
    </Frame>
  },
  {
    note:'Este eixo descreve o contexto local. Serão usadas estatísticas descritivas, séries temporais, distribuições e correlações apropriadas às características dos dados. Reforce que modelos, se usados, terão interpretação associativa e não causal.',
    render:(i:number)=><Frame index={i} section="4.3 · Eixo 1" headline="Caracterizar como o MP10 varia no tempo e em diferentes condições meteorológicas" small>
      <div className="mini-plots"><div className="mini"><h4>série temporal</h4><svg viewBox="0 0 520 260"><line className="grid" x1="0" y1="220" x2="520" y2="220"/><path d={linePath(waveVals.slice(0,24),520,240,8)}/></svg></div><div className="mini"><h4>distribuição</h4><svg viewBox="0 0 340 260"><line className="grid" x1="20" y1="220" x2="330" y2="220"/><path d="M 30 220 C 90 215,100 90,170 60 C 240 95,245 210,320 220"/></svg></div><div className="mini"><h4>associação</h4><svg viewBox="0 0 340 260"><line className="grid" x1="25" y1="220" x2="330" y2="220"/>{[[55,185],[88,155],[112,178],[142,142],[170,149],[205,112],[232,130],[260,95],[295,82]].map(([x,y],k)=><circle key={k} cx={x} cy={y} r="6"/>)}</svg></div></div>
    </Frame>
  },
  {
    note:'Este é o coração metodológico. A série anual é tratada como laboratório: a partir dela são extraídos subconjuntos que imitam campanhas com diferentes quantidades, intervalos, mobilizações, durações e distribuições. Dê atenção especial às estratégias com número semelhante de observações e distribuição diferente.',
    render:(i:number)=><Frame index={i} section="4.4 · Eixo 2" headline="Transformar a série anual em um laboratório de campanhas hipotéticas">
      <div className="stack" style={{gap:32}}><div className="label">mesma série de referência · diferentes regras de amostragem</div>{[
        ['A · concentrada',[0,1,2,3,4,5]],['B · distribuída',[0,4,8,12,16,20]],['C · blocos sazonais',[1,2,8,9,16,17]]
      ].map(([lab,on])=><div className="sample-row" key={lab as string}><div className="sample-label">{lab as string}</div><div className="sample-track">{Array.from({length:24},(_,k)=><span key={k} className={(on as number[]).includes(k)?'on':''}/>)}</div></div>)}<div className="pillrow" style={{marginTop:12}}><span className="pill">quantidade</span><span className="pill">intervalo</span><span className="pill">mobilizações</span><span className="pill">duração</span><span className="pill">distribuição temporal</span></div></div>
    </Frame>
  },
  {
    note:'Cada desenho que possa assumir várias combinações de datas será reamostrado repetidamente, seguindo lógica semelhante a experimentos de Monte Carlo. A quantidade final de repetições será definida no pré-teste pela estabilidade das métricas.',
    render:(i:number)=><Frame index={i} section="4.4 · Simulação e representatividade" headline="Cada estratégia será testada repetidamente contra a referência anual" small>
      <div className="monte"><div className="rows">{Array.from({length:8},(_,r)=><div className="monte-row" key={r}>{Array.from({length:16},(_,k)=><span key={k} className={(k+r*3)%5===0||k===r%16?'on':''}/>)}</div>)}</div><div className="stack"><div className="label accent">saída de cada estratégia</div>{['erro relativo','erro absoluto','viés','dispersão','percentis','estabilidade entre anos'].map(x=><div key={x} className="body soft-panel" style={{fontSize:24}}>{x}</div>)}</div></div>
    </Frame>
  },
  {
    note:'Este ponto fortalece a defesa metodológica. O estudo não define previamente um limite arbitrário de aceitabilidade. Primeiro observa as distribuições de erro e a estabilidade, depois interpreta esses resultados junto com a literatura e a finalidade técnica.',
    render:(i:number)=><Frame index={i} section="4.4 · Critério de desempenho" headline="O limite de desempenho aceitável não será imposto antes de observar os resultados" small>
      <div className="threshold"><div className="node"><strong>Distribuições observadas</strong><p>erro, viés, dispersão e percentis das simulações</p></div><div className="arr">→</div><div className="node"><strong>Robustez</strong><p>estabilidade entre anos e análises de sensibilidade</p></div><div className="arr">→</div><div className="node final"><strong>Critério técnico</strong><p>interpretação conjunta dos resultados, literatura e finalidade do monitoramento</p></div></div>
    </Frame>
  },
  {
    note:'Depois de identificar estratégias tecnicamente aceitáveis, compare o esforço. O objetivo é saber se mais amostras, mobilizações ou duração realmente reduzem o erro de forma relevante. Estratégias dominadas exigem mais esforço sem vantagem correspondente.',
    render:(i:number)=><Frame index={i} section="4.5 · Eficiência amostral" headline="Da representatividade à eficiência: quanto esforço adicional realmente melhora a informação?" small>
      <div className="grid-2"><div className="curve-box"><svg viewBox="0 0 620 360"><line className="guide" x1="70" y1="300" x2="590" y2="300"/><line className="guide" x1="70" y1="40" x2="70" y2="300"/><path className="curve" d="M 95 72 C 145 118, 205 175, 275 225 C 365 277, 450 292, 575 296"/>{[[145,119],[215,184],[300,240],[395,280],[500,292]].map(([x,y],k)=><circle key={k} cx={x} cy={y} r="9" fill={k===2?C.accent:C.blue}/>)}<circle cx="455" cy="250" r="9" fill={C.gold}/><text x="468" y="245">estratégia dominada</text><text x="250" y="338">esforço →</text><text transform="translate(24 220) rotate(-90)">erro →</text></svg></div><div className="stack"><div className="label">resultado esperado da comparação</div><p className="body">Identificar o cenário de maior representatividade e, entre os desempenhos tecnicamente aceitáveis, as alternativas de maior eficiência amostral e operacional.</p><div className="soft-panel"><div className="label accent">produto técnico</div><p className="smallcopy">O protocolo sistematiza níveis de desempenho associados a diferentes estratégias. Não precisa resultar em uma frequência única.</p></div></div></div>
    </Frame>
  },
  {
    note:'Os resultados esperados são científicos e técnico-aplicados. A contribuição tecnológica não é uma patente, mas a sistematização de uma metodologia quantitativa e de um protocolo técnico.',
    render:(i:number)=><Frame index={i} section="5 · Resultados esperados" headline="A pesquisa deve produzir evidências científicas e um produto técnico aplicado" small>
      <div className="outputs">{[
        ['Caracterização local','variabilidade temporal do MP10 e associações com condições meteorológicas'],['Referências anuais','melhor aproximação observacional disponível para os anos e estações válidos'],['Desempenho das estratégias','erro, viés, dispersão, percentis e estabilidade entre anos'],['Eficiência amostral','relação entre ganho de representatividade e demanda de monitoramento'],['Protocolo técnico estadual','desempenho de diferentes desenhos como suporte à gestão ambiental'],['Estrutura replicável','metodologia potencialmente aplicável a outros poluentes, mediante séries adequadas']
      ].map(([a,b])=><div className="output" key={a}><div><strong>{a}</strong><p>{b}</p></div></div>)}</div>
    </Frame>
  },
  {
    note:'O projeto prevê 12 meses, com atividades sucessivas e parcialmente simultâneas. Esta visualização resume o encadeamento sem substituir a tabela detalhada do projeto. Evite afirmar datas específicas para cada atividade que não estejam visíveis aqui.',
    render:(i:number)=><Frame index={i} section="6 · Cronograma" headline="A execução conecta base de dados, simulação, interpretação e produto técnico em 12 meses" small>
      <div className="stack" style={{gap:18}}><div className="phase-schedule"><div/><div className="head">M1–M3</div><div className="head">M4–M6</div><div className="head">M7–M9</div><div className="head">M10–M12</div>{[
        ['Revisão da literatura',[1,1,0,0],'blue'],
        ['Dados, estações e qualidade',[1,1,0,0],'blue'],
        ['Pré-teste e critérios metodológicos',[1,1,0,0],'gold'],
        ['Variabilidade e meteorologia',[0,1,1,0],'blue'],
        ['Referência, cenários e simulações',[0,1,1,0],'orange'],
        ['Representatividade, eficiência e integração',[0,0,1,1],'gold'],
        ['Protocolo técnico',[0,0,0,1],'orange'],
        ['Dissertação e divulgação',[1,1,1,1],'green']
      ].map(([lab,vals,col])=><div className="sched-row" key={lab as string}><div className="rowlabel">{lab as string}</div>{(vals as number[]).map((v,k)=><div key={k} className={`cell ${v?`on-${col}`:''}`}/>)}</div>)}</div><p className="smallcopy">Síntese fiel da Tabela 1 do projeto. As atividades são sucessivas e parcialmente simultâneas ao longo de 12 meses.</p></div>
    </Frame>
  },
  {
    note:'Feche retornando à pergunta inicial. O trabalho não busca simplesmente aumentar o volume de medições. Busca saber quando um desenho temporal oferece informação anual suficientemente representativa e quanto esforço adicional efetivamente melhora essa representação.',
    render:(i:number)=><Frame index={i} section="Síntese científica" headline="" source="Síntese do projeto de qualificação, 2026.">
      <div className="closing"><div className="statement">O objetivo não é apenas <em>medir mais</em>, mas saber quando o desenho temporal é suficiente para <span className="blue">representar o ano</span>.</div><div className="grid-3" style={{width:'100%'}}><div className="soft-panel"><div className="label">pergunta</div><p className="body">Quais estratégias representam melhor a média anual?</p></div><div className="soft-panel"><div className="label">critério</div><p className="body">Qual desempenho é tecnicamente aceitável?</p></div><div className="soft-panel"><div className="label">decisão</div><p className="body">Quanto esforço adicional realmente melhora a informação?</p></div></div></div>
    </Frame>
  }
];

class App extends React.Component<any,{idx:number,notes:boolean}> {
  print:boolean; keyHandler:any; resizeHandler:any;
  constructor(props:any){
    super(props);
    const params=new URLSearchParams(location.search);
    this.print=(window as any).__PRINT__===true || params.get('print')==='1';
    const initial=Math.min(slides.length-1,Math.max(0,Number((window as any).__SLIDE__ || params.get('slide') || 1)-1));
    this.state={idx:initial,notes:false};
    this.resizeHandler=()=>{ if(this.print){document.documentElement.style.setProperty('--scale','1');return;} const sc=Math.min(innerWidth/1600,innerHeight/900); document.documentElement.style.setProperty('--scale',String(sc)); };
    this.keyHandler=(e:KeyboardEvent)=>{ if(this.print)return; const i=this.state.idx; if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();this.setState({idx:Math.min(slides.length-1,i+1)});} if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();this.setState({idx:Math.max(0,i-1)});} if(e.key.toLowerCase()==='n')this.setState({notes:!this.state.notes}); if(e.key==='Home')this.setState({idx:0}); if(e.key==='End')this.setState({idx:slides.length-1}); };
  }
  componentDidMount(){
    document.body.classList.toggle('print-all',this.print); this.resizeHandler(); addEventListener('resize',this.resizeHandler); addEventListener('keydown',this.keyHandler); this.syncActive();
  }
  componentDidUpdate(){ this.syncActive(); }
  componentWillUnmount(){ removeEventListener('resize',this.resizeHandler); removeEventListener('keydown',this.keyHandler); }
  syncActive(){ if(this.print)return; const i=this.state.idx; try{history.replaceState(null,'',`?slide=${i+1}`)}catch(e){} document.querySelectorAll('.slide').forEach((el:any,k)=>el.classList.toggle('active',k===i)); }
  render(){
    const idx=this.state.idx, notes=this.state.notes;
    return <div className="app"><div className="viewport"><div className="stage">{slides.map((s,k)=>s.render(k))}</div></div>{!this.print&&<div style={{display:'contents'}}><div className="nav"><button aria-label="Anterior" onClick={()=>this.setState({idx:Math.max(0,idx-1)})}>←</button><button aria-label="Notas" onClick={()=>this.setState({notes:!notes})}>N</button><button aria-label="Próximo" onClick={()=>this.setState({idx:Math.min(slides.length-1,idx+1)})}>→</button></div><div className={`notes ${notes?'show':''}`}><strong>Notas do apresentador</strong><p>{slides[idx].note}</p></div></div>}</div>;
  }
}

createRoot(document.getElementById('root')!).render(<App/>);
