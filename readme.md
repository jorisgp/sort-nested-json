# sort-nested-json

You can use sort-nested-json to sort an array containing JavaScript Objects or a JSON String (containing an array).

## Install

```shell
npm install --save sort-nested-json
```

## Usage

Here is an basic example of using sort-nested-json on an array filled with objects.

```js

import sorter from 'sort-nested-json';

let list = [{  
                "id": 1,
                "firstname": "John",
                "lastname": "Smith"
            },
            {  
                "id": 2,
                "firstname": "Jane",
                "lastname": "Wilson"
            },
            {  
                "id": 3,
                "firstname": "Peter",
                "lastname": "Brown"
            }]

list = sorter.sort(list).desc("firstname")

console.log(list)

list = sorter.sort(list).asc("firstname")

console.log(list)

```

Here is an  example of using sort-nested-json on array filled with objects, the sort is executed on a nested value.

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

Here is an  example of using sort-nested-json within a React Component. The sortWithMemory function returns the previous sort settings with the result. If you provide this result with your second sort request, it will automatically switch between ascending (ASC) and descending (DESC) when your sort request is on the same column. 

```js

import React, { Component } from "react";
import sorter from "sort-nested-json"

export default class SortExampleComponent extends Component {

    state = {
        sortresult: null
    }

    componentDidMount() {
        const sortresult = sorter.sortWithMemory(exampleList).run("id")
        this.setState({ sortresult })
    }

    sort(orderby) {
        let { sortresult } = this.state
        sortresult = sorter.sortWithMemory(sortresult).run(orderby)
        this.setState({ sortresult })
    }


    render() {

        const { sortresult } = this.state

        return (
            <div>
                <h1>ExampleTable</h1>
                <table>
                    <thead>
                        <tr>
                            <th style={style.th} onClick={() => this.sort("id")}>id</th>
                            <th style={style.th} onClick={() => this.sort("details.firstname")}>first name</th>
                            <th style={style.th} onClick={() => this.sort("details.lastname")}> last name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortresult && sortresult.result.map(person =>
                            (<tr>
                                <td style={style.td} >{person.id}</td>
                                <td style={style.td} >{person.details.firstname}</td>
                                <td style={style.td} >{person.details.lastname}</td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const exampleList = [{
    id: 1,
    details: {
        firstname: "John",
        lastname: "Smith"
    }
},
{
    id: 2,
    details: {
        firstname: "Jane",
        lastname: "Wilson"
    }
},
{
    id: 3,
    details: {
        firstname: "Peter",
        lastname: "Brown"
    }
}]

const style = {
    th: {
        cursor: "pointer",
        width: 200,
        border: "1px solid black",
    },
    td: {
        width: 200,
        border: "1px solid #d7d7d7"
    }
}
```

If you sort on a column which also contains nulls, the functions sortNullsFirst() and sortNullsLast functions has been added. They work simular as the sort function.


## License

[MIT](https://sort-nested-json.mit-license.org/)

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://npmjs.org/package/live-xxx
[travis-image]: https://img.shields.io/travis/live-js/live-xxx/master.svg
[travis-url]: https://travis-ci.org/live-js/live-xxx
[coveralls-image]: https://img.shields.io/coveralls/live-js/live-xxx/master.svg
[coveralls-url]: https://coveralls.io/r/live-js/live-xxx?branch=master