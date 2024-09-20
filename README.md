# andifes-isf.github.io

Este projeto utiliza o [**Astro**](https://astro.build/), um framework de desenvolvimento web escolhido pelo seu bom suporte a sites estáticos. Com o Astro, é possível criar páginas de forma eficiente e escalável, utilizando componentes modernos de diferentes frameworks como React, Vue, Svelte e outros. O objetivo principal é construir um site estático otimizado para desempenho e fácil de manter.

## Estrutura do Projeto

Dentro do projeto, você verá as seguintes pastas e arquivos:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

O Astro procura por arquivos `.astro` ou `.md` no diretório `src/pages/`. Cada página é exposta como uma rota baseada no nome do arquivo.

Não há nada de especial no `src/components/`, mas é onde gelramente coloca-se quaisquer componentes Astro/React/Vue/Svelte/Preact.

Quaisquer arquivos estáticos, como imagens, podem ser colocados no diretório `public/`.

## Comandos

Todos os comandos são executados a partir da raiz do projeto, em um terminal:

| Comando                   | Ação                                                           |
| :------------------------ | :------------------------------------------------------------- |
| `npm install`             | Instala as dependências                                        |
| `npm run dev`             | Inicia o servidor de desenvolvimento local em `localhost:4321` |
| `npm run build`           | Constrói o site de produção para `./dist/`                     |
| `npm run preview`         | Visualiza a build localmente, antes de implantar               |
| `npm run astro ...`       | Executa comandos da CLI como `astro add`, `astro check`        |
| `npm run astro -- --help` | Obtém ajuda para usar a CLI do Astro                           |
