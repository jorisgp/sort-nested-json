var sort = function (json) {
    return {
        asc: function asc(sortBy) {
            return sortJSON(json, sortBy, "asc");
        },
        desc: function desc(sortBy) {
            return sortJSON(json, sortBy, "desc");
        },
    }
}

var sortJSON = function (jsonArray, key, order) {

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

    if (order.toLowerCase() === 'asc') {
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
    if (order.toLowerCase() === 'desc') {
        return (b < a) ? -1 : (b > a) ? 1 : 0;
    }
}

function compareNumber(a, b, order) {
    if (order.toLowerCase() === 'asc') {
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
    if (order.toLowerCase() === 'desc') {
        return (b < a) ? -1 : (b > a) ? 1 : 0;
    }
}

module.exports.sort = sort;