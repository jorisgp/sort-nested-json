const ASC = "asc"
const DESC = "desc"

var sortWithMemory = function (json) {

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

var sort = (json) => {
    return {
        asc: function asc(sortBy) {
            return sortJSON(json, sortBy, ASC);
        },
        desc: function desc(sortBy) {
            return sortJSON(json, sortBy, DESC);
        },
    }
}

var sortJSON = (jsonArray, key, order) => {

    var tempArray = []

    for (var item of jsonArray) {
        var object = item
        var objectKey = ""

        var keys = key.split(".");
        for (var keyItem of keys) {
            item = item[keyItem]
            objectKey = item
        }
        tempArray.push({ key: objectKey, object: object })
    }

    var sortedArray = tempArray.sort(function (a, b) {
        if (typeof a === 'string') {
            return compareStrings(a.key, b.key, order)
        }
        else if (typeof a === 'number' || typeof a === 'object') {
            return compareNumber(a.key, b.key, order)
        }
        return "";
    })

    var jsonNewArray = [];

    for (var i in sortedArray) {
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