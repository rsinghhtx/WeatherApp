/* Javascript goes here! */


$(function() {

  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather',
  apiKey = '124a6205e748f3b9918b21146cb0472f';
//Set up ajax
// create get ajax call, set variables like url, mehtod, and data type
  function getWeatherData(city) {
    var getWeather = $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      data: {
        q: city,
        units: 'imperial',
        appid: apiKey,
      }
    });


    //When API done loading, and place response-information into variables

    getWeather.done(function(response) {
      console.log(response);
      var city = response.name,
        temperature = response.main.temp,
        humidity = response.main.humidity,
        description = response.weather[0].description,
        weatherIcon = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png',
        gMap = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDsxFSObYJSaQqf_-q7o7imAcqiKPuW92I&q=' + response.name,
        flag = response.sys.country;
      // var flag = Flag.toLowerCase(),
      flagUrl = 'https://lipis.github.io/flag-icon-css/flags/4x3/' + flag + '.svg';


      console.log(city, temperature, humidity);

      //Set response information from API into HTML DOM

      $('.results .results-city').text(city);
      $('.temperature-container .temperature').text(temperature + 'º');
      $('.humidity-container .humidity').text(humidity + '%');
      $('.description-container .description').text(description);
      $('.wIcon').html('<img src="' + weatherIcon + '"/>');
      $('.maps').attr('src', gMap);
      $('.flagholder').html('<img src="' + flagUrl + '"/>');



    });
// what happens when query failes
    getWeather.fail(function(error) {
      $('.errorMessage').text("City Doesent exist");
      $('getWeatherData').on('submit', function() {
        $('.errorMessage').text('');
      })


    });
// what functions to run always
    getWeather.always(function() {


    });


  }
// setup functions that handle events
  function setHandlers() {
    //On form submit from HTML get city value, place in variable
    $('.getWeatherData').on('submit', function(e) {
      e.preventDefault();
      //place input into variable
      var city = $(this).find('.weather-city').val();
      //send input into main parsing function
      getWeatherData(city);

    });

  }

  // flow of web app
  // runs get weather data that is defaulted to Austin
  function main() {
    getWeatherData('Austin');
    setHandlers();
  }

  main();

});


//
// else {
//
// }
