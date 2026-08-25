# Central V-Taper

Camada de consulta e execução do programa V-Taper — Bloco 1.
O registro oficial continua no **Hevy** (superiores) e no **Stronger** (inferiores).

Stack: React 18 + Vite. Zero dependências de UI, zero API externa, zero imagem externa.

---

## Rodar localmente

Precisa de Node 18 ou superior.

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

---

## Publicar na Vercel

### Caminho A — pelo site (mais simples)

1. Suba esta pasta para um repositório no GitHub.
2. Entre em `vercel.com` → **Add New** → **Project** → **Import Git Repository**.
3. Selecione o repositório. A Vercel detecta Vite sozinha:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Clique em **Deploy**.

Não é preciso configurar variável de ambiente nenhuma.

### Caminho B — pelo terminal

```bash
npm i -g vercel
vercel login
vercel          # preview
vercel --prod   # produção
```

---

## Instalar no celular (PWA)

Depois do deploy, abra a URL no celular:

- **iPhone (Safari):** Compartilhar → *Adicionar à Tela de Início*
- **Android (Chrome):** menu ⋮ → *Instalar app*

Abre em tela cheia, sem barra do navegador — o modo que interessa dentro da academia.

---

## Onde ficam os dados

Checklists, registros de carga, recovery e sessões concluídas ficam no
`localStorage` do próprio aparelho (`src/storage.js`).

Consequências práticas:

- Os dados **não sincronizam** entre celular e computador.
- Limpar os dados do navegador apaga tudo.
- Isso é proposital: o registro que importa está no Hevy/Stronger.

Se um dia quiser sincronizar, o ponto de troca é só o `src/storage.js` —
a mesma interface (`get` / `set` / `delete` / `list`) pode apontar para
Vercel KV, Supabase ou Firebase sem tocar em mais nada do app.

---

## Estrutura

```
index.html
vite.config.js
public/
  icon.svg
  manifest.webmanifest
src/
  main.jsx       ponto de entrada
  storage.js     persistência (localStorage)
  App.jsx        app inteiro: programa, ilustrações, telas
```

`App.jsx` concentra tudo de propósito nesta primeira versão. Se for crescer,
o corte natural é: `data/program.js`, `data/exercises.js`, `figures/`,
`components/`, `views/`.

---

## Alterar o programa

Duas constantes no topo do `App.jsx`:

- `EX` — cada exercício com alvo, setup, execução, erros, cue e critério de progressão.
- `PROGRAM` — os 6 treinos, com séries, reps, RIR, descanso e prioridade.

Ilustrações: `T` (poses das figuras) e `FIGMAP` (exercício → template).

**Regra do bloco:** não trocar exercício sem motivo declarado.
Qualquer mudança entra como ANTES → DEPOIS → MOTIVO → IMPACTO ESPERADO.
