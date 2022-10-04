import fetch from 'node-fetch';

const handler = async (event) => {
  const { city } = event.queryStringParameters;

  const API_KEY = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: error.toString(),
      };
    });
};

export { handler };
