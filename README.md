# Portfólio — Sony Mainardi

Portfólio pessoal de desenvolvedor full stack, construído com React, TypeScript, Tailwind CSS e Motion.

🔗 **Demo:** publique com o workflow do GitHub Pages (veja abaixo)

## Stack

| Camada     | Tecnologia                        |
| ---------- | --------------------------------- |
| Build      | Vite 8                            |
| UI         | React 19 + TypeScript             |
| Estilo     | Tailwind CSS v4 (configurado no CSS) |
| Animações  | Motion (Framer Motion)            |
| Ícones     | lucide-react + SVGs próprios      |
| Lint       | oxlint                            |

## Funcionalidades

- Seções: hero, sobre, skills, projetos, experiência e contato
- Bilíngue **PT/EN** com botão de troca (preferência salva no `localStorage`)
- Tema **claro/escuro** com detecção da preferência do sistema
- Animações de entrada por scroll, timeline animada, filtro de projetos com transição de layout
- Barra de progresso de leitura e fundo aurora reativo ao scroll
- Responsivo e com respeito a `prefers-reduced-motion`

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

## Deploy no GitHub Pages

1. Suba o repositório no GitHub.
2. Em **Settings → Pages → Build and deployment**, escolha **GitHub Actions**.
3. Faça push na branch `main`: o workflow em `.github/workflows/deploy.yml` builda e publica.

O `base` do Vite está como `./` (caminhos relativos), então funciona tanto em domínio raiz quanto em subpasta (`usuario.github.io/repositorio/`).

## Licença

Uso pessoal.
