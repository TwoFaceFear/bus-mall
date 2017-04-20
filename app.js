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

function imageClick(event) {
  var image = event.target;
  console.log(image);
  var photosOnScreenIndex = image.getAttribute('photos-on-screen-index');
  photosCurrentlyOnScreen[photosOnScreenIndex].clickCount++;

  clicksRemaining--;

  if(clicksRemaining > 0){
    renderPhotoChoices();
  } else {
    photoConcat();
    chartDisplay();
    try {
      localStorage.photos = JSON.stringify(photos);
    } catch (error) {
      console.log('uh-oh spagetti-o');
    }
  }
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

  photosOnPreviousScreen = photos.concat(photosCurrentlyOnScreen);
  return photosCurrentlyOnScreen;
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

function photoConcat(){
  photos = photos.concat(photosCurrentlyOnScreen);
  photos = photos.concat(photosOnPreviousScreen);
  photos = photos.concat(photosOnSecondToLastScreen);
}

function chartDisplay(){
  var ctx = document.getElementById("chart-controller");
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
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
