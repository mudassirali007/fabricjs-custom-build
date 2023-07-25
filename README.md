## Installation

Copied fabricjs 5.3.1 build from [Repo](https://github.com/fabricjs/fabric.js/releases/tag/v5.3.1) and then created a builld after running these commands. It will have all modules that are listed [here](http://fabricjs.com/build/) and [NPM](https://www.npmjs.com/package/fabric)

```bash
npm i
```

```bash
node build.js modules=ALL
```

## Usage in Node Project

```python
npm install --save-dev @types/fabric
```

package.json:

```bash
{
  "dependencies": {
    "fabricjs-custom-build": "github:mudassirali007/fabricjs-custom-build"
  }
}
```

```bash
import { fabric } from "fabricjs-custom-build";
```
