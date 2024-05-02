import { postCalculate } from "../components/api.js";

const response = document.querySelector(".response");
const deilveryForm = document.querySelector(".deilvery-info");
const from = deilveryForm.from;
const weight = deilveryForm.weight;
const sumoc = deilveryForm.sumoc;

let postConfig = {
  json: "",
  object: "4040",
  service: "22,38,59",
  increment: 50, //Прибавляем к стоимости доставки

  to: "445042", //Откуда
  from: "352120", //Куда

  weight: "2000", //Веc в граммах
  size: "85x18x9", //Размеры в сантиметрах
  sumoc: "573000", //Сумма объявленной ценности с копейками
};

const сommission = (sum) => {
  return sum <= 10000 ? 41.67 + (sum / 100 * 4.17) : 166.67 + (sum / 100 * 3.33);
};

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

const calculate = () => {
  postConfig.weight = weight.value;
  postConfig.sumoc = sumoc.value * 100;
  postConfig.from = from.value;

  postCalculate(postConfig)
    .then((res) => {
      console.log(res);
      const newConfig = {
        json: "",
        object: postConfig.object,
        service: postConfig.service,
        to: postConfig.to,
        from: postConfig.from,
        weight: postConfig.weight,
        size: postConfig.size,
        sumoc: res.sumoc + res.paynds,
      };
      postCalculate(newConfig).then((res) => {

        console.log(res);
        response.innerHTML = "Загрузка...";
        let sum =
          Math.round((res.paynds / 100 + postConfig.increment) / 10) * 10;
        let timeMin = res.delivery.min;
        let timeMax = res.delivery.max;
        let total = postConfig.sumoc / 100 + sum;

        let elem = document.createElement("div");
        elem.classList.add("delivery-result");
        elem.innerHTML = `
            <p>Стоимость доставки: ${formatNumber(sum)} руб.;</p>
            <p>Срок доставки: от ${++timeMin} до ${++timeMax} дней;</p>
            <p>Итого: ${formatNumber(total)} руб.;</p>
            <p>(+ комиссия за денежный перевод через почту России: ${formatNumber(Math.round(сommission(total)))} руб.)</p>
          `;
        response.innerHTML = "";
        response.append(elem);
      });
    })
    .catch((res) => {
      console.error(res);
      response.innerHTML = "";
      response.innerHTML =`Ошибка: ${res}`;
    });
};

const handleSubmit = (event) => {
  event.preventDefault();
  calculate();
};

deilveryForm.addEventListener("submit", handleSubmit);

weight.value = postConfig.weight;
sumoc.value = postConfig.sumoc / 100;
from.value = postConfig.from;
calculate();
