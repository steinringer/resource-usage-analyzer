# Resource Usage Analyzer
Finds all resources used in *.js files in a Portego solution

## Install
```sh
npm install --save @steinringer/resource-usage-analyzer
```
or
```sh
yarn add @steinringer/resource-usage-analyzer
```

## Usage
```js
const resourceUsageAnalyzer = require('@steinringer/resource-usage-analyzer');

resourceUsageAnalyzer({ 
    rootDir : 'c:/_dev/portego2_dev'
 })
    .then(({
        resources,
        errors
    }) => {
        console.log(resources);
        console.error(errors);
    });
```

### settings
- `rootDir` : root directory where to search for files
- `fileGlobs` : [optional] array of globs that defines files to be included
- `ignoreGlobs` : [optional] array of globs that defines files to be excluded. 
- `outFile` : [optional] file where should be list saved. 

defaults : 
``` js
{
    fileGlobs: [
        '**/*.js'
    ],
    ignoreGlobs: [
        '**/*.test.js',
        '**/*.spec.js',
        '**/*.mock.js',
        '**/node_modules/**',
        '**/localizationProviderTemplate.js',
        '**/packageDataProviderTemplate.js',
    ],
}
```

### return value
function returns promise, that resolves to object with:
- `resources` : list of resources
- `errors` : list of all errors that has occurred during analysis