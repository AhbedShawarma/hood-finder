var config = {
    apiKey: "AIzaSyB3sEKhsM8UbchaFKntM_LP0aj7itS4F_g",
    authDomain: "neighbourhood-finder.firebaseapp.com",
    databaseURL: "https://neighbourhood-finder.firebaseio.com",
    projectId: "neighbourhood-finder",
    storageBucket: "neighbourhood-finder.appspot.com",
    messagingSenderId: "330512561813"
};
firebase.initializeApp(config);
var database = firebase.database();

var platform = new H.service.Platform({
    'app_id': 'xGmQiK6gdcySbGHGzc1F',
    'app_code': 'HWnoi_5vJyFMRKc4OjgYLw'
});

var links = ['https://opendata.arcgis.com/datasets/4f1b554e743b423f9574e7a3ca814cce_6.geojson',
    'https://opendata.arcgis.com/datasets/272667665de646768db14e9fa1676405_11.geojson',
    'https://opendata.arcgis.com/datasets/cccae6f029334927856da6e20a50561f_19.geojson',
    'https://opendata.arcgis.com/datasets/59afd6534e4849ccae93c9ed0049a445_14.geojson',
    'https://opendata.arcgis.com/datasets/67a54ea25d944cf7b66750ba57da822c_1.geojson',
    'https://opendata.arcgis.com/datasets/51c6d946f91249828bc1c594ce1b27d1_16.geojson',
    'https://opendata.arcgis.com/datasets/6728810fb847489985d4b735502205a0_2.geojson',
    'https://opendata.arcgis.com/datasets/85c1b5c9e931470d94f0c9ff5acaa341_2.geojson',
    'https://opendata.arcgis.com/datasets/7b46f5eabbe0496fb168860ddc22fa35_14.geojson'
];

function convertPlanningUnit(planningUnit) {
    if (planningUnit < 2000) {
        return 13;
    }
    if (planningUnit < 2200) {
        return 1;
    }
    if (planningUnit < 2300) {
        return 13;
    }
    if (planningUnit < 4000) {
        return 12;
    }
    if (planningUnit < 5000) {
        return 11;
    }
    if (planningUnit < 5200) {
        return 5;
    }
    if (planningUnit < 5300) {
        return 10;
    }
    if (planningUnit < 6000) {
        return 9;
    }
    if (planningUnit < 6200) {
        return 1;
    }
    if (planningUnit < 6300) {
        return 4;
    }
    if (planningUnit < 6500) {
        return 5;
    }
    if (planningUnit < 6600) {
        return 4;
    }
    if (planningUnit < 6700) {
        return 3;
    }
    if (planningUnit < 6800) {
        return 2;
    }
    if (planningUnit < 7000) {
        return 1;
    }
    if (planningUnit < 7200) {
        return 14;
    }
    if (planningUnit < 7300) {
        return 7;
    }
    if (planningUnit < 7500) {
        return 6;
    }
    if (planningUnit < 7700) {
        return 7;
    }
}

var data = new Array(links.length);
var request = new Array(links.length);
var housePricing = [4.345582829, 3.069484055, 2.770031332, 1, 2.188946424, 1.965816625, 1.851159999, 2.365315429, 2.658620395, 3.177538347, 1.76482821, 5, 3.196559192, 2.316853303, 4.539438643];
var malls = [
    [43.233093, -79.922762],
    [43.233980, -79.910667],
    [43.205537, -79.894736],
    [43.230117, -79.879270],
    [43.236417, -79.877028],
    [43.237034, -79.876974],
    [43.217975, -79.861342],
    [43.251600, -79.851981],
    [43.258507, -79.870821],
    [43.258460, -79.869265],
    [43.252529, -79.810568],
    [43.230794, -79.765496]
];

for (var i = 0; i < links.length; i++) {
    request[i] = new XMLHttpRequest();
    // Open a new connection, using the GET request on the URL endpoint
    request[i].open('GET', links[i], true);
}

var finished = 0;
var doc;
request[0].onload = function() {
    data[0] = JSON.parse(this.response);
    finished++;
    processData();
}
request[0].send();
request[1].onload = function () {
    data[1] = JSON.parse(this.response);
    finished++;
    processData();
}
request[1].send();
request[2].onload = function () {
    data[2] = JSON.parse(this.response);
    finished++;
    processData();
}
request[2].send();
request[3].onload = function () {
    data[3] = JSON.parse(this.response);
    finished++;
    processData();
}
request[3].send();
request[4].onload = function () {
    data[4] = JSON.parse(this.response);
    finished++;
    processData();
}
request[4].send();
request[5].onload = function () {
    data[5] = JSON.parse(this.response);
    finished++;
    processData();
}
request[5].send();
request[6].onload = function () {
    data[6] = JSON.parse(this.response);
    finished++;
    processData();
}
request[6].send();
request[7].onload = function () {
    data[7] = JSON.parse(this.response);
    finished++;
    processData();
}
request[7].send();
request[8].onload = function () {
    data[8] = JSON.parse(this.response);
    finished++;
    processData();
}
request[8].send();

function addUserPreferences() {
    firebase.database().ref('/').transaction(function(all) {
        if (all) {
            all.average.avgHousePrice *= all.average.userCount;
            all.average.avgHousePrice += parseInt(user.sliderData.houseImportance);

            all.average.avgPark *= all.average.userCount;
            all.average.avgPark += parseInt(user.sliderData.parkImportance);

            all.average.avgRec *= all.average.userCount;
            all.average.avgRec += parseInt(user.sliderData.recImportance);

            all.average.avgSchool *= all.average.userCount;
            all.average.avgSchool += parseInt(user.sliderData.schoolImportance);

            all.average.avgLibrary *= all.average.userCount;
            all.average.avgLibrary += parseInt(user.sliderData.libImportance);

            all.average.avgGolf *= all.average.userCount;
            all.average.avgGolf += parseInt(user.sliderData.gcImportance);

            all.average.avgMall *= all.average.userCount;
            all.average.avgMall += parseInt(user.sliderData.comImportance);

            all.average.avgMuseum *= all.average.userCount;
            all.average.avgMuseum += parseInt(user.sliderData.mgImportance);

            all.average.avgRest *= all.average.userCount;
            all.average.avgRest += parseInt(user.sliderData.restImportance);

            all.average.avgGrocery *= all.average.userCount;
            all.average.avgGrocery += parseInt(user.sliderData.groceryImportance);

            for (var i = 0; i < all.worst.length; i++) {
                all.worst[i] *= all.average.userCount;
                all.worst[i] += neighborhoods[i].score;
            }

            all.average.userCount++;

            for (var i = 0; i < all.worst.length; i++) {
                all.worst[i] /= all.average.userCount;
            }

            all.average.avgHousePrice /= all.average.userCount;
            all.average.avgPark /= all.average.userCount;
            all.average.avgRec /= all.average.userCount;
            all.average.avgSchool /= all.average.userCount;
            all.average.avgLibrary /= all.average.userCount;
            all.average.avgGolf /= all.average.userCount;
            all.average.avgMall /= all.average.userCount;
            all.average.avgMuseum /= all.average.userCount;
            all.average.avgRest /= all.average.userCount;
            all.average.avgGrocery /= all.average.userCount;
        }
        return all;
    });
}

var parkDistances = [];
var recDistances = [];
var schoolDistances = [];
var foodDistances = [];
var mallDistances = [];
var libraryDistances = [];
var waterfallDistances = [];
var museumDistances = [];
var restaurantDistances = [];
var golfDistances = [];

function processData() {
    if (finished < 9 || doc == null)
        return;
    var landmarks = doc.getElementsByTagName("Placemark");

    // Parks
    for (var i = 0; i < landmarks.length; i++) {
        var coordinates = landmarks[i].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.split(" ").map(a => a.split(",").map(b => parseFloat(b)));
        var minDistance = 100;
        for (var k = 0; k < data[0].features.length; k++) {
            var distance1 = distance(coordinates, data[0].features[k].geometry.coordinates[0][0]);
            if (!isNaN(distance1))
                minDistance = Math.min(minDistance, distance1);
        }
        parkDistances.push(minDistance * 100);
    }

    // Recreation centres
    for (var i = 0; i < landmarks.length; i++) {
        var coordinates = landmarks[i].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.split(" ").map(a => a.split(",").map(b => parseFloat(b)));
        var minDistance = 100;
        for (var k = 0; k < data[1].features.length; k++) {
            var distance1 = distance(coordinates, data[1].features[k].geometry.coordinates);
            if (!isNaN(distance1))
                minDistance = Math.min(minDistance, distance1);
        }
        recDistances.push(minDistance * 100);
    }

    // Schools
    for (var i = 0; i < landmarks.length; i++) {
        var coordinates = landmarks[i].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.split(" ").map(a => a.split(",").map(b => parseFloat(b)));
        var minDistance = 100;
        for (var k = 0; k < data[2].features.length; k++) {
            var distance1 = distance(coordinates, data[2].features[k].geometry.coordinates);
            if (!isNaN(distance1))
                minDistance = Math.min(minDistance, distance1);
        }
        schoolDistances.push(minDistance * 100);
    }

    // Libraries
    for (var i = 0; i < landmarks.length; i++) {
        var coordinates = landmarks[i].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.split(" ").map(a => a.split(",").map(b => parseFloat(b)));
        var minDistance = 100;
        for (var k = 0; k < data[4].features.length; k++) {
            var distance1 = distance(coordinates, data[4].features[k].geometry.coordinates);
            if (!isNaN(distance1))
                minDistance = Math.min(minDistance, distance1);
        }
        libraryDistances.push(minDistance * 100);
    }
    // Museums
    for (var i = 0; i < landmarks.length; i++) {
        var coordinates = landmarks[i].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.split(" ").map(a => a.split(",").map(b => parseFloat(b)));
        var minDistance = 100;
        for (var k = 0; k < data[6].features.length; k++) {
            var distance1 = distance(coordinates, data[6].features[k].geometry.coordinates);
            if (!isNaN(distance1))
                minDistance = Math.min(minDistance, distance1);
        }
        museumDistances.push(minDistance * 100);
    }

    // Malls
    for (var i = 0; i < landmarks.length; i++) {
        var coordinates = landmarks[i].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.split(" ").map(a => a.split(",").map(b => parseFloat(b)));
        var minDistance = 100;
        for (var k = 0; k < malls.length; k++) {
            var distance1 = distance(coordinates, [malls[k][1], malls[k][0]]);
            if (!isNaN(distance1))
                minDistance = Math.min(minDistance, distance1);
        }
        mallDistances.push(minDistance * 100);
    }

    // Golf courses
    for (var i = 0; i < landmarks.length; i++) {
        var coordinates = landmarks[i].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.split(" ").map(a => a.split(",").map(b => parseFloat(b)));
        var minDistance = 100;
        for (var k = 0; k < data[8].features.length; k++) {
            var distance1 = distance(coordinates, data[8].features[k].geometry.coordinates[0][0]);
            if (!isNaN(distance1))
                minDistance = Math.min(minDistance, distance1);
        }
        golfDistances.push(minDistance * 100);
    }
    // // Food stores
    // foodDistances = new Array(landmarks.length).fill(100);
    // for (var k = 0; k < data[3].features.length; k++) {
    //     var geocoder = platform.getGeocodingService();
    //     geocoder.geocode({
    //         searchText: data[3].features[k].properties.BUSINESS_ADDRESS
    //     }, function(result) {
    //         var latitude = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude, longitude = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
    //         for (var i = 0; i < landmarks.length; i++) {
    //             var coordinates = landmarks[i].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.split(" ").map(a => a.split(",").map(b => parseFloat(b)));
    //             var distance1 = distance(coordinates, [longitude, latitude]);
    //             if (!isNaN(distance1))
    //                 foodDistances[i] = Math.min(foodDistances[i], distance1 * 100);
    //         }
    //     }, function(e) {
    //       //alert(e);
    //     });
    // }
    //
    // // Restaurants
    // restaurantDistances = new Array(landmarks.length).fill(100);
    // for (var k = 0; k < data[7].features.length; k++) {
    //     var geocoder = platform.getGeocodingService();
    //     geocoder.geocode({
    //         searchText: data[7].features[k].properties.BUSINESS_ADDRESS
    //     }, function(result) {
    //         var latitude = result.Response.View[0].Result[0].Location.DisplayPosition.Latitude, longitude = result.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
    //         for (var i = 0; i < landmarks.length; i++) {
    //             var coordinates = landmarks[i].getElementsByTagName("coordinates")[0].childNodes[0].nodeValue.split(" ").map(a => a.split(",").map(b => parseFloat(b)));
    //             var distance1 = distance(coordinates, [longitude, latitude]);
    //             if (!isNaN(distance1))
    //                 restaurantDistances[i] = Math.min(foodDistances[i], distance1 * 100);
    //         }
    //     }, function(e) {
    //       //alert(e);
    //     });
    // }

    setNeighborhoods();
}

function distance(list, point1) {
    var point2 = [0, 0]; // average points from list
    for (var i = 0; i < list.length; i++) {
        point2[0] += list[i][0];
        point2[1] += list[i][1];
    }
    point2[0] /= list.length;
    point2[1] /= list.length;

    var distance = Math.sqrt((Math.pow(point2[0] - point1[0], 2)) + (Math.pow(point2[1] - point1[1], 2)));
    return distance;
}

function Profile(age, occupation, ethnicity, familySize, income, residentStatus) {
    this.name = age;
    this.occupation = occupation;
    this.ethnicity = ethnicity;
    this.familySize = familySize;
    this.income = income;
    this.residentStatus = residentStatus;
}

function SliderData(housePrice, houseImportance, recImportance, comImportance, restImportance,
    mgImportance, groceryImportance, schoolImportance, libImportance, gcImportance, parkImportance) {
    this.housePrice = housePrice;
    this.houseImportance = houseImportance;
    this.recImportance = recImportance;
    this.comImportance = comImportance;
    this.restImportance = restImportance;
    this.mgImportance = mgImportance;
    this.groceryImportance = groceryImportance;
    this.schoolImportance = schoolImportance;
    this.libImportance = libImportance;
    this.gcImportance = gcImportance;
    this.parkImportance = parkImportance;
}

function NeighborhoodData(housePrice, parkDist, recDist, comDist, restDist, schoolDist, libDist, mgDist, gcDist,
    groceryDist, name, id) {
    this.housePrice = housePrice;
    this.parkDist = parkDist;
    this.schoolDist = schoolDist;
    this.libDist = libDist;
    this.mgDist = mgDist;
    this.gcDist = gcDist;
    this.groceryDist = groceryDist;
    this.recDist = recDist;
    this.comDist = comDist;
    this.restDist = restDist;
    this.name = name;
    this.id = id;
    this.score = 0;
    this.houseScore = 0;
    this.parkScore = 0;
    this.schoolScore = 0;
    this.libScore = 0;
    this.mgScore = 0;
    this.gcScore = 0;
    this.groceryScore = 0;
    this.recScore = 0;
    this.comScore = 0;
    this.restScore = 0;
}

var walk = 0,
    bike = 0,
    bus = 0;
var recreationWalk = 0,
    parkWalk = 0,
    golfWalk = 0,
    mallWalk = 0,
    museumWalk = 0,
    groceryWalk = 0,
    restWalk = 0,
    schoolWalk = 0,
    libraryWalk = 0;

// Make every neighborhood
var neighborhoods = [];

function normalize(array) {
    var min = 10000,
        max = -10000;
    for (var i = 0; i < array.length; i++) {
        min = Math.min(min, array[i]);
        max = Math.max(max, array[i]);
    }
}

function setNeighborhoods() {
    neighborhoods = [];
    for (var i = 0; i < 237; i++) {
        var housePrice1 = housePricing[convertPlanningUnit(parseInt(doc.getElementsByName("PLANNING_UNIT")[i + 1].childNodes[0].nodeValue))];
        var neighborhood = new NeighborhoodData(housePrice1, parkDistances[i], recDistances[i], mallDistances[i], restaurantDistances[i],
            schoolDistances[i], libraryDistances[i], museumDistances[i], golfDistances[i], foodDistances[i], doc.getElementsByName("NEIGHBOURHOOD")[i + 1].childNodes[0].nodeValue, doc.getElementsByName("PLANNING_UNIT")[i + 1].childNodes[0].nodeValue);
        neighborhoods.push(neighborhood);
    }
    setup();
    user.findNeighborhood();
}

function compare(a, b) {
    if (a.score < b.score)
        return -1;
    if (a.score > b.score)
        return 1;
    return 0;
}

function compare(a, b) {
    if (a.score < b.score)
        return -1;
    if (a.score > b.score)
        return 1;
    return 0;
}

var user;

function setup() {
    user = {
        sliderData: new SliderData(document.getElementById("housePrice").value,
            document.getElementById("houseImportance").value,
            document.getElementById("recImportance").value,
            document.getElementById("comImportance").value,
            document.getElementById("restImportance").value,
            document.getElementById("mgImportance").value,
            document.getElementById("groceryImportance").value,
            document.getElementById("schoolImportance").value,
            document.getElementById("libImportance").value,
            document.getElementById("gcImportance").value,
            document.getElementById("parkImportance").value),
        findNeighborhood: function() {
            // Returns array of neighborhoods sorted from best to worst
            var walkRange = 0;
            if (walk === 0) {
                walkRange = 15 / 36;
            } else if (walk === 1) {
                walkRange = 30 / 36;
            } else if (walk === 2) {
                walkRange = 60 / 36;
            } else {
                walkRange = 2.5;
            }

            var bikeRange = 0;
            if (bike === 0) {
                bikeRange = 4.8 / 3.6;
            } else if (walk === 1) {
                bikeRange = 9.6 / 3.6;
            } else if (walk === 2) {
                bikeRange = 19.2 / 3.6;
            } else {
                bikeRange = 28.8 / 3.6;
            }

            var busRange = 0;
            if (bus === 0) {
                busRange = 12 / 3.6;
            } else if (bus === 1) {
                busRange = 24 / 3.6;
            } else if (bus === 2) {
                busRange = 48 / 3.6;
            } else {
                busRange = 72 / 3.6;
            }

            for (var n = 0; n < neighborhoods.length; n++) {
                // Gets a score from 0-5
                neighborhoods[n].houseScore = (5 - Math.abs(user.sliderData.housePrice - neighborhoods[n].housePrice)) / 5 * user.sliderData.houseImportance;

                if (parkWalk === 0) {
                    neighborhoods[n].parkScore = user.sliderData.parkImportance * (walkRange / neighborhoods[n].parkDist);
                } else if (parkWalk === 1) {
                    neighborhoods[n].parkScore = user.sliderData.parkImportance * (bikeRange / neighborhoods[n].parkDist);
                } else if (parkWalk === 2) {
                    neighborhoods[n].parkScore = user.sliderData.parkImportance * (busRange / neighborhoods[n].parkDist);
                } else {
                    neighborhoods[n].parkScore = 5;
                }
                if (neighborhoods[n].parkScore > 5) neighborhoods[n].parkScore = 5;

                if (schoolWalk === 0) {
                    neighborhoods[n].schoolScore = user.sliderData.schoolImportance * (walkRange / neighborhoods[n].schoolDist);
                } else if (schoolWalk === 1) {
                    neighborhoods[n].schoolScore = user.sliderData.schoolImportance * (bikeRange / neighborhoods[n].schoolDist);
                } else if (schoolWalk === 2) {
                    neighborhoods[n].schoolScore = user.sliderData.schoolImportance * (busRange / neighborhoods[n].schoolDist);
                } else {
                    neighborhoods[n].schoolScore = 5;
                }
                if (neighborhoods[n].schoolScore > 5) neighborhoods[n].schoolScore = 5;

                if (libraryWalk === 0) {
                    neighborhoods[n].libScore = user.sliderData.libImportance * (walkRange / neighborhoods[n].libDist);
                } else if (libraryWalk === 1) {
                    neighborhoods[n].libScore = user.sliderData.libImportance * (bikeRange / neighborhoods[n].libDist);
                } else if (libraryWalk === 2) {
                    neighborhoods[n].libScore = user.sliderData.libImportance * (busRange / neighborhoods[n].libDist);
                } else {
                    neighborhoods[n].libScore = 5;
                }
                if (neighborhoods[n].libScore > 5) neighborhoods[n].libScore = 5;

                if (museumWalk === 0) {
                    neighborhoods[n].mgScore = user.sliderData.mgImportance * (walkRange / neighborhoods[n].mgDist);
                } else if (museumWalk === 1) {
                    neighborhoods[n].mgScore = user.sliderData.mgImportance * (bikeRange / neighborhoods[n].mgDist);
                } else if (museumWalk === 2) {
                    neighborhoods[n].mgScore = user.sliderData.mgImportance * (busRange / neighborhoods[n].mgDist);
                } else {
                    neighborhoods[n].mgScore = 5;
                }
                if (neighborhoods[n].mgScore > 5) neighborhoods[n].mgScore = 5;

                if (golfWalk === 0) {
                    neighborhoods[n].gcScore = user.sliderData.gcImportance * (walkRange / neighborhoods[n].gcDist);
                } else if (golfWalk === 1) {
                    neighborhoods[n].gcScore = user.sliderData.gcImportance * (bikeRange / neighborhoods[n].gcDist);
                } else if (golfWalk === 2) {
                    neighborhoods[n].gcScore = user.sliderData.gcImportance * (busRange / neighborhoods[n].gcDist);
                } else {
                    neighborhoods[n].gcScore = 5;
                }
                if (neighborhoods[n].gcScore > 5) neighborhoods[n].gcScore = 5;

                if (groceryWalk === 0) {
                    neighborhoods[n].groceryScore = user.sliderData.groceryImportance * (walkRange / neighborhoods[n].groceryDist);
                } else if (groceryWalk === 1) {
                    neighborhoods[n].groceryScore = user.sliderData.groceryImportance * (bikeRange / neighborhoods[n].groceryDist);
                } else if (groceryWalk === 2) {
                    neighborhoods[n].groceryScore = user.sliderData.groceryImportance * (busRange / neighborhoods[n].groceryDist);
                } else {
                    neighborhoods[n].groceryScore = 5;
                }
                if (neighborhoods[n].groceryScore > 5) neighborhoods[n].groceryScore = 5;

                if (recreationWalk === 0) {
                    neighborhoods[n].recScore = user.sliderData.recImportance * (walkRange / neighborhoods[n].recDist);
                } else if (recreationWalk === 1) {
                    neighborhoods[n].recScore = user.sliderData.recImportance * (bikeRange / neighborhoods[n].recDist);
                } else if (recreationWalk === 2) {
                    neighborhoods[n].recScore = user.sliderData.recImportance * (busRange / neighborhoods[n].recDist);
                } else {
                    neighborhoods[n].recScore = 5;
                }
                if (neighborhoods[n].recScore > 5) neighborhoods[n].recScore = 5;

                if (mallWalk === 0) {
                    neighborhoods[n].comScore = user.sliderData.comImportance * (walkRange / neighborhoods[n].comDist);
                } else if (mallWalk === 1) {
                    neighborhoods[n].comScore = user.sliderData.comImportance * (bikeRange / neighborhoods[n].comDist);
                } else if (mallWalk === 2) {
                    neighborhoods[n].comScore = user.sliderData.comImportance * (busRange / neighborhoods[n].comDist);
                } else {
                    neighborhoods[n].comScore = 5;
                }
                if (neighborhoods[n].comScore > 5) neighborhoods[n].comScore = 5;

                if (restWalk === 0) {
                    neighborhoods[n].restScore = user.sliderData.restImportance * (walkRange / neighborhoods[n].restDist);
                } else if (restWalk === 1) {
                    neighborhoods[n].restScore = user.sliderData.restImportance * (bikeRange / neighborhoods[n].restDist);
                } else if (restWalk === 2) {
                    neighborhoods[n].restScore = user.sliderData.restImportance * (busRange / neighborhoods[n].restDist);
                } else {
                    neighborhoods[n].restScore = 5;
                }
                if (neighborhoods[n].restScore > 5) neighborhoods[n].restScore = 5;

                neighborhoods[n].score = (neighborhoods[n].houseScore +
                    neighborhoods[n].parkScore +
                    neighborhoods[n].schoolScore +
                    neighborhoods[n].libScore +
                    neighborhoods[n].mgScore +
                    neighborhoods[n].gcScore +
                    //neighborhoods[n].groceryScore +
                    neighborhoods[n].recScore +
                    neighborhoods[n].comScore
                    //neighborhoods[n].restScore
                    ) / 8;
            }
            var cloned = JSON.parse(JSON.stringify(neighborhoods));
            cloned.sort(compare);
            document.getElementById("1").innerHTML = `<a href="http://www.google.com/search?q=${cloned[cloned.length - 1].name.split(" ").join("+")}+Hamilton" target="_blank" onclick='addUserPreferences()'>` + cloned[cloned.length - 1].name + "</a>";
            document.getElementById("2").innerHTML = `<a href="http://www.google.com/search?q=${cloned[cloned.length - 2].name.split(" ").join("+")}+Hamilton" target="_blank" onclick='addUserPreferences()'>` + cloned[cloned.length - 2].name + "</a>";
            document.getElementById("3").innerHTML = `<a href="http://www.google.com/search?q=${cloned[cloned.length - 3].name.split(" ").join("+")}+Hamilton" target="_blank" onclick='addUserPreferences()'>` + cloned[cloned.length - 3].name + "</a>";
            document.getElementById("4").innerHTML = `<a href="http://www.google.com/search?q=${cloned[cloned.length - 4].name.split(" ").join("+")}+Hamilton" target="_blank" onclick='addUserPreferences()'>` + cloned[cloned.length - 4].name + "</a>";
            document.getElementById("5").innerHTML = `<a href="http://www.google.com/search?q=${cloned[cloned.length - 5].name.split(" ").join("+")}+Hamilton" target="_blank" onclick='addUserPreferences()'>` + cloned[cloned.length - 5].name + "</a>";
            for (var i = 0; i < doc.getElementsByTagName("PolyStyle").length; i++) {
                doc.getElementsByTagName("PolyStyle")[i].getElementsByTagName("color")[0].childNodes[0].nodeValue = "80" + hslToRgb((neighborhoods[i].score - 1) / 3 * 120, 100, 50);
            }
            initMap();
        }
    };
}

function hslToRgb(h, s, l){
    h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `${toHex(b)}${toHex(g)}${toHex(r)}`;
}
