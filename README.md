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

## Arquitetura prevista

TypeScript + React + CSS moderno + SVG/D3 para visualização, GSAP para motion narrativo, Python para processamento auxiliar e Playwright/Chromium para screenshots, QA geométrico e exportação PDF.

> Observação: a instalação das dependências deve usar as versões registradas no `package.json`. A aplicação também mantém um bundle estático de entrega para preservar a renderização em ambiente sem acesso ao registry npm.
