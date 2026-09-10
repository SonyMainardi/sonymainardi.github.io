# Portfólio — Sony Mainardi

Portfólio pessoal de desenvolvedor full stack, construído com React, TypeScript, Tailwind CSS e Motion.

🔗 **Site:** https://sonymainardi.github.io

## Stack

| Camada     | Tecnologia                           |
| ---------- | ------------------------------------ |
| Build      | Vite 8 (build multipágina)           |
| UI         | React 19 + TypeScript                |
| Estilo     | Tailwind CSS v4 (configurado no CSS) |
| Animações  | Motion (Framer Motion)               |
| Ícones     | lucide-react + SVGs próprios         |
| Lint       | oxlint                               |

## Funcionalidades

- Seções: hero, sobre, skills, projetos, experiência e contato
- Bilíngue **PT/EN** com botão de troca (preferência salva no `localStorage`)
- Tema **claro/escuro** com detecção da preferência do sistema e sem flash ao carregar
- Projetos carregados da **API do GitHub** em runtime, com cache de 6h e fallback para a lista local
- Página de **currículo para impressão** em `/cv.html` (Ctrl+P → salvar em PDF), bilíngue
- Animações de entrada por scroll, timeline animada, filtro de projetos com transição de layout
- Barra de progresso de leitura e fundo aurora reativo ao scroll
- Responsivo, com contraste AA e respeito a `prefers-reduced-motion`
- SEO: Open Graph, Twitter Card, JSON-LD, `robots.txt` e `sitemap.xml`

## Rodando localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção em dist/
npm run preview  # serve o build de produção
npm run lint     # oxlint
```

## Editando o conteúdo

Todo o conteúdo (bio, skills, projetos, experiências, contatos) fica em **`src/data/content.ts`**.
Os textos da interface (menus, botões, títulos de seção) ficam em **`src/lib/i18n.ts`**.
Nenhuma informação pessoal está espalhada pelos componentes.

Os cards de projeto vêm da API do GitHub. A lista em `content.ts` define ordem, destaques e
descrições nos dois idiomas; `hiddenRepos` esconde repositórios que não devem aparecer.
Repositório novo com descrição no GitHub entra sozinho no site.

Detalhes de arquitetura, decisões e pendências estão em **`DEV-NOTES.md`**.

## Deploy no GitHub Pages

O workflow em `.github/workflows/deploy.yml` builda e publica a cada push na `main`
(**Settings → Pages → Build and deployment → GitHub Actions**).

O `base` do Vite está como `./` (caminhos relativos), então funciona tanto em domínio raiz
quanto em subpasta (`usuario.github.io/repositorio/`).

## Licença

Uso pessoal.
