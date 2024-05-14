'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('afterbegin', msg);
  countriesContainer.style.opacity = 1;
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

  countriesContainer.style.opacity = 1;
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

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  //   console.log(request.responseText); // Doesn't work

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

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

// getCountryData('mexico');
// getCountryData('usa');
// getCountryData('canada');
// // getCountryData('colombia');
// getCountryData('japan');
// getCountryData('spain');

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

/*

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

// getCountryData('australia');
// getCountryData('jhsd');

*/

/* 
///////////////////////   Coding Challenge #1
In this challenge you will build a function 'whereAmI' which renders a country
only based on GPS coordinates. For that, you will use a second API to geocode
coordinates. So in this challenge, you’ll use an API on your own for the first time 😁

Your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
and a longitude value ('lng') (these are GPS coordinates, examples are in test
data below).

2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
to convert coordinates to a meaningful location, like a city and country name.
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
will be done to a URL with this format:
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
promises to get the data. Do not use the 'getJSON' function we created, that
is cheating 😉

3. Once you have the data, take a look at it in the console to see all the attributes
that you received about the provided location. Then, using this data, log a
message like this to the console: “You are in Berlin, Germany”

4. Chain a .catch method to the end of the promise chain and log errors to the
console

5. This API allows you to make only 3 requests per second. If you reload fast, you
will get this error with code 403. This is an error with the request. Remember,
fetch() does not reject the promise in this case. So create an error to reject
the promise yourself, with a meaningful error message

PART 2
6. Now it's time to use the received data to render a country. So take the relevant
attribute from the geocoding API result, and plug it into the countries API that
we have been using.

7. Render the country and catch any errors, just like we have done in the last
lecture (you can even copy this code, no need to type the same code)

Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474 
*/

/*
// Step 1
const whereAmI = function (lat, lng) {
  // Step 2
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => response.json())
    .then(data => {
      // Step 5
      if (!data.city || !data.country)
        throw new Error(`Something went wrong, could not find city or country`);
      const city = data.city;
      const country = data.country;
      // Step 3
      console.log(`You are in the city of ${city}, ${country}`);

      // Step 6 & 7
      getCountry2(country);
    })
    // Step 4
    .catch(error => console.error(error));
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

// Part of step 7
const getCountry2 = function (country) {
  const getJSON2 = function (url, errorMsg) {
    return fetch(url).then(response => {
      if (!response) throw new Error(`${errorMsg} ${response.status}`);
      return response.json();
    });
  };

  getJSON2(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found'
  )
    .then(data => {
      const [country] = data;
      renderData(country);

      const neighbour = country.borders?.[0];
      if (!neighbour) throw new Error('Neighbour country not found');
      return getJSON2(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Neighbour country not found'
      );
    })
    .then(data => {
      const [neighbour] = data;
      renderData(neighbour, 'neighbour');
    })
    .catch(error => {
      console.error(error);
      renderError(error);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

*/

/*

// //// --BUILDING A SIMPLE PROMISE--
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery is happening');
  setTimeout(function () {
    if (Math.random() > 0.5) {
      resolve('You win the lottery');
    } else {
      reject(new Error('You lost your bet'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = seconds =>
  new Promise(resolved => setTimeout(resolved, seconds * 1000));

wait(2)
  .then(() => {
    console.log('Waited for 1 sec');
    return wait(1);
  })
  .then(() => {
    console.log('Waited for 2 sec');
    return wait(1);
  })
  .then(() => {
    console.log('Waited for 3 sec');
    return wait(1);
  })
  .then(() => {
    console.log('Waited for 4 sec');
    return wait(1);
  })
  .then(() => console.log('Wait 5 sec'));

Promise.resolve('abc').then(res => console.log(res));
Promise.reject(new Error('Problem')).catch(res => console.error(res));

*/
// //// --PROMISIFYING THE GEOLOCATION API--
/*

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(position => console.log(position));

const whereAmI = function () {
  getPosition()
    .then(position => {
      const { latitude: lat, longitude: lng } = position.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => response.json())
    .then(data => {
      if (!data.city || !data.country)
        throw new Error(`Something went wrong, could not find city or country`);
      const city = data.city;
      const country = data.country;
      console.log(`You are in the city of ${city}, ${country}`);

      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then(res => res.json())
    .then(data => {
      const [country] = data;
      console.log(country);
      renderData(country);
    })
    .catch(error => console.error(error));
};

btn.addEventListener('click', whereAmI);

*/

// //// --CODING CHALLENGE 2--
/*
Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by
yourself. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives 'imgPath' as an input.
This function returns a promise which creates a new image (use
document.createElement('img')) and sets the .src attribute to the
provided image path

2. When the image is done loading, append it to the DOM element with the
'images' class, and resolve the promise. The fulfilled value should be the
image element itself. In case there is an error loading the image (listen for
the'error' event), reject the promise

3. If this part is too tricky for you, just watch the first part of the solution

PART 2
4. Consume the promise using .then and also add an error handler

5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier

6. After the 2 seconds have passed, hide the current image (set display CSS
property to 'none'), and load a second image (Hint: Use the image element
returned by the 'createImage' promise to hide the current image. You will
need a global variable for that 😉)

7. After the second image has loaded, pause execution for 2 seconds again

8. After the 2 seconds have passed, hide the current image
Test data: Images in the img folder. Test the error handler by passing a wrong
image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
otherwise images load too fast
*/

/*

const wait = seconds =>
  new Promise(resolved => setTimeout(resolved, seconds * 1000));

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image path was not provided'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

*/

// //// --CONSUMING PROMISES WITH ASYNC/AWAIT--

/*
const getPosition = function () {
  return new Promise(function (resolved, reject) {
    navigator.geolocation.getCurrentPosition(resolved, reject);
  });
};

const whereAmI = async function () {
  // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
  //   console.log(res)
  // );

  // //// --ERROR HANDLING WITH TRY...CATCH--
  try {
    // Geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!response.ok) throw new Error('Problem getting location country');

    const [data] = await response.json();
    renderData(data);
    // //// --RETURNING VALUES FROM ASYNC FUNCTIONS--
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong, ${err.message}`);

    throw err;
  }
};

console.log('This is first');
// console.log(whereAmI());
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err}`))
//   .finally(() => console.log('This gets printed 3rd'));

// IIFE (Immediatly Invoke Function Expression)
(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.error(err);
  }
  console.log('This gets printed 3rd');
})();

*/

// //// --RUNNING PROMISES IN PARALLEL--
const get3Contries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);

    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);

    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([...data1.capital, ...data2.capital, ...data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Contries('mexico', 'japan', 'canada');

// /// --OTHER PROMISE COMBINATORS: race, allSettled & any--
// Promise.race

(async function () {
  const [res] = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
    getJSON(`https://restcountries.com/v3.1/name/japan`),
  ]);
  console.log(res);
})();

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
