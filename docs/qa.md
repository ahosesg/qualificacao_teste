# QA visual e geométrico

## Política de bloqueio
A exportação final é bloqueada se houver texto fora do frame, clipping detectável, overflow essencial, conteúdo estrutural fora do viewport ou sobreposição entre header, corpo e footer.

## Procedimento
`scripts/render.py`:
1. executa o build da aplicação;
2. renderiza os 27 frames em Chromium a 1600 × 900;
3. verifica overflow e clipping em elementos textuais;
4. verifica separação geométrica entre header, corpo e footer;
5. gera screenshots individuais;
6. gera contact sheet;
7. exporta o PDF diretamente do master web.

## Estado da versão validada
- frames renderizados: 27;
- erros de página: 0;
- frames com falha geométrica: 0;
- PDF final: 27 páginas;
- contact sheet inspecionada para ritmo, densidade e repetição.
