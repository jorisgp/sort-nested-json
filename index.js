const ASC = "asc"
const DESC = "desc"
const FIRST = "first"
const LAST = "last"
const TYPE_STRING = "string"
const TYPE_OBJECT = "object"
const TYPE_NUMBER = "number"

let sortWithMemory = (json) => {

    const { result, order_by, direction } = json

    if (order_by && direction === ASC || direction === DESC) {
        return {
            run: (orderBy) => {
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
            run: (orderBy) => {
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
        asc: (sortBy) => {
            return sortJSON(list, sortBy, ASC);
        },
        desc: (sortBy) => {
            return sortJSON(list, sortBy, DESC);
        },
    }
}

let sortNullsLast = (list) => {
    return {
        asc: (sortBy) => {
            return sortJSON(list, sortBy, ASC, LAST);
        },
        desc: (sortBy) => {
            return sortJSON(list, sortBy, DESC, LAST);
        },
    }
}

let sortNullsFirst = (list) => {
    return {
        asc: (sortBy) => {
            return sortJSON(list, sortBy, ASC, FIRST);
        },
        desc: (sortBy) => {
            return sortJSON(list, sortBy, DESC, FIRST);
        },
    }
}

let sortJSON = (list, key, order, nulls) => {

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

    let sortedArray = tempArray.sort((a, b) => {
        if (typeof a === TYPE_STRING) {
            return compareStrings(a.key, b.key, order, nulls)
        }
        else if (typeof a === TYPE_NUMBER || typeof a === TYPE_OBJECT) {
            return compareNumber(a.key, b.key, order, nulls)
        }
        return "";
    })

    let jsonNewArray = [];

    for (let i in sortedArray) {
        jsonNewArray.push(sortedArray[i].object)
    }
    return jsonNewArray
}

let compareStrings = (a, b, order, nulls) => {
    if (nulls != null && (a == null || b == null)) {
        return handleNulls(a, b, nulls)
    }
    a = a.toLowerCase();
    b = b.toLowerCase();

    if (order.toLowerCase() === ASC) {
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
    if (order.toLowerCase() === DESC) {
        return (b < a) ? -1 : (b > a) ? 1 : 0;
    }
}

let compareNumber = (a, b, order, nulls) => {
    if (nulls != null && (a == null || b == null)) {
        return handleNulls(a, b, nulls)
    }
    if (order.toLowerCase() === ASC) {
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
    if (order.toLowerCase() === DESC) {
        return (b < a) ? -1 : (b > a) ? 1 : 0;
    }
}

let handleNulls = (a, b, nulls) => {
    let result
    if (a == null && b != null) {
        result = 1
    }
    if (a != null && b == null) {
        result = -1
    }
    if (a == null && b == null) {
        result = 0;
    }

    if (nulls === LAST) {
        return result
    }
    if (nulls === FIRST) {
        return result * -1
    }
}

module.exports.sort = sort;
module.exports.sortWithMemory = sortWithMemory;
module.exports.sortNullsLast = sortNullsLast;
module.exports.sortNullsFirst = sortNullsFirst;