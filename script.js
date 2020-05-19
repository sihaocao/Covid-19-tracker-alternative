window.onload = () => {
  getCovid19Stats();
};

getCovid19Stats = () => {
  fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/225')
    .then(response => response.json())
    .then(responseJson => {
      const population = responseJson.location.country_population;
      const update = responseJson.location.last_updated;
      const confirmedCases = responseJson.location.latest.confirmed;
      const deaths = responseJson.location.latest.deaths;
      document.getElementById(
        'population'
      ).innerHTML = population.toLocaleString('en');
      document.getElementById('update').innerHTML = update.substr(0, 10);
      document.getElementById(
        'cases'
      ).innerHTML = confirmedCases.toLocaleString('en');
      document.getElementById('deaths').innerHTML = deaths.toLocaleString('en');
      document.getElementById('percent').innerHTML =
        ((Number(deaths) / Number(confirmedCases)) * 100).toLocaleString('en', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) + '%';
    })
    .catch(error => {
      console.log(error);
    });
  setTimeout(getCovid19Stats, 43200000); // updates above statistics every 12 hours
};
