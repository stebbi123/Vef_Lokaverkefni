"use strict";

function initMap() {

    var jsonLink = "http://apis.is/earthquake/is";
    $.getJSON(jsonLink, function (data) {

        var jsonData = [];

        for (var i = 0; i < data.results.length; i++) {

            jsonData.push({
                location: data.results[i].humanReadableLocation,
                richter: data.results[i].size,
                date: data.results[i].timestamp,
                depth: data.results[i].depth,
                xCord: data.results[i].latitude,
                yCord: data.results[i].longitude


            });

        }


        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 65, lng: -19},
            zoom: 7,
            mapTypeId: 'terrain'
        });

        for (var info in jsonData) {


            var quakeCircle = new google.maps.Circle({
              
                strokeColor: '#551A8B',
                strokeOpacity: 1,
                strokeWeight: 1,
                fillColor: '#551A8B',
                fillOpacity: 0.2,
                map: map,
                center: {

                    lat: jsonData[info].xCord,
                    lng: jsonData[info].yCord
                },
                radius: Math.sqrt(jsonData[info].depth) * 2200
            });

            var unreadableDate = jsonData[info].date;
            var readableDate = unreadableDate.substring(0, 9);
            readableDate = readableDate.split("-").reverse().join("-");





            var infowindow = new google.maps.InfoWindow({
                content: '<p>Staðsetning: ' + jsonData[info].location + '</p>' + '<p>Richter: ' + jsonData[info].richter  + '<p>Dagsetning: ' + readableDate + '</p>'
            });


            var marker = new google.maps.Marker({
                position: {
                    lat: jsonData[info].xCord,
                    lng: jsonData[info].yCord
                },
                map: map
            });


            google.maps.event.addListener(marker, 'mouseover', (function (marker, infowindow) {
                if (!infowindow) infowindow.close();
                else  {
                    return function () {
                        infowindow.open(map, marker, this);
                    };
                }
            })(marker, infowindow, this));

            /*google.maps.event.addListener(marker, 'mouseout', (function (marker, infowindow){
              infowindow.close();  virkar ekki eins og ég var að hugsa mér á google maps
            }));*/


        }
    });
}
