# Vinícius Iandoli — Portfólio Pessoal

> Landing page de portfólio profissional com tema dark/light, animações e design futurista.

---

## Visão Geral

Site de portfólio pessoal desenvolvido do zero com **HTML5, CSS3 e JavaScript Vanilla** — sem frameworks, sem dependências, pronto para deploy em qualquer plataforma estática.

O projeto apresenta minha trajetória como desenvolvedor Full Stack, meus projetos entregues, habilidades técnicas e canais de contato, com foco total em performance e UX.

---

## Funcionalidades

- **Tema Dark / Light** — toggle com persistência via `localStorage`
- **Typing Effect** — animação de digitação no hero com múltiplas roles
- **Scroll Reveal** — elementos entram suavemente conforme o scroll com `IntersectionObserver`
- **Menu mobile responsivo** — hamburger com `aria-expanded` para acessibilidade
- **Botão WhatsApp flutuante** — acesso rápido com mensagem pré-preenchida
- **Grid de projetos** — cards com imagem, tags e link de deploy
- **Grid de habilidades** — ícones SVG das tecnologias com hover animado
- **Seção de diferenciais** — cards explicativos com ícones e textos estratégicos

---

## Estrutura do Projeto

```
portfolio/
├── index.html          # HTML principal (tudo inline para deploy simples)
├── style.css           # Estilos separados (opcional)
├── assets/
│   ├── logo.png        # Logo "V" com fundo transparente
│   └── foto minha.png  # Foto com fundo removido (PNG transparente)
└── README.md
```

---

## Stack Técnica

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica |
| CSS3 | Custom Properties, Grid, Flexbox, animações |
| JavaScript Vanilla | Toggle de tema, typing effect, scroll reveal |
| Google Fonts | Syne (títulos) + DM Sans (corpo) |
| devicons CDN | Ícones SVG das tecnologias |

---

## Design System

```css
/* Cores principais */
--cyan:   #00d2ff   /* Ciano neon */
--purple: #a855f7   /* Roxo/Magenta */

/* Gradiente de destaque */
--grad: linear-gradient(135deg, #00d2ff, #a855f7)

/* Tipografia */
--ft: 'Syne'     /* Títulos — peso 700/800 */
--fb: 'DM Sans'  /* Corpo — peso 300/400/500/600 */
```

**Dois temas completos** controlados por `data-theme="dark|light"` no `<html>`, com 14 variáveis CSS que mudam automaticamente tudo: backgrounds, bordas, textos, cards e filtros da foto.

---

## Projetos no Portfólio

| Projeto | Tipo | Stack | Status |
|---|---|---|---|
| **Kryour** | Link na Bio | HTML, CSS, JS | [Live](https://kryour.vercel.app/) |
| **Harmonie Clinic** | Sistema CRM | Next.js, TypeScript, Prisma, PostgreSQL | Privado |
| **Apex Fitness Bot** | IA & Automação | Node.js, WhatsApp API, OpenAI | [Demo](https://viniciusiandoli7.github.io/bot-demo/) |
| **Lumina** | Site Institucional | React, TypeScript | [Live](https://viniciusiandoli7.github.io/lumina-site-institucional/) |

---

## Como Fazer Deploy

### Vercel (recomendado — grátis)
1. Acesse [vercel.com](https://vercel.com) e crie uma conta
2. Clique em **"Add New Project"**
3. Arraste a pasta do projeto ou conecte ao GitHub
4. Deploy automático com HTTPS e CDN global

### Netlify
1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta para a área de drop
3. URL gerada instantaneamente

### GitHub Pages
1. Crie um repositório público no GitHub
2. Suba os arquivos
3. Em **Settings → Pages**, selecione `main branch`
4. Acesse em `https://seuusuario.github.io/nome-do-repo`

---

## Responsividade

O site é totalmente responsivo com breakpoints:

| Breakpoint | Layout |
|---|---|
| `> 900px` | Desktop — hero 2 colunas, skills 6 colunas |
| `≤ 900px` | Tablet — hero 1 coluna, skills 4 colunas |
| `≤ 720px` | Mobile — projetos 1 coluna, skills 3 colunas |
| `≤ 480px` | Small — skills 2 colunas, botões full width |
| `≤ 360px` | Extra small — ajustes de padding e tipografia |

---

## Contato

- **WhatsApp** — [(11) 94367-2342](https://wa.me/5511943672342)
- **E-mail** — [viniciusiandoli7@gmail.com](mailto:viniciusiandoli7@gmail.com)
- **LinkedIn** — [vinicius-iandoli-diogo](https://www.linkedin.com/in/vinicius-iandoli-diogo/)
- **GitHub** — [viniciusiandoli7](https://github.com/viniciusiandoli7)
- **Instagram** — [@vini_iandoli](https://www.instagram.com/vini_iandoli/)

---

© 2025 Vinícius Iandoli Diogo