import axios from "axios";

function slowNetwork(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export async function getCarparks() {
  const API_END_POINT = `http://ws01.worldskills.org/module_c_api.php/carparks.json`;

  try {
    const response = await axios.get(API_END_POINT);

    const data = Object.entries(response.data).map(([name, value]) => {
      return {
        name,
        ...value,
      };
    });

    return data;
  } catch (error) {
    console.error(`Failed to fetch carpark datas: ${error}`);
  }
}

export async function getEvents(nextUrl) {
  const API_END_POINT = `http://ws01.worldskills.org${nextUrl}`;

  await slowNetwork();

  try {
    const response = await axios.get(API_END_POINT);

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch carpark datas: ${error}`);
  }
}

export async function getWeather() {
  const API_END_POINT = `http://ws01.worldskills.org/module_c_api.php/weather.json`;
  const response = await axios.get(API_END_POINT);

  return response.data;
}
