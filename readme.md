# sort-nested-json

You can use sort-nested-json to sort an json array.


## Install

```shell
npm install --save sort-nested-json
```

## Usage

Here is an basic example of using sort-nested-json.

```js

import sorter from 'sort-nested-json';

let list = [{  
                id: 1,
                firstname: "John",
                lastname: "Smith"
            },
            {  
                id: 2,
                firstname: "Jane",
                lastname: "Wilson"
            },
            {  
                id: 3,
                firstname: "Peter",
                lastname: "Brown"
            }]

list = sorter.sort(list).desc("firstname")

console.log(list)

list = sorter.sort(list).asc("firstname")

console.log(list)

```

Here is an  example of using sort-nested-json with a nested sort.

```js

import sorter from 'sort-nested-json';

let list = [{  
                id: 1,
                details:{
                    firstname: "John",
                    lastname: "Smith"
                } 
            },
            {  
                id: 2,
                details:{                
                    firstname: "Jane",
                    lastname: "Wilson"
                }
            },
            {  
                id: 3,
                details:{                
                    firstname: "Peter",
                    lastname: "Brown"
                }
            }]

list = sorter.sort(list).desc("id")

console.log(list)            

list = sorter.sort(list).desc("details.firstname")

console.log(list)

list = sorter.sort(list).asc("details.firstname")

console.log(list)

```

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://npmjs.org/package/live-xxx
[travis-image]: https://img.shields.io/travis/live-js/live-xxx/master.svg
[travis-url]: https://travis-ci.org/live-js/live-xxx
[coveralls-image]: https://img.shields.io/coveralls/live-js/live-xxx/master.svg
[coveralls-url]: https://coveralls.io/r/live-js/live-xxx?branch=master