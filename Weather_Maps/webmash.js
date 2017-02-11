/*
Student Name: Vij Madhav  
Student ID: 1001440170
Project Name:   Project2- A Weather App Integration with Google Maps
Due Date:   10/26/2016
Last Edited: 10/26/2016
*/

var username = "madhavvij";
var request = new XMLHttpRequest();
var marker;
var address;
var output;
var infowindow;

function initMap() {
    var uluru = {lat: 32.75, lng: -97.13};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
           
        
         google.maps.event.addListener(map, 'click', function(event) {

            if(marker!=null)
            {
                marker.setMap(null);

            }

  var geocoder = new google.maps.Geocoder;
 infowindow = new google.maps.InfoWindow;
  var Lat = event.latLng.lat();
  var Lng = event.latLng.lng();
  var input = Lat+","+Lng;
  sendRequest(Lat,Lng);
  geocodeLatLng(geocoder, map, infowindow,input);
  
    });
         document.getElementById("clear").addEventListener("click", function(){
             document.getElementById("output").value = "";
  });
         
 }



function geocodeLatLng(geocoder, map, infowindow,input) {
    if(marker!=null)
            {
                marker.setMap(null);

            }
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(17);

        marker = new google.maps.Marker({
          position: latlng,
          draggable: true,
          animation: google.maps.Animation.DROP,
          map: map
        });
        address = results[0].formatted_address;
       
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);


    }
  });
}




function displayResult () {
    if (request.readyState == 4) {
        var xml = request.responseXML.documentElement;
        var temperature = xml.getElementsByTagName("temperature")[0].innerHTML;
        var clouds = xml.getElementsByTagName("clouds")[0].innerHTML;
        var wind = xml.getElementsByTagName("windSpeed")[0].innerHTML;
        var weather = xml.getElementsByTagName("weatherCondition")[0].innerHTML;
        var add = address;
         output= "Address:"+add+" | Temp: "+temperature+" | Clouds:"+clouds+" | Windspeed:"+wind+" | Weather Condition:"+weather+"\n\n";
         output1= "Address:"+add+" <br/> Temp: "+temperature+" <br/> Clouds:"+clouds+" <br/> Windspeed:"+wind+" <br/> Weather Condition:"+weather;


	var result = document.getElementById("output");
  document.getElementById("output").innerHTML = result.innerHTML+output;
          infowindow.setContent(output1);
        infowindow.open(map, marker);
    }
}
  
  
function sendRequest (Lat,Lng) {
    request.onreadystatechange = displayResult;
    var lat = Lat;
    var lng = Lng;
    var url = "http://api.geonames.org/findNearByWeatherXML?lat="+lat+"&lng="+lng+"&username="+username;
    var uri = encodeURI(url);
    request.open("GET",uri);
    request.send(null);
}