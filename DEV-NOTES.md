# Notas de desenvolvimento

Arquivo de contexto para futuras sessões de trabalho neste projeto. O código não leva comentários — tudo que precisa de explicação mora aqui.

Última atualização: 2026-09-10.

---

## 1. Convenções do projeto

- **Sem comentários no código.** Explicações, decisões e pendências vão neste arquivo. Só é aceitável um comentário em código para algo realmente crítico e não óbvio.
- Componentes em `PascalCase.tsx`, um componente por arquivo, export nomeado (exceto `App.tsx`, que é default). Exceções conscientes: `ScrollProgress` (dentro de `App.tsx`) e `Block` (dentro de `Resume.tsx`) — cascas pequenas, usadas só ali e não exportadas.
- Nada de texto fixo dentro de componente: conteúdo em `src/data/content.ts`, textos de interface em `src/lib/i18n.ts`.
- Idioma dos identificadores: inglês. Idioma do conteúdo: PT e EN, sempre os dois.

## 2. Origem dos dados pessoais

Os dados vieram de dois repositórios antigos (usados apenas como consulta, nada foi copiado de código):

- `github.com/SonyMainardi/sonymainardi` — README de perfil (bio, stack, contatos).
- `github.com/SonyMainardi/sony-portfolio` — portfólio antigo em HTML/CSS/JS; os dados estavam em `data/profile.json`.
- API pública do GitHub — lista de repositórios que virou a seção de projetos.

**Telefone removido de propósito.** O `profile.json` antigo tinha um número de celular; o usuário pediu explicitamente para não usar. Contatos oficiais: e-mail, LinkedIn e GitHub.

A foto antiga (`public/sony.png`, silhueta genérica herdada do portfólio velho) foi removida e substituída por `public/avatar.svg` — avatar geométrico com o monograma SM no gradiente do site. Para usar uma foto real: coloque o arquivo em `public/` e troque `profile.photo` em `content.ts`. O `<img>` do hero é `aspect-square object-cover`, então qualquer imagem quadrada encaixa.

## 3. Arquitetura

```
index.html                 página principal (SEO, JSON-LD, script anti-flash)
cv.html                    segunda página do build (currículo para impressão)
src/
  main.tsx                 bootstrap da página principal
  cv.tsx                   bootstrap do currículo
  App.tsx                  composição das seções + barra de progresso de scroll
  index.css                Tailwind v4, tokens de tema, classes .card/.gradient-text, aurora
  cv.css                   @page A4 e regras específicas de impressão
  data/content.ts          TODO o conteúdo (perfil, formação, idiomas, skills, projetos, experiências)
  lib/
    i18n.ts                tipos, dicionário de UI, contexto e hook useI18n
    I18nProvider.tsx       provider do idioma
    theme.ts               tipos, contexto e hook useTheme
    ThemeProvider.tsx      provider do tema (classe .dark e meta theme-color)
    motion.ts              variants compartilhados (staggerContainer / staggerItem)
    github.ts              busca, mescla e cacheia os repositórios da API do GitHub
    useProjects.ts         hook que entrega a lista de projetos (estática, depois API)
  components/
    Background.tsx         blobs aurora + grade, com parallax pelo scroll
    Navbar.tsx             menu fixo, seção ativa via IntersectionObserver, toggles de tema e idioma
    Hero.tsx               primeira dobra, stack rotativa, avatar flutuante, CTAs
    About.tsx  Skills.tsx  Projects.tsx  Experience.tsx  Contact.tsx  Footer.tsx
    Resume.tsx             currículo renderizado a partir do mesmo content.ts
    Section.tsx            casca padrão de seção (kicker + título + divisor)
    Reveal.tsx             wrapper de animação de entrada por scroll
    SkipLink.tsx           link "pular para o conteúdo" (aparece no foco)
    BrandIcons.tsx         SVGs de GitHub e LinkedIn
public/
  avatar.svg  favicon.svg  og.png  robots.txt  sitemap.xml
```

### Por que provider e hook ficam em arquivos separados

O oxlint (regra `react/only-export-components`) avisa quando um arquivo exporta componente e não-componente juntos, o que quebra o Fast Refresh. Por isso `i18n.ts` / `I18nProvider.tsx` e `theme.ts` / `ThemeProvider.tsx` são pares. Se for criar outro contexto, siga o mesmo padrão.

### Build multipágina

`vite.config.ts` declara duas entradas (`index.html` e `cv.html`) em `build.rollupOptions.input`. O Vite gera um chunk compartilhado com React e i18n, então a segunda página custa pouco. Para acrescentar outra: crie o HTML na raiz, um `src/<nome>.tsx` e adicione a entrada no config. Use `fileURLToPath(new URL(...))` — `__dirname` não existe no config em ESM.

## 4. Detalhes que já causaram problema

- **Tailwind v4 não tem arquivo de config.** Tema, cores e variantes ficam em `src/index.css` via `@theme` e `@custom-variant`. Não crie `tailwind.config.js`.
- **Dark mode por classe** depende de `@custom-variant dark (&:where(.dark, .dark *));` no CSS e da classe `dark` no `<html>`, aplicada pelo `ThemeProvider` e, antes da primeira pintura, pelo script inline do `index.html`.
- **Cores que mudam com o tema** (`text-muted`, `border-hair`, `bg-surface`) são declaradas em `@theme` apontando para variáveis CSS (`--color-muted: var(--muted)`), redefinidas em `:root` e `.dark`. Classes CSS soltas fora do `@theme` venciam variantes como `hover:` na cascata e travavam o hover.
- **Gradientes usam a sintaxe v4**: `bg-linear-to-r`, não `bg-gradient-to-r`.
- **lucide-react v1 removeu logos de marca** (GitHub, LinkedIn). Estão em `components/BrandIcons.tsx` como SVG inline. Não tente importar `Github`/`Linkedin` do lucide.
- **npm no Windows pode falhar com `ENOTEMPTY`** ao instalar `lucide-react` (milhares de arquivos pequenos, antivírus segura o diretório). Basta rodar o `npm install` de novo.
- `vite.config.ts` usa `base: './'` para o site funcionar em subpasta do GitHub Pages sem ajuste extra.
- **O script inline das páginas HTML repete as chaves do localStorage** (`portfolio:theme`, `portfolio:lang`). É o preço de não ter flash de tema: ele roda antes do React. Mudou as chaves em `theme.ts`/`i18n.ts`? Mude também em `index.html` e `cv.html`.

## 5. Como mexer no conteúdo

| O quê | Onde |
| --- | --- |
| Bio, cargo, localização, contatos | `profile` em `src/data/content.ts` |
| Formação e idiomas | `education`, `languages` |
| Skills técnicas e comportamentais | `skillGroups`, `softSkills` |
| Projetos (nome, descrição, tags, destaque) | `projects` |
| Repositórios que não devem aparecer | `hiddenRepos` |
| Experiências profissionais | `experiences` |
| Menu, botões, títulos de seção, currículo | `dictionary` em `src/lib/i18n.ts` |

Toda string de conteúdo é do tipo `Localized` (`{ pt, en }`). Se adicionar campo novo, preencha os dois idiomas — o TypeScript reclama se faltar um.

Os filtros da seção de projetos são gerados automaticamente a partir das `tags`; não existe lista de filtros para manter.

## 6. Projetos vindos da API do GitHub

`src/lib/github.ts` busca os repositórios públicos do usuário e mescla com a lista de `content.ts`:

- Descarta forks, arquivados e o que estiver em `hiddenRepos`.
- Só entra repositório que esteja na lista local ou tenha descrição no GitHub — evita repositório de exercício sem contexto aparecer no portfólio.
- Quando o repositório está na lista local, os dados locais mandam (nome, descrição PT/EN, tags, demo, destaque). Da API vêm sempre estrelas e data do último commit.
- Sem entrada local, o card usa a descrição do GitHub nos dois idiomas, a linguagem principal e os topics como tags.
- Demo: campo `homepage` do repositório ou, se tiver Pages ativo, a URL do GitHub Pages.
- Ordem: primeiro a ordem de `content.ts`, depois os novos por commit mais recente.
- Cache de 6h em `localStorage` (`portfolio:repos`), porque a API sem token permite 60 requisições por hora por IP.
- Qualquer erro (rate limit, offline) cai silenciosamente na lista estática — que é o estado inicial do hook, então a seção nunca fica vazia nem pisca.

Consequência prática: repositório novo com descrição aparece sozinho no site em até 6h. Se não ficar bom, coloque em `hiddenRepos` ou escreva uma entrada curada em `projects`.

O currículo usa só a lista estática — página de impressão não deve depender de rede.

## 7. Acessibilidade e contraste

- `MotionConfig reducedMotion` no `App` desliga as animações de transform do Motion quando o sistema pede menos movimento; o CSS já cortava animação e transição via media query.
- Skip link, `aria-current` no item ativo do menu, `aria-pressed` nos filtros, `aria-controls` e `aria-expanded` no botão do menu mobile, `aria-live` no feedback de copiado, `aria-label` na navegação.
- Menu mobile fecha com `Escape` e ao passar para largura de desktop — senão o `overflow: hidden` do body ficava preso.
- Contraste medido no tema claro (WCAG AA, texto pequeno a partir de 4.5:1). O que mudou por causa disso:
  - kickers e ícones passaram de `brand-500` (3.96:1) para `brand-600` (5.33:1);
  - ícones e links em `accent-500` (2.27:1) viraram `accent-700` no claro, mantendo `accent-500` no escuro;
  - botões e pílulas com texto branco usam `from-brand-600 to-accent-700` — o gradiente antigo terminava em `accent-500`, onde o branco dava 2.43:1;
  - tags de projeto usam `brand-700` sobre o fundo `brand-500/10`.
- Os tokens `--color-brand-700`, `--color-accent-600` e `--color-accent-700` existem só por causa disso.

## 8. Verificações feitas

- `npm run build` (tsc + vite) sem erros, gerando `index.html` e `cv.html`.
- `npm run lint` (oxlint) sem avisos.
- `npm run preview` conferido no Chrome: tema claro e escuro, PT e EN, largura de 390px, menu mobile abrindo e fechando por clique e por `Escape`, console limpo.
- Projetos vindos da API (11 cards, mesma ordem da lista local), cache gravado e regenerado depois de limpar o `localStorage`.
- Currículo conferido em tela; a impressão usa `@page` A4 com a barra de ações escondida.

## 9. Ideias para as próximas sessões

- Colocar o link do site no README de perfil (`SonyMainardi/sonymainardi`).
- Adicionar prints ou GIFs dos projetos nos cards — hoje os cards são só texto.
- Migrar as descrições de experiência para bullets com resultados mensuráveis (precisa de números que só o Sony tem).
- Trocar o avatar por uma foto real quando houver uma boa.
- Testar com leitor de tela de verdade (NVDA); hoje a checagem foi por marcação e contraste calculado.
- Se o portfólio crescer, gerar a lista de repositórios em build time (com token nas Actions) em vez de runtime.
