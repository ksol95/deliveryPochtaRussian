(()=>{"use strict";var n="https://delivery.pochta.ru/",e="v2/calculate/tariff/delivery",t=function(n){return n.ok?n.json():Promise.reject(n.status)},l=function(l){var o=new URLSearchParams(l);return fetch("".concat(n).concat(e,"?")+o.toString(),{method:"GET"}).then(t)},o=document.querySelector(".response"),c=document.querySelector(".deilvery-info"),r=c.toIndex,a=c.weight,i=c.sumoc,s={json:"",object:"4040",service:"22",increment:50,to:"681000",from:"445042",weight:"2000",size:"85x18x9",sumoc:"490000"};function u(n){return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1.")}var d=function(){s.weight=a.value,s.sumoc=100*i.value,s.to=r.value,l(s).then((function(n){console.log(n);var e={json:"",object:s.object,service:s.service,to:s.to,from:s.from,weight:s.weight,size:s.size,sumoc:n.sumoc+n.paynds};l(e).then((function(n){console.log(n),o.innerHTML="Загрузка...";var e=10*Math.round(n.paynds/100/10)+s.increment,t=n.delivery.min,l=n.delivery.max,c=s.sumoc/100+e,r=document.createElement("div");r.classList.add("delivery-result"),r.innerHTML="\n            <p>Детали расчёта (не для клиента)</p>\n            <ul>\n              <li>\n                <small>\n                  Тариф: ".concat(Math.round(n.ground.valnds/100)," руб.\n                </small>\n              </li>\n              <li>\n                <small>\n                  Плата за объявленную ценность: ").concat(n.cover.valnds/100," руб.\n                </small>\n              </li>\n              <li>\n                <small>\n                  Опись вложения: ").concat(n.service.valnds/100," руб.\n                </small>\n              </li>\n              <li>\n                <small>\n                  Доп.: ").concat(s.increment," руб.\n                </small>\n              </li>\n              <li>\n                <small><strong>\n                  Чек: ").concat(u(Math.round(n.ground.valnds/100)+n.cover.valnds/100+n.service.valnds/100),"\n                </strong></small>\n              <li>\n                <small><strong>\n                  Чек + доп.: ").concat(u(Math.round(n.ground.valnds/100)+n.cover.valnds/100+n.service.valnds/100+s.increment),"\n                </strong></small>\n              </li>\n            </ul>\n            <p>Расчёт для клиента:</p>\n            <ul>\n              <li>Стоимость доставки: ").concat(u(e)," руб.;</li>\n              <li>Срок доставки: от ").concat(++t," до ").concat(++l," дней;</li>\n              <li>Итого: ").concat(u(c)," руб.;</li>\n              <li>\n                (+ комиссия за денежный перевод через почту России: \n                ").concat(u(Math.round(function(n){return n<=1e4?41.67+n/100*4.17:166.67+n/100*3.33}(c))),"\n                руб.)\n               </li>\n            </ul>\n          "),o.innerHTML="",o.append(r)}))})).catch((function(n){console.error(n),o.innerHTML="",o.innerHTML="Ошибка: ".concat(n)}))};c.addEventListener("submit",(function(n){n.preventDefault(),d()})),a.value=s.weight,i.value=s.sumoc/100,r.value=s.to,d()})();