

function checkdropdown() {
if(document.getElementById('select').value != "") {
  return true;
}
else {
  return false;
}
}

var processResponse = function(response){ //in the Google books api example there was an array called Items, but not here)
  var output_div = document.querySelector('#output');

  var events = response.events;
  for(var i = 0; i < events.length; i++){

    var title = (events[i].name.text);
    var title_html = document.createElement('h3');

    // var url_address = (events[i].url);
    // var a = url_address;
    var linkText = title_html;
    // a.href = url_address;
    //a.appendChild(linkText);

    //console.log(a);



     // var textLink = document.createTextNode(‘see the article’);

    // a.href = events[i].url;
    // console.log(a);


    var title = events[i].name.text;
    var time = events[i].start.local;
    var description = " " + time.substring(11, 16) + ' h.';
    var date = time.substring(0, 10);
    var details = events[i].description.text;
    //var picture = events.;
    // var a = document.createElement(‘a’);
    var textLink = document.createTextNode(title);
    var description_text = document.createTextNode(description);
    var events_detail = document.createTextNode(details)
    var date_event = document.createTextNode(date);
    // var p_text = document.createTextNode (title);
    //var link = document.createTextNode (a)
    var paragraph = document.createElement('p');

    //var image = document.createElement('img');
    // para_title.append(a);
    title_html.className = 'title_html';
    //image.className = 'image';
    paragraph.className = 'paragraph';
    title_html.appendChild(textLink);
    // a.appendChild(textLink);
    //title_html.appendChild(a);
    paragraph.appendChild(date_event);
    paragraph.appendChild(description_text);
    paragraph.appendChild(events_detail);
    //image.appendChild(paragraph);
    output_div.appendChild(title_html);
    output_div.appendChild(paragraph);
    //output_div.appendChild(a);

  }
}

// Function to ensure parameters used in request are encoded correctly
var encodeParameters = function(parameters) {
    //join all key value pairs and store in an array.
    var strArray = [];
    for (var key in parameters) {
      if (parameters.hasOwnProperty(key)){
        var paramString = encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]);
        strArray.push(paramString);
      }
    }
    //join everything in the array together
    return strArray.join("&");

}

var doSearch = function(search_term, time) {
  var base_url = 'https://www.eventbriteapi.com/v3/events/search/'; //this is when we are gonna send our user

  var params = { //this params are need for the request of information
      token: 'GKHQ3GIQ7TPQFDIAHL62',
      'location.address': search_term,
      'start_date.keyword': time //create a drop down menu
      //SHOULD I CREATE A FOR LOOP TO PULL DATA FROM EVERY PAGE???
  }

  var query_url = base_url + "?" + encodeParameters(params);
  console.log(query_url);


  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", query_url);
  xhttp.addEventListener('load', function(){
    var response = JSON.parse(this.response);
    console.log(response.events);
    console.log(response.pagination);
    for (let i = 0; i < response.events.length; i++) {
      coordinates(response.events[i]);
    }
    processResponse(response);
  })
  xhttp.send();
}


//Here is set the connection between the Search button and the query

var search_button = document.querySelector('#search_button');
search_button.addEventListener('click', function(){
  console.log('clicked');
  var search_term = document.querySelector('#search_term').value;
  console.log(search_term);
  var time = document.querySelector('#lang').value;
  console.log(time);
  doSearch(search_term, time);
  //position(vanue);
})


//function to Get latitude and longitude

var coordinates = function(event) {
  var venueID = event.venue_id;
  var base_url = 'https://www.eventbriteapi.com/v3/venues/'; //this is when we are gonna send our user

  var params = { //this params are need for the request of information
      token: 'GKHQ3GIQ7TPQFDIAHL62',
      venues: venueID
  }

  var query_url = base_url + venueID + "/?" + encodeParameters(params);

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", query_url);
  xhttp.addEventListener('load', function(){
    var response = JSON.parse(this.response);
    console.log(response.name);
    console.log(response.latitude);
    console.log(response.longitude);
  })
  xhttp.send();
}


  var map = L.map('map_div'); //set which div or place or the html the map is
  map.setView([51.481, -3.149], 13); //set where map is gonna geolocate

  var myStyle = 'https://api.mapbox.com/styles/v1/miguelrofer/cjajt7n9nb5w52sl4xpqulxaj/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlndWVscm9mZXIiLCJhIjoiY2phanF3cTAxMzRiYTMycTgyd25teGpzZiJ9.xLMqsvl1eTBNM1hb-RwP7w'
  var defaultStyle = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'

  L.tileLayer(myStyle,
  {

    maxZoom: 18, //set the initial zoom when the app is open
    //id: 'mapbox.streets', //Why this bit not needed? -- Type of map. It can be mapbox.streets or mapbox.satellite...
    accessToken: 'pk.eyJ1IjoibWlndWVscm9mZXIiLCJhIjoiY2phanF3cTAxMzRiYTMycTgyd25teGpzZiJ9.xLMqsvl1eTBNM1hb-RwP7w'


  }).addTo(map) //This bit that is gonna add those pictures into our map. We have to tell it where to them from. WHERE ARE X AND Y ?


// var offices = function(response){
//   for (var i=0; i < response.events.length; i ++)
//       var points = [
//         {
//           lat: coordinates(response.event[i].latitude),
//           lng: coordinates(response.event[i].longitude),
//           name: doSearch(response.event[i].name.text)
//         },
//       ]
//     }


var offices = [
{
  lat: 51.478616,
  lng: -3.179166,
  name: 'brewdog'
},
{
  lat: 51.479878,
  lng: -3.181215,
  name: 'tiny rebel'
},
{
  lat: 51.443146,
  lng: -3.173405,
  name: 'brewdog'
},
]

  for (var i=0; i < offices.length; i ++) {

    var html_string = '<strong>Hello</strong> <br>Cardiff ' + offices[i].name;
    var marker = L.marker([offices[i].lat, offices[i].lng]); //It is the same way as for creating the map. We give a latitude and longitude
    marker.bindPopup(html_string); // Is bindPopup by default or could be other name?
    marker.addTo(map); //every time we create something, we have to add it the map
  }

  map.on('click', function(event){
    console.log(event.latlng.toString());
    console.log('clicked'); // what is the point of this?
    L.popup().setLatLng(event.latlng).setContent('you clicked at: ' + event.latlng.toString());
  })
