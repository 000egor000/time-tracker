const API_URL = "https://66a22c88967c89168f1f1327.mockapi.io/api/v1/timers";

const fetchConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const getFetchOptions = (method, body) => ({
  method,
  ...fetchConfig,
  body: JSON.stringify(body),
});

const fetchTimers = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createTimer = async (params) => {
  try {
    return await fetch(API_URL, getFetchOptions("POST", params));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateTimer = async (params, id) => {
  try {
    await fetch(`${API_URL}/${id}`, getFetchOptions("PUT", params));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchTimers, createTimer, updateTimer };
