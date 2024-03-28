pnpm add --save-dev jest
pnpm add --save-dev @babel/preset-typescript

create babel.config.js xith
```
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
``` 

---------
remove all
---------

pnpm remove jest
pnpm remove @babel/preset-typescript
rm babel.config.js

from : https://kulshekhar.github.io/ts-jest/docs/getting-started/installation

pnpm add --save-dev jest typescript ts-jest @types/jest
pnpm dlx  ts-jest config:init

create jest.config.ts with
```
import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: 'ts-jest',
}

export default jestConfig
```


pnpm add -D ts-node