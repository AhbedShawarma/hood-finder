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
var housePricing = [24774.174,21806.94,21110.641,16994.896,19759.48,19240.65,18974.046,20169.58,20851.584,22058.192,18773.304,26295.85,22102.42,20056.894,25224.935];
var malls = [[43.233093, -79.922762], [43.233980, -79.910667], [43.205537, -79.894736], [43.230117, -79.879270], [43.236417, -79.877028], [43.237034, -79.876974], [43.217975, -79.861342], [43.251600, -79.851981], [43.258507, -79.870821], [43.258460, -79.869265], [43.252529, -79.810568], [43.230794, -79.765496]];

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
request[1].onload = function() {
    data[1] = JSON.parse(this.response);
    finished++;
    processData();
}
request[1].send();
request[2].onload = function() {
    data[2] = JSON.parse(this.response);
    finished++;
    processData();
}
request[2].send();
request[3].onload = function() {
    data[3] = JSON.parse(this.response);
    finished++;
    processData();
}
request[3].send();
request[4].onload = function() {
    data[4] = JSON.parse(this.response);
    finished++;
    processData();
}
request[4].send();
request[5].onload = function() {
    data[5] = JSON.parse(this.response);
    finished++;
    processData();
}
request[5].send();
request[6].onload = function() {
    data[6] = JSON.parse(this.response);
    finished++;
    processData();
}
request[6].send();
request[7].onload = function() {
    data[7] = JSON.parse(this.response);
    finished++;
    processData();
}
request[7].send();
request[8].onload = function() {
    data[8] = JSON.parse(this.response);
    finished++;
    processData();
}
request[8].send();

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
    //         if (k === data[7].features.length) {
    //             setNeighborhoods();
    //         }
    //     }, function(e) {
    //       //alert(e);
    //     });
    // }
}

function distance(list, point1) {
    var point2 = [0, 0]; // average points from list
    for (var i = 0; i < list.length; i++){
        point2[0] += list[i][0];
        point2[1] += list[i][1];
    }
    point2[0] /= list.length;
    point2[1] /= list.length;

    var distance = Math.sqrt((Math.pow(point2[0] - point1[0], 2)) + (Math.pow(point2[1] - point1[1], 2)));
    return distance;
}

function Profile(age, occupation, ethnicity, familySize, income, residentStatus){
    this.name = age;
    this.occupation = occupation;
    this.ethnicity = ethnicity;
    this.familySize = familySize;
    this.income = income;
    this.residentStatus = residentStatus;
}

function SliderData(housePrice,houseImportance,recImportance,comImportance,restImportance,
    mgImportance,groceryImportance,schoolImportance,libImportance,gcImportance,parkImportance){
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
    groceryDist,name){
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
    var score = 0;
    var houseScore = 0;
    var parkScore = 0;
    var schoolScore = 0;
    var libScore = 0;
    var mgScore = 0;
    var gcScore = 0;
    var groceryScore = 0;
    var recScore = 0;
    var comScore = 0;
    var restScore = 0;
}

var walk = 0, bike = 0, bus = 0;
var recreationWalk = 0, parkWalk = 0, golfWalk = 0, mallWalk = 0, museumWalk = 0, groceryWalk = 0, restWalk = 0, schoolWalk = 0, libraryWalk = 0;

// Make every neighborhood
var neighborhoods = [];

function normalize(array) {
    var min = 10000, max = -10000;
    for (var i = 0; i < array.length; i++) {
        min = Math.min(min, array[i]);
        max = Math.max(max, array[i]);
    }
}

function setNeighborhoods() {
    for (var i = 1; i <= 237; i++){
        var housePrice1 = housePricing[convertPlanningUnit(parseInt(doc.getElementsByName("PLANNING_UNIT")[i].childNodes[0].nodeValue))];
        var neighborhood = new NeighborhoodData(housePrice1, parkDistances[i], recDistances[i], mallDistances[i], restaurantDistances[i],
        schoolDistances[i], libraryDistances[i], museumDistances[i], golfDistances[i], foodDistances[i], doc.getElementsByName("NEIGHBOURHOOD")[i].childNodes[0].nodeValue);
    neighborhoods.push(neighborhood);
    }
}

function compare(a, b){
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
                                    document.getElementById("parkImportance").value)
    };
}

// user.findNeighborhood();
// for(i = (neighborhoods.length) - 1; i >= (neighborhoods.length) - 6; i--){
//     document.write(neighborhoods[i].name, ", score out of 5 : ", neighborhoods[i].score, "<br />");
// }
