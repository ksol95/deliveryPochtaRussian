const requestConfig = {
  baseUrl: "https://delivery.pochta.ru/",
  reference: "v2/dictionary/category",
  calculate: "v2/calculate/tariff/delivery",
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};

const postCalculate = (date) => {
  let query = new URLSearchParams(date);
  return fetch(
    `${requestConfig.baseUrl}${requestConfig.calculate}?` + query.toString(),
    {
      method: "GET",
      
    }
  ).then(checkResponse);
};

const reference = (date) => {
  return fetch(`${requestConfig.baseUrl}${requestConfig.reference}`, {
    method: "GET",
    headers: requestConfig.headers,
    body: JSON.stringify(date),
  }).then(checkResponse);
};

export { postCalculate };
