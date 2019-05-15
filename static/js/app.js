import { Config } from '../../config.js';

let config = new Config();
const API_KEY = config.getKey();

// request header and put into nav id
$.get('../../components/header.html', function(response) {
  $('#nav').html(response);
});


// don't show cards until form is submitted
$("#weather_info").css('display', 'none');

// convert kelvin to fahrenjeit which takes in a single number
function convertKelvin(k) {
  //  F = 9/5 (K - 273) + 32
  let f =  (9/5) * (k - 273) + 32;
  return f.toFixed(2);
}

// handle form submission by using jQuery to listen for event
$("#search_weather").submit(event => {
  event.preventDefault();

  // console.log(event);

  let city = $("#city").val();
  console.log(city);
  // create url variable to store api location
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;

  // console.log(url);

  // use jQuery .get to call API
  $.get(url, function(response) {
    console.log(response);

    // make cards appear
    $("#weather_info").css('display', 'block');

    $("#high").html(`${convertKelvin(response.main.temp_max)}&deg;`);
    $("#low").html(`${convertKelvin(response.main.temp_min)}&deg;`);
    $("#forecast").text(response.weather[0].description);
    $("#humidity").html(`${response.main.humidity}%`);
  });
});
