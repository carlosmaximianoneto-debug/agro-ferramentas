# Agro Ferramentas

Site responsivo em português, com logo original animado, catálogo real da tabela `produtos_agro_ferramentas`, links de afiliado e grupo de WhatsApp.

## Conectar ao Netlify

Importe este repositório no Netlify. O arquivo `netlify.toml` configura tudo: diretório de publicação `dist`, sem comando de build, funções em `netlify/functions`.

O site já funciona com a seleção de 80 produtos salva em `dist/products.json`. Para consultar o banco automaticamente, configure a variável **SUPABASE_PUBLISHABLE_KEY** no Netlify com a chave publicável do projeto Supabase GrupoSoRefrigeracao e faça um novo deploy. Não use service_role. A função consulta apenas campos de produto e mantém a chave no servidor. Se a consulta falhar, a seleção salva continua disponível, identificada com sua data.

Os preços são valores de referência do banco, não uma verificação em tempo real do preço do Mercado Livre. Não há contadores de membros, depoimentos ou prazos de oferta simulados.

## Arquivos

- `dist/index.html`: página e link do grupo.
- `dist/styles.css`: visual e animações, respeitando redução de movimento.
- `dist/app.js`: catálogo, paginação e tratamento de indisponibilidade.
- `dist/products.json`: seleção pública exportada do banco.
- `netlify/functions/products.mjs`: consulta de leitura do catálogo.

Não há dependências de instalação nem necessidade de alterar o banco para usar o site.
