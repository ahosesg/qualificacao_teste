# Qualificação MPGA — Representatividade temporal do monitoramento de MP10

Apresentação web-native da qualificação de mestrado de André Henrique Oliveira Santos, baseada no projeto **Representatividade temporal do monitoramento de MP10: proposta de protocolo técnico estadual para a avaliação da qualidade do ar em Pernambuco**.

## Princípios

- o repositório é o workspace e a fonte persistente do projeto;
- a aplicação web é o master da apresentação;
- o PDF é derivado do master web;
- a estrutura acadêmica segue o projeto de qualificação;
- a narrativa prioriza a demonstração da lacuna científica;
- todo texto exibido e todas as notas do apresentador são em português;
- a implementação deve manter zero sobreposição acidental, zero clipping de texto e zero overflow essencial.

## Stack

React + TypeScript + Vite + CSS moderno + SVG/D3, com GSAP disponível para motion narrativo e Playwright/Chromium para renderização, screenshots, QA geométrico e exportação PDF. Python é utilizado na automação auxiliar de QA e geração da contact sheet.

## Execução

```bash
npm install
npm run dev
```

Navegação: setas esquerda/direita ou Page Up/Page Down. Pressione `N` para exibir ou ocultar as notas do apresentador.

## QA e exportação

```bash
pip install -r requirements.txt
playwright install chromium
npm run qa
```

O pipeline renderiza os 27 frames em 1600 × 900, verifica overflow/clipping e separação geométrica entre as zonas principais, gera screenshots, contact sheet e PDF a partir do master web.

## Documentação

- `docs/strategy.md`: estado estratégico aprovado;
- `docs/storyboard.md`: storyboard aprovado;
- `docs/art-direction.md`: direção de arte;
- `docs/content-provenance.md`: proveniência e delimitações do conteúdo;
- `docs/qa.md`: critérios e estado do QA.
