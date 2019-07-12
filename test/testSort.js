let assert = require("assert")
let snj = require("../index")

describe('Sorting', () => {
    describe('Sort JSON String', () => {
        let list = JSON.stringify([{ "id": 1, "city": "Amsterdam" },
        { "id": 2, "city": "Zaandam" },
        { "id": 3, "city": "Enkhuizen" }])

        console.log("list: " + list)

        it("sort array with objects descending", () => {

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

        it("sort array with JSON objects ascending", () => {

            let ascList = snj.sort(list).asc("city")
            ascList.forEach((place, index) => {
                console.log("city: " + place.city + " index: " + index)
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