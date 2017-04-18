'use strict';

var images = [];

var bag = new Image('bag', 'img/bag.jpg');
var banana = new Image('banana', 'img/banana.jpg');
var bathroom = new Image('bathroom', 'img/bathroom.jpg');
var boots = new Image('boots', 'img/boots.jpg');
var breakfast = new Image('breakfast', 'img/breakfast.jpg');
var bubblegum = new Image('bubblegum', 'img/bubblegum.jpg');
var chair =new Image('chair', 'img/chair.jpg');
var cthulhu = new Image('cthulhu', 'img/cthulhu.jpg');
var dogDuck = new Image('dog duck', 'img/dog-duck.jpg');
var dragon = new Image('dragon', 'img/dragon.jpg');
var pen = new Image('pen', 'img/pen.jpg');
var petSweep =new Image('pet sweep', 'img/pet.jpg');
var scissors = new Image('scissors', 'img/scissors');
var shark = new Image('shark', 'img/shark.jpg');
var sweep = new Image('sweep', 'img/sweep.png');
var tauntaun = new Image('tauntaun', 'img/tauntaun.jpg');
var unicorn = new Image('unicorn', 'img/unicorn.jpg');
var usb = new Image('usb', 'img/usb.gif');
var water = new Image('water', 'img/water.jpg');
var wineGlass = new Image('wine glass', 'img/wine-glass.jpg');

function Image(title, location){
  this.title = title;
  this.location = location;
  this.end = 0;
}
Image.prototype.rng = function(){
  min = Math.ceil(0);
  max = Math.floor(images.length);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
console.log(images.length);
