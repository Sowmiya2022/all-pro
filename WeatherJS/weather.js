class Weather {
  constructor(city, state)
{
  this.apikey ="9865fd7e1da54126a5fd7e1da5a12631";
  this.city = city;
  this.state = state;
}
//fetch weather from API
async getWeather() {
  const response = await fetch(`http://api.wunderground.com/api/${this.apikey}/conditions/q/${this.state}/${this.city}.json`);
  
  



  


  const responseData = await response.json();

  return responseData.current_observation;
}

//change weather location
changeLocation(city, state){
  this.city = city;
  this.state = state;
}

}