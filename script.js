'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('afterbegin', msg);
  // countriesContainer.style.opacity = 1;
};

const renderData = function (data, className = '') {
  const html = `
  <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" alt='data.flags.alt'/>
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.entries(data.languages)[0][1]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.entries(data.currencies)[0][0]
            }</p>

        </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);

  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
// //// --ASYNCHRONOUS JS, AJAX AND API's--
// const p = document.querySelector('.p');
// p.textContent = 'Hi, my name is Ian';
// alert('Text me babe!');
// p.style.color = 'red';

// setTimeout(() => console.log("What's good my g!"), 3000); // Asynchronous method
// // img.src = 'dog.jpg'; // Also async
// console.log('I arrive first my g 🤔😏');

// https://countries-api-836d.onrender.com/countries/

// //// --OUR FIRST AJAX CALL: XMLHttpRequest--

/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  //   console.log(request.responseText); // Doesn't work

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
        <img class="country__img" src="${data.flags.png}" alt='data.flags.alt'/>
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.entries(data.languages)[0][1]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.entries(data.currencies)[0][0]
            }</p>

        </div>
    </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);

    countriesContainer.style.opacity = 1;
  });
};

getCountryData('mexico');
getCountryData('usa');
getCountryData('canada');
// getCountryData('colombia');
getCountryData('japan');
getCountryData('spain');

*/

// //// --WELCOME TO CALLBACK HELL--

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  //   console.log(request.responseText); // Doesn't work

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderData(data);

    // Render neighbour country (2)
    const neighbour = data.borders?.[data.borders.length - 1];
    console.log(neighbour);

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderData(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('mexico');
// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('canada');
// // getCountryAndNeighbour('colombia');
// getCountryAndNeighbour('japan');
// getCountryAndNeighbour('spain');

*/

///////////////////
// //// PROMISES AND THE FETCH API

// Old way of AJAX calls
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// Modern way
// const request = fetch('https://restcountries.com/v3.1/name/mexico');

// //// CONSUMING PROMISES

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// };

// //// --THROWING ERRORS MANUALLY--

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     // //// --HANDLING REJECTED PROMISES--
//     .then(response => {
//       console.log(response);
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);

//       return response.json();
//     })
//     .then(d => {
//       const [data] = d;
//       renderData(data);

//       // //// --CHAINING PROMISES--
//       // const neighbour = data.borders?.[0];

//       const neighbour = 'lasagna';
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${res.status}`);

//       return res.json();
//     })
//     .then(d => {
//       const [data] = d;
//       renderData(data, 'neighbour');
//     })
//     .catch(err => {
//       console.error(err);
//       renderError(`Something went wrong. ${err.message}. Try again.`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  const getJSON = function (url, errorMsg = 'Something went wrong') {
    return (
      fetch(url)
        // //// --HANDLING REJECTED PROMISES--
        .then(response => {
          if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

          return response.json();
        })
    );
  };

  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(d => {
      const [data] = d;
      renderData(data);

      // //// --CHAINING PROMISES--
      const neighbour = data.borders?.[0];

      // const neighbour = 'lasagna';
      if (!neighbour) throw new Error('Neighbour country not found!');
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(d => {
      const [data] = d;
      renderData(data, 'neighbour');
    })
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong. ${err.message}. Try again.`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('mexico');
});

getCountryData('australia');
