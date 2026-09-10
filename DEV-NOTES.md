# Notas de desenvolvimento

Arquivo de contexto para futuras sessões de trabalho neste projeto. O código não leva comentários — tudo que precisa de explicação mora aqui.

Última atualização: 2026-09-09.

---

## 1. Convenções do projeto

- **Sem comentários no código.** Explicações, decisões e pendências vão neste arquivo. Só é aceitável um comentário em código para algo realmente crítico e não óbvio.
- Componentes em `PascalCase.tsx`, um componente por arquivo, export nomeado (exceto `App.tsx`, que é default).
- Nada de texto fixo dentro de componente: conteúdo em `src/data/content.ts`, textos de interface em `src/lib/i18n.ts`.
- Idioma dos identificadores: inglês. Idioma do conteúdo: PT e EN, sempre os dois.

## 2. Origem dos dados pessoais

Os dados vieram de dois repositórios antigos (usados apenas como consulta, nada foi copiado de código):

- `github.com/SonyMainardi/sonymainardi` — README de perfil (bio, stack, contatos).
- `github.com/SonyMainardi/sony-portfolio` — portfólio antigo em HTML/CSS/JS; os dados estavam em `data/profile.json`.
- API pública do GitHub — lista de repositórios que virou a seção de projetos.

A foto `public/sony.png` foi reaproveitada de `assets/img/my-photo.png` do portfólio antigo.

**Telefone removido de propósito.** O `profile.json` antigo tinha um número de celular; o usuário pediu explicitamente para não usar. Contatos oficiais: e-mail, LinkedIn e GitHub.

## 3. Arquitetura

```
src/
  App.tsx                  composição das seções + barra de progresso de scroll
  main.tsx                 bootstrap do React
  index.css                Tailwind v4, tokens de tema, classes .card/.gradient-text, aurora
  data/content.ts          TODO o conteúdo (perfil, formação, idiomas, skills, projetos, experiências)
  lib/
    i18n.ts                tipos, dicionário de UI, contexto e hook useI18n
    I18nProvider.tsx       provider do idioma
    theme.ts               tipos, contexto e hook useTheme
    ThemeProvider.tsx      provider do tema
    motion.ts              variants compartilhados (staggerContainer / staggerItem)
  components/
    Background.tsx         blobs aurora + grade, com parallax pelo scroll
    Navbar.tsx             menu fixo, seção ativa via IntersectionObserver, toggles de tema e idioma
    Hero.tsx               primeira dobra, stack rotativa, foto flutuante
    About.tsx  Skills.tsx  Projects.tsx  Experience.tsx  Contact.tsx  Footer.tsx
    Section.tsx            casca padrão de seção (kicker + título + divisor)
    Reveal.tsx             wrapper de animação de entrada por scroll
    BrandIcons.tsx         SVGs de GitHub e LinkedIn
```

### Por que provider e hook ficam em arquivos separados

O oxlint (regra `react/only-export-components`) avisa quando um arquivo exporta componente e não-componente juntos, o que quebra o Fast Refresh. Por isso `i18n.ts` / `I18nProvider.tsx` e `theme.ts` / `ThemeProvider.tsx` são pares. Se for criar outro contexto, siga o mesmo padrão.

## 4. Detalhes que já causaram problema

- **Tailwind v4 não tem arquivo de config.** Tema, cores e variantes ficam em `src/index.css` via `@theme` e `@custom-variant`. Não crie `tailwind.config.js`.
- **Dark mode por classe** depende de `@custom-variant dark (&:where(.dark, .dark *));` no CSS e da classe `dark` no `<html>` (aplicada pelo `ThemeProvider`).
- **Cores que mudam com o tema** (`text-muted`, `border-hair`, `bg-surface`) são declaradas em `@theme` apontando para variáveis CSS (`--color-muted: var(--muted)`), que por sua vez são redefinidas em `:root` e `.dark`. Isso foi feito porque classes CSS soltas fora do `@theme` venciam variantes como `hover:` na cascata e travavam o hover.
- **Gradientes usam a sintaxe v4**: `bg-linear-to-r`, não `bg-gradient-to-r`.
- **lucide-react v1 removeu logos de marca** (GitHub, LinkedIn). Estão em `components/BrandIcons.tsx` como SVG inline. Não tente importar `Github`/`Linkedin` do lucide.
- **npm no Windows pode falhar com `ENOTEMPTY`** ao instalar `lucide-react` (milhares de arquivos pequenos, antivírus segura o diretório). Basta rodar o `npm install` de novo.
- `vite.config.ts` usa `base: './'` para o site funcionar em subpasta do GitHub Pages sem ajuste extra.

## 5. Como mexer no conteúdo

| O quê | Onde |
| --- | --- |
| Bio, cargo, localização, contatos | `profile` em `src/data/content.ts` |
| Formação e idiomas | `education`, `languages` |
| Skills técnicas e comportamentais | `skillGroups`, `softSkills` |
| Projetos (nome, descrição, tags, repo, demo) | `projects` |
| Experiências profissionais | `experiences` |
| Menu, botões, títulos de seção | `dictionary` em `src/lib/i18n.ts` |

Toda string de conteúdo é do tipo `Localized` (`{ pt, en }`). Se adicionar campo novo, preencha os dois idiomas — o TypeScript reclama se faltar um.

Os filtros da seção de projetos são gerados automaticamente a partir das `tags`; não existe lista de filtros para manter.

Projetos com `demo` só devem apontar para URLs que existem de verdade. Hoje só `rick-and-morty` tem GitHub Pages ativo (os outros repositórios com Pages são `economia-promo` e o portfólio antigo `sony-portfolio`).

## 6. Verificações feitas

- `npm run build` (tsc + vite) sem erros.
- `npm run lint` (oxlint) sem avisos.
- `npm run preview` respondendo 200 em `localhost:4173`.

## 7. Ideias para as próximas sessões

- Publicar no GitHub Pages e colocar o link no README e no README de perfil (`SonyMainardi/sonymainardi`).
- Buscar os repositórios direto da API do GitHub em vez da lista fixa em `content.ts` (com cache, para não estourar rate limit).
- Adicionar prints ou GIFs dos projetos nos cards — hoje os cards são só texto.
- Currículo em PDF para download no hero.
- Migrar as descrições de experiência para bullets com resultados mensuráveis.
- Testar com leitor de tela e revisar o contraste do tema claro.
