import type { Localized } from '../lib/i18n'

export const profile = {
  name: 'Sony Mainardi',
  photo: './avatar.jpg',
  location: { pt: 'Brasília, DF — Brasil', en: 'Brasília, DF — Brazil' } satisfies Localized,
  role: {
    pt: 'Desenvolvedor Full Stack',
    en: 'Full Stack Developer',
  } satisfies Localized,
  headline: {
    pt: 'Construo aplicações web do front ao back — com foco em JavaScript, TypeScript, React e Node.js.',
    en: 'I build web applications end to end — focused on JavaScript, TypeScript, React and Node.js.',
  } satisfies Localized,
  email: 'sonylethor@gmail.com',
  username: 'SonyMainardi',
  github: 'https://github.com/SonyMainardi',
  website: 'https://sonymainardi.github.io',
  linkedin: 'https://www.linkedin.com/in/sonymainardi/',
  bio: [
    {
      pt: 'Sou desenvolvedor full stack em Brasília, formado em Sistemas de Informação. Atualmente trabalho pela Digisystem no contrato da Câmara dos Deputados, onde desenvolvo projetos internos para o meu setor: ferramentas que resolvem problemas do dia a dia e melhoram a rotina da equipe.',
      en: 'I am a full stack developer based in Brasília with a degree in Information Systems. I currently work for Digisystem under the Brazilian Chamber of Deputies contract, building internal tools for my team: software that solves everyday problems and improves the team routine.',
    },
    {
      pt: 'Meu dia a dia mistura desenvolvimento e operação: além de codar, atuo no monitoramento do Data Center e dos serviços críticos. Fora do trabalho, estudo continuamente e construo projetos próprios para experimentar novas tecnologias.',
      en: 'My routine mixes development and operations: besides coding, I help monitor the Data Center and its critical services. Outside work I keep studying and building side projects to experiment with new technologies.',
    },
  ] satisfies Localized[],
} as const

export const education: { title: Localized; detail: Localized }[] = [
  {
    title: {
      pt: 'Desenvolvimento em Aplicações Web',
      en: 'Web Application Development',
    },
    detail: {
      pt: 'Pós-graduação Lato Sensu — Faculdade Iguaçu · jun 2025 — out 2025',
      en: 'Postgraduate specialization — Faculdade Iguaçu · Jun 2025 — Oct 2025',
    },
  },
  {
    title: { pt: 'Sistemas de Informação', en: 'Information Systems' },
    detail: {
      pt: 'Bacharelado — Faculdade Anhanguera FACNET · 2009 — 2014',
      en: 'Bachelor degree — Faculdade Anhanguera FACNET · 2009 — 2014',
    },
  },
  {
    title: { pt: 'Técnico em Informática', en: 'IT Technician' },
    detail: { pt: 'Curso técnico', en: 'Technical course' },
  },
  {
    title: {
      pt: 'Montagem e Manutenção de Computadores',
      en: 'Computer Assembly and Maintenance',
    },
    detail: { pt: 'Curso técnico', en: 'Technical course' },
  },
]

export const languages: { name: Localized; level: Localized; value: number }[] = [
  {
    name: { pt: 'Português', en: 'Portuguese' },
    level: { pt: 'Nativo', en: 'Native' },
    value: 100,
  },
  {
    name: { pt: 'Inglês', en: 'English' },
    level: { pt: 'Básico', en: 'Basic' },
    value: 35,
  },
]

export type SkillGroup = {
  title: Localized
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: { pt: 'Front-end', en: 'Front-end' },
    items: ['JavaScript', 'TypeScript', 'React', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    title: { pt: 'Back-end', en: 'Back-end' },
    items: ['Node.js', 'MySQL', 'Apache', 'REST APIs'],
  },
  {
    title: { pt: 'Infra & Ferramentas', en: 'Infra & Tools' },
    items: ['Git', 'GitHub', 'Linux Ubuntu', 'Nagios', 'VS Code', 'Notion'],
  },
]

export const softSkills: Localized[] = [
  { pt: 'Empatia', en: 'Empathy' },
  { pt: 'Comprometimento com resultados', en: 'Commitment to results' },
  { pt: 'Trabalho em equipe', en: 'Teamwork' },
  { pt: 'Flexibilidade', en: 'Flexibility' },
  { pt: 'Organização', en: 'Organization' },
]

export type Project = {
  slug: string
  name: string
  description: Localized
  tags: string[]
  demo?: string
  featured?: boolean
  stars?: number
  updatedAt?: string
}

export const repoUrl = (slug: string) => `${profile.github}/${slug}`

export const projects: Project[] = [
  {
    name: 'Consulta Carros',
    description: {
      pt: 'Aplicação em JavaScript para consulta de dados de veículos, com busca e exibição dinâmica dos resultados.',
      en: 'JavaScript app to look up vehicle data, with search and dynamic rendering of the results.',
    },
    tags: ['JavaScript', 'API'],
    slug: 'consulta-carros',
    featured: true,
  },
  {
    name: 'Pokédex',
    description: {
      pt: 'Pokédex consumindo a PokeAPI com paginação, cards por tipo e layout responsivo em HTML, CSS e JavaScript puro.',
      en: 'Pokédex consuming the PokeAPI with pagination, type-based cards and a responsive layout in vanilla HTML, CSS and JavaScript.',
    },
    tags: ['JavaScript', 'API', 'CSS'],
    slug: 'pokedex',
    featured: true,
  },
  {
    name: 'Rick and Morty',
    description: {
      pt: 'Consumo da API de Rick and Morty listando personagens com filtros e detalhes, feito com HTML, CSS e JavaScript.',
      en: 'Rick and Morty API client listing characters with filters and details, built with HTML, CSS and JavaScript.',
    },
    tags: ['JavaScript', 'API'],
    slug: 'rick-and-morty',
    demo: 'https://sonymainardi.github.io/rick-and-morty/',
    featured: true,
  },
  {
    name: 'API GitHub',
    description: {
      pt: 'App em React que consome a API do GitHub e exibe perfil e repositórios de qualquer usuário.',
      en: 'React app that consumes the GitHub API and displays any user profile and repositories.',
    },
    tags: ['React', 'API'],
    slug: 'api-github',
    featured: true,
  },
  {
    name: 'Portal DIO',
    description: {
      pt: 'Recriação do portal da DIO com autenticação de login e senha usando React Hook Form e validações.',
      en: 'Rebuild of the DIO portal with login authentication using React Hook Form and validation.',
    },
    tags: ['React'],
    slug: 'portal-dio',
  },
  {
    name: 'Blog Next.js',
    description: {
      pt: 'Blog construído com Next.js como desafio de projeto, com rotas de posts e renderização de conteúdo.',
      en: 'Blog built with Next.js as a challenge project, with post routes and content rendering.',
    },
    tags: ['React', 'Next.js'],
    slug: 'blog-nextjs',
  },
  {
    name: 'Login & Senha',
    description: {
      pt: 'Validação de login e senha escrita em TypeScript, explorando tipagem e regras de negócio no front.',
      en: 'Login and password validation written in TypeScript, exploring typing and front-end business rules.',
    },
    tags: ['TypeScript'],
    slug: 'login-senha',
  },
  {
    name: 'Calculadora',
    description: {
      pt: 'Calculadora em React com componentes reutilizáveis e controle de estado das operações.',
      en: 'React calculator with reusable components and state control over the operations.',
    },
    tags: ['React'],
    slug: 'calculadora',
  },
  {
    name: 'Mario Kart',
    description: {
      pt: 'Simulador de corridas do Mario Kart em Node.js, com lógica de blocos, dados e pontuação por rodada.',
      en: 'Mario Kart race simulator in Node.js, with block logic, dice rolls and per-round scoring.',
    },
    tags: ['Node.js'],
    slug: 'Mario-Kart',
  },
  {
    name: 'Script Linux',
    description: {
      pt: 'Script shell para automatizar criação de usuários, grupos e permissões em servidores Linux.',
      en: 'Shell script that automates user, group and permission creation on Linux servers.',
    },
    tags: ['Linux'],
    slug: 'script-linux',
  },
  {
    name: 'Santander Dev Week API',
    description: {
      pt: 'API REST em Java desenvolvida durante a Santander Dev Week, com modelagem de domínio bancário.',
      en: 'Java REST API built during Santander Dev Week, modeling a banking domain.',
    },
    tags: ['Java'],
    slug: 'santander-dev-week-2023-api',
  },
]

export const hiddenRepos: string[] = [
  'sonymainardi',
  'sonymainardi.github.io',
  'sony-portfolio',
  'economia-promo',
  'projeto-iphone',
  'projeto-spring',
  'desafio-conta-bancaria',
  'dio-trilha-java-basico',
  'dio-lab-open-source',
]

export type Experience = {
  role: Localized
  company: Localized
  period: Localized
  current?: boolean
  promoted?: boolean
  description: Localized
  stack: string[]
}

export const experiences: Experience[] = [
  {
    role: { pt: 'Desenvolvedor Full Stack', en: 'Full Stack Developer' },
    company: {
      pt: 'Digisystem — contrato Câmara dos Deputados',
      en: 'Digisystem — Chamber of Deputies contract',
    },
    period: { pt: '2023 — atualmente', en: '2023 — present' },
    current: true,
    description: {
      pt: 'Desenvolvimento de projetos internos para o setor, criando ferramentas que resolvem problemas do dia a dia e melhoram a qualidade de vida da equipe. Trabalho com JavaScript, React, Node.js, MySQL e Apache em ambiente Linux.',
      en: 'Development of internal projects for the team, creating tools that solve everyday problems and improve the team routine. I work with JavaScript, React, Node.js, MySQL and Apache on Linux.',
    },
    stack: ['JavaScript', 'React', 'Node.js', 'MySQL', 'Apache'],
  },
  {
    role: { pt: 'Técnico de Apoio a Operações', en: 'Operations Support Technician' },
    company: { pt: 'Câmara dos Deputados', en: 'Chamber of Deputies' },
    period: { pt: 'dez 2023 — fev 2024', en: 'Dec 2023 — Feb 2024' },
    promoted: true,
    description: {
      pt: 'Monitoramento do Data Center da Câmara e de seus serviços críticos, utilizando principalmente a ferramenta Nagios, com acompanhamento de alertas e apoio na resposta a incidentes.',
      en: 'Monitoring of the Chamber Data Center and its critical services, mainly with Nagios, tracking alerts and supporting incident response.',
    },
    stack: ['Nagios', 'Linux', 'Data Center'],
  },
  {
    role: { pt: 'Desenvolvedor Freelancer', en: 'Freelance Developer' },
    company: { pt: 'Projetos próprios', en: 'Personal projects' },
    period: { pt: '2023 — atualmente', en: '2023 — present' },
    description: {
      pt: 'Estudo contínuo e desenvolvimento de projetos pessoais para aprofundar linguagens e ferramentas como JavaScript, TypeScript e React.',
      en: 'Continuous study and personal projects to deepen my knowledge of languages and tools such as JavaScript, TypeScript and React.',
    },
    stack: ['TypeScript', 'React'],
  },
]
