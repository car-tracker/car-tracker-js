//ДОБАВЛЕНИЕ КАРТЫ НА ГЛАВНУЮ СТРАНИЦУ
var map = L.map("map").setView([51.12820816040039, 71.43041229248047], 90);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "OSM",
}).addTo(map);
var marker = L.marker([51.12820816040039, 71.43041229248047]).addTo(map);
let data = [
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
    progress: "In progress",
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
    progress: "Completed",
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
    progress: "In progress",
  },
  {
    carID: 128,
    startPoint: {
      lat: 51.127218173092295,
      lng: 71.43342665985487,
    },
    endPoint: {
      lat: 51.1243150173151,
      lng: 71.43652183297749,
    },
    progress: "In progress",
  },
];


let vechileShowList = document.querySelector(".vechile_info");
vechileShowList.onclick = function () {
  data.map(function (item) {
    return {
      carID: item.carID,
      startPoint: item.startPoint.lat,
      endPoint: item.endPoint.lat,
      progess: item.progress,
    };
  });
  data.forEach((cars) => {
    var div = document.querySelector("#cars");
    div.innerHTML =
      div.innerHTML +
      `
    <div class="row">
    <div class="block">
    <div class="cards">
    <div class="card">
    <div class="card-info">
    <p style="color: #6c757d;">Car ID</p>
       <h5 class="car-id">${cars.carID}</h5>
       <p style="color: #6c757d;">Location</p>
       <h5>${cars.startPoint.lat}, ${cars.endPoint.lat}</h5>
       <div class="progress"></div>
       </div> 
       <p class="progress-info">${cars.progress}</p>
       </div>
       </div>
       </div>
       </div>
    `;
  });
};

function createRoute(data) {
  data.forEach(function (item) {
    L.Routing.control({
      waypoints: [
        L.latLng(item.startPoint.lat, item.startPoint.lng),
        L.latLng(item.endPoint.lat, item.endPoint.lng),
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "green", opacity: 1, weight: 5 }],
      },
      createMarker: function (i, waypoint, n) {
        var marker_icon = null;
        if (i == 0) {
          marker_icon = L.icon({
            iconUrl: "img/red.png",
            iconSize: [20, 29],
            iconAnchor: [10, 29],
            popupAnchor: [0, -29],
          });
        } else if (i == n - 1) {
          marker_icon = L.icon({
            iconUrl: "img/blue.png",
            iconSize: [20, 29],
            iconAnchor: [10, 29],
            popupAnchor: [0, -29],
          });
        }
        return L.marker(waypoint.latLng, {
          draggable: false,
          bounceOnAdd: false,
          bounceOnAddOptions: {
            duration: 1000,
            height: 800,
            function() {
              bindPopup(myPopup).openOn(map);
            },
          },
          icon: marker_icon,
        });
      },
    }).addTo(map);
  });
}
//имитация выгрузка маршрутов из сервера
setTimeout(() => {
  createRoute(data);
}, 3000);

let search = document.querySelector("#search");

search.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    e.preventDefault();
    findRoute(search.value, data);
  }
});

function findRoute(carID, data) {
  data.map((car) => {
    if (car.carID === Number(carID)) {
      L.marker([car.startPoint.lat, car.startPoint.lng]);
      L.Routing.control({
        waypoints: [
          L.latLng(car.startPoint.lat, car.startPoint.lng),
          L.latLng(car.endPoint.lat, car.endPoint.lng),
        ],
      }).addTo(map);
    }
  });
}
//НА МАРШРУТ ПОВЕСИТЬ ПОПАП С ДАННЫМИ О МАШИНЕ И ЮЗЕРЕ ПРИ КЛИКАНИИ
