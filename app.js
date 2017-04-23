'use strict';


var app = document.getElementById('app');
var clicksRemaining = 25;
var photosOnSecondToLastScreen = [];
var photosOnPreviousScreen = [];
var photosCurrentlyOnScreen = [];

var photos = [
  new Photo('bag', 'bag.jpg'),
  new Photo('banana', 'banana.jpg'),
  new Photo('bathroom', 'bathroom.jpg'),
  new Photo('boots', 'boots.jpg'),
  new Photo('breakfast', 'breakfast.jpg'),

  new Photo('bubblegum', 'bubblegum.jpg'),
  new Photo('chair', 'chair.jpg'),
  new Photo('cthulhu', 'cthulhu.jpg'),
  new Photo('dog-duck', 'dog-duck.jpg'),
  new Photo('dragon', 'dragon.jpg'),

  new Photo('pen', 'pen.jpg'),
  new Photo('pet-sweep', 'pet-sweep.jpg'),
  new Photo('scissors', 'scissors.jpg'),
  new Photo('shark', 'shark.jpg'),
  new Photo('sweep', 'sweep.png'),

  new Photo('tauntaun', 'tauntaun.jpg'),
  new Photo('unicorn', 'unicorn.jpg'),
  new Photo('usb', 'usb.gif'),
  new Photo('water-can', 'water-can.jpg'),
  new Photo('wine-glass', 'wine-glass.jpg'),
];

try {
  photos = JSON.parse(localStorage.photos);
} catch (error) {
  console.log('error getting local storage.');
}

renderPhotoChoices();

function Photo(name, fileName) {
  this.name = name;
  this.src = './img/' + fileName;
  this.clickCount = 0;
  this.displayCount = 0;
}

function getRandomIndex(list){
  return Math.floor(Math.random() * list.length);
}


function getThreePhotos(){

  photos = photos.concat(photosOnSecondToLastScreen);
  photosOnSecondToLastScreen = photosOnPreviousScreen;
  photosOnPreviousScreen = photosCurrentlyOnScreen;

  photosCurrentlyOnScreen = [];

  var nextPhoto = photos.splice(getRandomIndex(photos), 1);
  photosCurrentlyOnScreen = photosCurrentlyOnScreen.concat(nextPhoto);
  nextPhoto = photos.splice(getRandomIndex(photos), 1);
  photosCurrentlyOnScreen = photosCurrentlyOnScreen.concat(nextPhoto);
  nextPhoto = photos.splice(getRandomIndex(photos), 1);
  photosCurrentlyOnScreen = photosCurrentlyOnScreen.concat(nextPhoto);
}

function imageClick(event) {
  var image = event.target;
  console.log(image);
  var photosOnScreenIndex = image.getAttribute('photos-on-screen-index');
  photosCurrentlyOnScreen[photosOnScreenIndex].clickCount++;

  clicksRemaining--;

  if(clicksRemaining > 0){
    renderPhotoChoices();
  } else {
    renderChart();
    try {
      photos = JSON.stringify(localStorage.photos);
    } catch (error) {
      console.log('uh-oh spagetti-oh');
    }
  }
}

function renderPhotoChoices() {
  getThreePhotos();

  app.textContent = '';

  var imageElement;
  for(var i = 0; i < photosCurrentlyOnScreen.length; i++){
    imageElement = document.createElement('img');
    imageElement.setAttribute('photos-on-screen-index',i);
    imageElement.src = photosCurrentlyOnScreen[i].src;
    imageElement.addEventListener('click', imageClick);
    app.appendChild(imageElement);
  }
}

function renderChart(){
  photos = photos.concat(photosCurrentlyOnScreen);
  console.log('photos in array',photos);
  console.log('photos currently on screen', photosCurrentlyOnScreen);
  photos = photos.concat(photosOnPreviousScreen);
  console.log('photos on previous screen',photosOnPreviousScreen);
  photos = photos.concat(photosOnSecondToLastScreen);

  app.textContent = '';

  var ctx = document.getElementById('chart-controller');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        photos[0].name,
        photos[1].name,
        photos[2].name,
        photos[3].name,
        photos[4].name,
        photos[5].name,
        photos[6].name,
        photos[7].name,
        photos[8].name,
        photos[9].name,
        photos[10].name,
        photos[11].name,
        photos[12].name,
        photos[13].name,
        photos[14].name,
        photos[15].name,
        photos[16].name,
        photos[17].name,
        photos[18].name,
        photos[19].name,
      ],
      datasets: [{
        label: 'How many times you clicked the picture',
        data: [

       ]
        backgroundColor: 'rgba(0, 0, 0, 1)'
        borderColor: '#0BFF01'
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}
