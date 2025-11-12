# DEPLOY CHECKLIST

Antes de fazer deploy, verifique os passos abaixo:

- [ ] Rodar `npm install` (se necessário)
- [ ] Rodar `npm run build` (ou `npm run build:min` para minificar)
- [ ] Comprimir hero (scripts/compress-hero.js) e substituir manualmente se satisfeito
- [ ] Atualizar `og:image`/`preload` para apontar para a versão otimizada (opcional)
- [ ] Validar links internos e externos
- [ ] Testar responsividade em mobile/tablet/desktop
- [ ] Testar acessibilidade básica (skip links, contrastes, keyboard nav)
- [ ] Garantir que `docs/` e relatórios não estão no `dist/`
- [ ] Fazer deploy para servidor / hosting
- [ ] Verificar LCP e Lighthouse performance pós-deploy

Notas:
- O script `scripts/build.js` copia `img`, `assets`, `partners`, `branding/logo` e os arquivos manifest/robots/sitemap para `dist/`.
- Para ativar minificação do HTML use `MINIFY=1 node scripts/build.js` ou `npm run build:min`.
