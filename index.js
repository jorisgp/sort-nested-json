const ASC = "asc"
const DESC = "desc"

let sortWithMemory = function (json) {

    const { result, order_by, direction } = json

    if (order_by && direction === ASC || direction === DESC) {
        return {
            run: function asc(orderBy) {
                let newdirection = ASC
                if (order_by === orderBy && direction === ASC) {
                    newdirection = DESC
                }
                let resultwithmemory = {
                    result: sortJSON(result, orderBy, newdirection),
                    order_by: orderBy,
                    direction: newdirection
                }
                return resultwithmemory;
            },
        }
    } else {
        return {
            run: function asc(orderBy) {
                let newdirection = ASC
                let resultwithmemory = {
                    result: sortJSON(json, orderBy, newdirection),
                    order_by: orderBy,
                    direction: newdirection
                }
                return resultwithmemory;
            },
        }
    }
}

let sort = (list) => {



    return {
        asc: function asc(sortBy) {
            return sortJSON(list, sortBy, ASC);
        },
        desc: function desc(sortBy) {
            return sortJSON(list, sortBy, DESC);
        },
    }
}

let sortJSON = (list, key, order) => {

    try {
        list = JSON.parse(list)
    } catch (e) {
        list = list
    }

    let tempArray = []

    for (let item of list) {
        let object = item
        let objectKey = ""

        let keys = key.split(".");
        for (let keyItem of keys) {
            item = item[keyItem]
            objectKey = item
        }
        tempArray.push({ key: objectKey, object: object })
    }

    let sortedArray = tempArray.sort(function (a, b) {
        if (typeof a === 'string') {
            return compareStrings(a.key, b.key, order)
        }
        else if (typeof a === 'number' || typeof a === 'object') {
            return compareNumber(a.key, b.key, order)
        }
        return "";
    })

    let jsonNewArray = [];

    for (let i in sortedArray) {
        jsonNewArray.push(sortedArray[i].object)
    }
    return jsonNewArray
}

function compareStrings(a, b, order) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    if (order.toLowerCase() === ASC) {
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
    if (order.toLowerCase() === DESC) {
        return (b < a) ? -1 : (b > a) ? 1 : 0;
    }
}

function compareNumber(a, b, order) {
    if (order.toLowerCase() === ASC) {
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
    if (order.toLowerCase() === DESC) {
        return (b < a) ? -1 : (b > a) ? 1 : 0;
    }
}

module.exports.sort = sort;
module.exports.sortWithMemory = sortWithMemory;