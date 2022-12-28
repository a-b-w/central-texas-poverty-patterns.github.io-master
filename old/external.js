function fullScreenWebMap() {
    var map = L.map('map').setView([29.8884, -97.9384], 14);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
        }).addTo(map);

        lat1 = 29.888887;
        lng1 = -97.943156;

        lat2 = 29.889351;
        lng2 = -97.938935;

        lat3 = 29.88873;
        lng3 = -97.94172;

        var alkekLib = L.marker([lat1, lng1]).addTo(map);
        var oldMain = L.marker([lat2, lng2]).addTo(map);
        var ela = L.marker([lat3, lng3]).addTo(map);
        var point1 = turf.point([lng1, lat1]);
        var point2 = turf.point([lng2, lat2]);
        var midpoint = turf.midpoint(point1, point2);

        var myMidpoint = L.geoJSON(midpoint).addTo(map);

        var point = turf.point([lng3, lat3]);
        var distance = 0.88980355;
        var bearing = 85.140833;
        var options = {units: 'miles'};

        var destination = turf.destination(point, distance, bearing, options);

        var myDestination = L.geoJSON(destination).addTo(map);


        lat4 = 29.886930
        lng4 = -97.937340

        lat5 = 29.888841
        lng5 = -97.937353

        var tc =  L.marker([lat4, lng4]).addTo(map);
        var ab =  L.marker([lat5, lng5]).addTo(map);

        var point4 = turf.point([lng4, lat4]);
        var point5 = turf.point([lng5, lat5]);
        var bearing = turf.bearing(point4, point5);

        var myBearing =  L.geoJSON(bearing).addTo(map);




/*
        var linestring1 = turf.lineString([[lng1, lat1], [lng2, lat2]], {name: ‘line 1’});
        var myMidLine = L.geoJSON(linestring1).addTo(map);
*/

      };
