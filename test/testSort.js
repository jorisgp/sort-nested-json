let assert = require("assert")
let snj = require("../index")

describe('Sorting', () => {
    describe('Sort JSON String', () => {
        let jsonString = '[{"id":1,"city":"Amsterdam"},{"id":2,"city":"Zaandam"},{"id":3,"city":"Enkhuizen"},{"id":3}]'

        it("sort JSON string containing an Array descending", () => {

            let ascList = snj.sort(jsonString).desc("city")
            ascList.forEach((place, index) => {
                console.log("city: " + place.city)
                if (index === 0) {
                    assert.equal(place.city, "Zaandam");
                }
                if (index === 1) {
                    assert.equal(place.city, "Enkhuizen");
                }
                if (index === 2) {
                    assert.equal(place.city, "Amsterdam");
                }
                if (index === 3) {
                    assert.equal(place.city, null);
                }
            })

        });

        it("sort JSON string containing an Array ascending", () => {

            let ascList = snj.sort(jsonString).asc("city")
            ascList.forEach((place, index) => {
                console.log("city: " + place.city)
                if (index === 0) {
                    assert.equal(place.city, "Amsterdam");
                }
                if (index === 1) {
                    assert.equal(place.city, "Enkhuizen");
                }
                if (index === 2) {
                    assert.equal(place.city, "Zaandam");
                }
            })
        });

        it("sort JSON string containing an Array descending, nulls at the end", () => {

            let ascList = snj.sortNullsLast(jsonString).desc("city")
            ascList.forEach((place, index) => {
                console.log("city: " + place.city)
                if (index === 0) {
                    assert.equal(place.city, "Zaandam");
                }
                if (index === 1) {
                    assert.equal(place.city, "Enkhuizen");
                }
                if (index === 2) {
                    assert.equal(place.city, "Amsterdam");
                }
                if (index === 3) {
                    assert.equal(place.city, null);
                }
            })

        });

        it("sort JSON string containing an Array descending, nulls at the start", () => {

            let ascList = snj.sortNullsFirst(jsonString).desc("city")
            ascList.forEach((place, index) => {
                console.log("city: " + place.city)
                if (index === 0) {
                    assert.equal(place.city, null);
                }
                if (index === 1) {
                    assert.equal(place.city, "Zaandam");
                }
                if (index === 2) {
                    assert.equal(place.city, "Enkhuizen");
                }
                if (index === 3) {
                    assert.equal(place.city, "Amsterdam");
                }
            })
        });
    });

    describe('Sort JavaScript objects', () => {
        let list = []

        let amsterdam = new Object();
        amsterdam.id = 1;
        amsterdam.city = "Amsterdam";

        let enkhuizen = new Object();
        enkhuizen.id = 2;
        enkhuizen.city = "Enkhuizen";

        let zaandam = new Object();
        zaandam.id = 3;
        zaandam.city = "Zaandam";

        list.push(amsterdam)
        list.push(enkhuizen)
        list.push(zaandam)

        it("sort array with JavaScript objects descending", () => {

            let ascList = snj.sort(list).desc("city")
            ascList.forEach((place, index) => {
                console.log("city: " + place.city)
                if (index === 0) {
                    assert.equal(place.city, "Zaandam");
                }
                if (index === 1) {
                    assert.equal(place.city, "Enkhuizen");
                }
                if (index === 2) {
                    assert.equal(place.city, "Amsterdam");
                }
            })

        });

        it("sort array with JavaScript objects ascending", () => {

            let ascList = snj.sort(list).asc("city")
            ascList.forEach((place, index) => {
                console.log("city: " + place.city)
                if (index === 0) {
                    assert.equal(place.city, "Amsterdam");
                }
                if (index === 1) {
                    assert.equal(place.city, "Enkhuizen");
                }
                if (index === 2) {
                    assert.equal(place.city, "Zaandam");
                }
            })
        });


    });



});