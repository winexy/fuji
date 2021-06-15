[![version](https://badgen.net/npm/v/@winexy/fuji?color=blue)](https://www.npmjs.com/package/@winexy/fuji)
![types](https://badgen.net/npm/types/tslib?color=green)
![minified](https://badgen.net/bundlephobia/min/@winexy/fuji)
![minified + gzip](https://badgen.net/bundlephobia/minzip/@winexy/fuji)
![dependencies](https://badgen.net/bundlephobia/dependency-count/@winexy/fuji)
![tree-shaking](https://badgen.net/bundlephobia/tree-shaking/@winexy/fuji)

# 🗻 fuji

> Schema validation utility library

## Example

```ts
import { f, run, string, int, required, oneOf, pattern } from '@winexy/fuji'
import type { Infer } from '@winexy/fuji'

const urlRegex = /.../

const schema = f.shape({
  name: f(string(), required()),
  version: f(pattern(/\d+\.\d+.\d+/)),
  workspaces: f.array(f(string())),
  repository: f.shape({
    type: f(string(), required(), oneOf(['git', 'vcs'])),
    url: f(string(), pattern(urlRegex))
  })
})

type PackageType = Infer<typeof schema>
/*
{
  name: string,
  version?: string,
  workspaces?: string[],
  repository?: {
    type: string,
    url?: string
  }
}
*/


const result = run(schema, {
  name: '@winexy/fuji',
  version: '0.0.0',
  repository: {
    type: 'git',
    url: 'https://github.com/winexy/fuji'
  }
})

if (result.invalid) {
  result.errors // Array<VError>
  result.value // null
} else {
  result.errors // null
  result.value // same as PackageType
}
```

## Troubleshooting

### `Infer<typeof schema>` infers `any`

Set strict mode to true in your **tsconfig.json**

```json
"strict": true
```