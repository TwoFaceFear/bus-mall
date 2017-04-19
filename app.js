'use strict';

function Image(title, location){
  this.title = title;
  this.location = './' + location;
  this.endCount = 0;
  this.clickCount = 0;
}

var currentPage = [];
var previousPage = [];
var secondToLastpage = [];

// an array of photos
var images = [
  new Image('bag', 'img/bag.jpg'),
  new Image('banana', 'img/banana.jpg'),
  new Image('bathroom', 'img/bathroom.jpg'),
  new Image('boots', 'img/boots.jpg'),
  new Image('breakfast', 'img/breakfast.jpg'),
  new Image('bubblegum', 'img/bubblegum.jpg'),
  new Image('chair', 'img/chair.jpg'),
  new Image('cthulhu', 'img/cthulhu.jpg'),
  new Image('dog-duck', 'img/dog-duck.jpg'),
  new Image('dragon', 'img/dragon.jpg'),
  new Image('pen', 'img/pen.jpg'),
  new Image('pet-sweep', 'img/pet.jpg'),
  new Image('scissors', 'img/scissors'),
  new Image('shark', 'img/shark.jpg'),
  new Image('sweep', 'img/sweep.png'),
  new Image('tauntaun', 'img/tauntaun.jpg'),
  new Image('unicorn', 'img/unicorn.jpg'),
  new Image('usb', 'img/usb.gif'),
  new Image('water', 'img/water.jpg'),
  new Image('wine-glass', 'img/wine-glass.jpg'),
];

// random number generator
function rng(list){
  return Math.floor(Math.random() * list.length);
}

// using the rng takes the three photos and makes sure they dont repeat either on the page or on the previous page
function threePhotos(){

  images = images.concat(secondToLastpage);
  secondToLastpage = previousPage;
  previousPage = currentPage;

  currentPage = [];

  var nextPhoto = images.splice(rng(images), 1);
  currentPage = currentPage.concat(nextPhoto);
  nextPhoto = images.splice(rng(images), 1);
  currentPage = currentPage.concat(nextPhoto);
  nextPhoto = images.splice(rng(images), 1);
  currentPage = currentPage.concat(nextPhoto);

  previousPage = images.concat(currentPage);
  return currentPage;
}

// render the images to the page
var image1 = document.getElementById(image1);
var image2 = document.getElementById(image2);
var image3 = document.getElementById(image3);

image1 = appendChild();

// click counter that stops the the page after 25 clicks
// and the counters for how many times a specific image is clicked
