// get lat and long
var API_KEY = "c1f0bcc8538c02faea81cf3f564dabb4";
var far = false;
var wd;

function displayTemp(cTemp, f) {
  if (f) return Math.round((cTemp * 9 / 5 + 32)) + " °F";
  return Math.round(cTemp) + " °C";
}

function render(wd, far) {
  console.log(wd);
  var currentLocation = wd.name;
  var currentWeather = wd.weather[0].description;
  var currentTemp = displayTemp(wd.main.temp, far);
  var high = displayTemp(wd.main.temp_max, far);
  var low = displayTemp(wd.main.temp_min, far);
  console.log(currentWeather);
  var icon = wd.weather[0].icon;

  $('#currentLocation').html(currentLocation);
  $('#currentWeather').html(currentWeather);
  $('#currentTemp').html(currentTemp);
  $('#high').html(high);
  $('#low').html(low);

  var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
  $('#currentWeather').prepend('<img id="icon" src="' + iconSrc + '">');

}

$(function() {

  var loc;

  $.getJSON('http://ipinfo.io', function(d) {
    console.log("assigning the data...");
    loc = d.loc.split(",");
    console.log(loc);

    //Call to the open weather API

    $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + loc[0] + '&lon=' + loc[1] + '&APPID=' + API_KEY,
      function(apiData) {
        wd = apiData;

        render(apiData, far);

        $('#toggle').click(function() {
          far = !far;
          render(wd, far);

        })

      });

  });

});