var dog,happyDog,database,foodS,foodStock;
var addFood,feedFood;
var lastFed,fedTime;
var foodObj;

function preload()
{
  doggyImg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(displayWidth, displayHeight);
database = firebase.database()  
dog = createSprite(displayWidth-100,displayHeight/2,10,10)
dog.addImage(doggyImg);
dog.scale = 0.3;

addFood = createButton("ADD FOOD🥛");
addFood.position(displayWidth/2,100);

feedFood = createButton("FEED LENO MILK🥛")
feedFood.position(1250,100);

addFood.mousePressed(AddFood);
feedFood.mousePressed(FeedFood)

foodObj = new Milk();

foodStock=database.ref('Food')
foodStock.on("value",readStock);

}


function draw() {  

background("yellow");

foodObj.display();

  drawSprites();
  
fedTime = database.ref("FeedTime");
fedTime.on("value",function(data){

lastFed = data.val();

})

textSize(25);
fill("orange");
strokeWeight(3);
stroke("red");
text("FOOD REMAINING: "+ foodS,displayWidth/2.5,70);

strokeWeight(2);
stroke("black")
fill("white");
textSize(20)
if(lastFed>=12){
text("LAST FEED : "+ lastFed%12 + "PM",displayWidth-700,30);
}else if(lastFed == 0){
text("LAST FEED : 12 AM",displayWidth-700,30)
}else{
text("LAST FEED : "+ lastFed + "AM",displayWidth-700,30);
}  
//text("NOTE: Press up arrow'^'to feed LENO 🥛",270,50);
}

function AddFood(){

foodS++;
database.ref('/').update({

Food: foodS

})

}

function FeedFood() {

dog.addImage( happyDog);


if(foodS<=0){

foodS = 0

}else{

foodS-=1

}

database.ref('/').update({
  Food:foodS,
  FeedTime:hour()
})
}

function readStock(data){


foodS = data.val();


}
/*function writeStocks(x) {
if(x<=0){

x = 0

}else{

x = x-1;

}

database.ref('/').update({Food:x})






}*/