import { postCalculate } from "../components/api.js";

const response = document.querySelector(".response");
const deilveryForm = document.querySelector(".deilvery-info");
const toIndex = deilveryForm.toIndex;
const weight = deilveryForm.weight;
const sumoc = deilveryForm.sumoc;

let postConfig = {
  json: "",
  object: "4040",
  service: "22",
  increment: 50, //Прибавляем к стоимости доставки

  to: "681000", //Куда
  from: "445042", //Откуда

  weight: "2000", //Веc в граммах
  size: "85x18x9", //Размеры в сантиметрах
  sumoc: "490000", //Сумма объявленной ценности с копейками
};

const сommission = (sum) => {
  return sum <= 10000
    ? 41.67 + (sum / 100) * 4.17
    : 166.67 + (sum / 100) * 3.33;
};

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const calculate = () => {
  postConfig.weight = weight.value;
  postConfig.sumoc = sumoc.value * 100;
  postConfig.to = toIndex.value;

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
        let sum = Math.round(res.paynds / 100 / 10) * 10 + postConfig.increment;
        let timeMin = res.delivery.min;
        let timeMax = res.delivery.max;
        let total = postConfig.sumoc / 100 + sum;

        let elem = document.createElement("div");
        elem.classList.add("delivery-result");
        elem.innerHTML = `
            <p>Детали расчёта (не для клиента)</p>
            <ul>
              <li>
                <small>
                  Тариф: ${Math.round(res.ground.valnds / 100)} руб.
                </small>
              </li>
              <li>
                <small>
                  Плата за объявленную ценность: ${res.cover.valnds / 100} руб.
                </small>
              </li>
              <li>
                <small>
                  Опись вложения: ${res.service.valnds / 100} руб.
                </small>
              </li>
              <li>
                <small>
                  Доп.: ${postConfig.increment} руб.
                </small>
              </li>
              <li>
                <small><strong>
                  Итог: ${formatNumber(
                    Math.round(res.ground.valnds / 100) +
                      res.cover.valnds / 100 +
                      res.service.valnds / 100 +
                      postConfig.increment
                  )}
                </strong></small>
              </li>
            </ul>
            <p>Расчёт для клиента:</p>
            <ul>
              <li>Стоимость доставки: ${formatNumber(sum)} руб.;</li>
              <li>Срок доставки: от ${++timeMin} до ${++timeMax} дней;</li>
              <li>Итого: ${formatNumber(total)} руб.;</li>
              <li>
                (+ комиссия за денежный перевод через почту России: 
                ${formatNumber(Math.round(сommission(total)))}
                руб.)
               </li>
            </ul>
          `;
        response.innerHTML = "";
        response.append(elem);
      });
    })
    .catch((res) => {
      console.error(res);
      response.innerHTML = "";
      response.innerHTML = `Ошибка: ${res}`;
    });
};

const handleSubmit = (event) => {
  event.preventDefault();
  calculate();
};

deilveryForm.addEventListener("submit", handleSubmit);

weight.value = postConfig.weight;
sumoc.value = postConfig.sumoc / 100;
toIndex.value = postConfig.to;
calculate();
