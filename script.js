//ДОБАВЛЕНИЕ КАРТЫ НА ГЛАВНУЮ СТРАНИЦУ
var map = L.map("map").setView([51.12820816040039, 71.43041229248047], 90);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "OSM",
}).addTo(map);
var marker = L.marker([51.12820816040039, 71.43041229248047]).addTo(map);

/*---------------------------------------*/

// map.on("click", function (e) {
//   L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//   console.log(e);
//   L.Routing.control({
//     waypoints: [
//       L.latLng(51.12820816040039, 71.43041229248047),
//       L.latLng(e.latlng.lat, e.latlng.lng),
//     ],
//   })
//     .on("routesfound", function (e) {
//       e.routes[0].coordinates.forEach(function (coord, index) {
//         setTimeout(function () {
//           marker.setLatLng([coord.lat, coord.lng]);
//         }, 100 * index);
//       });
//     })
//     .addTo(map);
// });

var data = [
  {
    carID: 125,
    startPoint: {
      lat: 51.128236667096736,
      lng: 71.42739222437278,
    },
    endPoint: {
      lat: 51.12710984444874,
      lng: 71.42223233385684,
    },
  },
  {
    carID: 126,
    startPoint: {
      lat: 51.12923564806568,
      lng: 71.4279232318167,
    },
    endPoint: {
      lat: 51.13077612181946,
      lng: 71.4296181646681,
    },
  },
  {
    carID: 127,
    startPoint: {
      lat: 51.127218173092295,
      lng: 71.43342665985487,
    },
    endPoint: {
      lat: 51.124315017315105,
      lng: 71.43652183297749,
    },
  },
];

/*Immitation car routes*/
function createRoute(data) {
  //TODO: ДАННЫЕ ОТОБРАЗИТЬ НА САЙДБАРЕ
  data.forEach(function (item, index) {
    L.marker([item.startPoint.lat, item.startPoint.lng]);
    L.Routing.control({
      waypoints: [
        L.latLng(item.startPoint.lat, item.startPoint.lng),
        L.latLng(item.endPoint.lat, item.endPoint.lng),
      ],
    }).addTo(map);
  });
}
//имитация выгрузка маршрутов из сервера
setTimeout(() => {
  createRoute(data);
}, 5000);

//ДЛЯ ХЕДЕРА функция:  ОТОБРАЗИТЬ МАРШРУТ ОПРЕДЕЛЕННОЙ МАШИНЫ
/*find specific car route*/
function findRoute(carID, data) {
  data.filter((value) => helperFilter(value, carID));
}
function helperFilter(value, carID) {
  //  TODO: Удалить другие роуты  и оставить нужный
  if (value.carID === carID) {
    console.log("FOUND");
    L.marker([value.startPoint.lat, value.startPoint.lng]);
    L.Routing.control({
      waypoints: [
        L.latLng(value.startPoint.lat, value.startPoint.lng),
        L.latLng(value.endPoint.lat, value.endPoint.lng),
      ],
    }).addTo(map);
  }
}

//ищет определенный маршрут
setTimeout(() => {
  findRoute(125, data);
}, 10000);

//TODO:ДОБАВИТЬ ХЕДЕР И ФУНКЦИЮ ПОИСКА МАРШРУТА
//TODO:ДОБАВИТЬ САЙДБАР И В ВЕКАЙЛ ЛИСТЕ ОТОБРАЗИТЬ В КАРТОЧКАХ ВСЕ ДАННЫЕ НА СЕРВЕРЕ О МАШИНЕ ЮЗЕРЕ КМ ВРЕМЯ ДАТА И ТД ТП ЭТИ ЮЗЕРЫ ТАК ЖЕ ДОЛЖНЫ ПОЯВЛЯТЬСЯ НА КРАТЕ (МАРШРУТ)
//TODO: УБРАТЬ ПРАВУЮ ИНФОРМАТИВНУЮ КАРТУ
//TODO: ПРИ РИСОВКЕ МАРШРУТА КАРТА ДЕРГАЕТСЯ И ПЕРЕДВИГАЕТСЯ НА КАЖДЫЙ МАРШРУТ, НАДО СДЕЛАТЬ ТАК ЧТОБЫ КАРТА НЕ МЕНЯЛА ПОЗИЦИЮ ПРИ ПЕРВОМ ВХОДЕ/БЕЗДЕЙСТВИИ
//НА МАРШРУТ ПОВЕСИТЬ ПОПАП С ДАННЫМИ О МАШИНЕ И ЮЗЕРЕ ПРИ КЛИКАНИИ
