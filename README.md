# Fundamentos — Agente de Diagnóstico Inicial

Agente conversacional do Módulo 0 do Método Fundamentos.
Coleta o diagnóstico inicial do cliente antes da sessão de onboarding.

## Estrutura do projeto

```
fundamentos-diagnostico/
├── public/
│   └── index.html          # Interface do agente
├── netlify/
│   └── functions/
│       └── claude.js       # Proxy seguro para a API
├── netlify.toml            # Configuração da Netlify
└── README.md
```

## Deploy na Netlify

### 1. Suba este projeto no GitHub
- Crie um repositório novo no GitHub chamado `fundamentos-diagnostico`
- Suba todos os arquivos desta pasta

### 2. Conecte ao Netlify
- Acesse app.netlify.com
- Clique em "Add new site" → "Import an existing project"
- Conecte sua conta GitHub e selecione o repositório

### 3. Configure a variável de ambiente
- No painel do site na Netlify, vá em Site settings → Environment variables
- Clique em "Add a variable"
- Nome: `ANTHROPIC_API_KEY`
- Valor: sua chave que começa com `sk-ant-...`
- Salve

### 4. Faça o deploy
- Clique em "Deploy site"
- Em 1-2 minutos o site estará no ar com uma URL como `https://seu-site.netlify.app`

### 5. Domínio personalizado (opcional)
- Em Domain settings você pode adicionar um domínio próprio
- Ex: `diagnostico.seumétodo.com.br`
