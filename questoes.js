// Arquivo: questoes.js
// Regra: Sempre use crases ( ` ) para envolver textos longos de perguntas e respostas.

const DATABASE = {
  "ENEM 2020 - Humanas": [
    {
      id: "Q46",
      text: `Embora inegáveis os benefícios que ambas as economias têm auferido do intercâmbio comercial, o Brasil tem reiterado seu objetivo de desenvolver com a China uma relação comercial menos assimétrica.
As exportações brasileiras de produtos básicos compõem algo entre 75% e 80% da pauta, ao passo que as importações brasileiras consistem em 95% de produtos industrializados chineses.

Uma ação estatal de longo prazo capaz de reduzir a assimetria na balança comercial brasileira, conforme exposto no texto, é o(a)`,
      alts: [
        "expansão do setor extrativista.",
        "incremento da atividade agrícola.",
        "diversificação da matriz energética.",
        "fortalecimento da pesquisa científica.",
        "monitoramento do fluxo alfandegário."
      ],
      answer: "D",
      comment: `Para exportar produtos com maior valor agregado e reduzir a dependência, o Estado precisa investir em pesquisa e desenvolvimento científico.`
    },
    {
      id: "Q47",
      text: `As estatísticas mais recentes do Brasil rural revelam um paradoxo: o emprego de natureza agrícola definha em praticamente todo o país, mas a população residente no campo voltou a crescer. Esse novo cenário é explicado em parte pelo incremento do emprego não agrícola no campo. Ao mesmo tempo, aumentou a massa de desempregados, inativos e aposentados que mantêm residência rural.

Sobre o espaço brasileiro, o texto apresenta argumentos que refletem a`,
      alts: [
        "heterogeneidade do modo de vida agrário.",
        "redução do fluxo populacional nas cidades.",
        "correlação entre força de trabalho e migração sazonal.",
        "indissociabilidade entre local de moradia e acesso à renda.",
        "desregulamentação das propriedades nas zonas de fronteira."
      ],
      answer: "A",
      comment: `O campo brasileiro não é mais exclusivamente voltado para a agropecuária; ele abriga outras atividades, mostrando grande heterogeneidade.`
    }
  ],

  "ENEM 2020 - Linguagens": [
    {
      id: "Q06",
      text: `Vou-me embora p’ra Pasárgada foi o poema de mais longa gestação em toda a minha obra. Vi pela primeira vez esse nome Pasárgada quando tinha os meus dezesseis anos e foi num autor grego. [...] Gosto desse poema porque vejo nele, em escorço, toda a minha vida [...].

Os processos de interação comunicativa preveem a presença ativa de múltiplos elementos da comunicação, entre os quais se destacam as funções da linguagem. Nesse fragmento, a função da linguagem predominante é a`,
      alts: [
        "emotiva, porque o poeta expõe os sentimentos de angústia que o levaram à criação poética.",
        "referencial, porque o texto informa sobre a origem do nome empregado em um famoso poema de Bandeira.",
        "metalinguística, porque o poeta tece comentários sobre a gênese e o processo de escrita de um de seus poemas.",
        "poética, porque o texto aborda os elementos estéticos de um dos poemas mais conhecidos de Bandeira.",
        "apelativa, porque o poeta tenta convencer os leitores sobre sua dificuldade de compor um poema."
      ],
      answer: "C",
      comment: `A função metalinguística ocorre quando o código (a linguagem/poema) é utilizado para explicar o próprio código (o processo de criação do poema).`
    }
  ]
};