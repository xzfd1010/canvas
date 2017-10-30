var drawing = document.getElementById("drawing")
var drawing2 = document.getElementById("drawing2")
var drawing3 = document.getElementById("drawing3")

var context = drawing.getContext("2d")
var context2 = drawing2.getContext("2d")
var context3 = drawing3.getContext("2d")

function drawImg1(){
    var image = document.querySelector(".demo")
    context.drawImage(image,10,10)
}

drawImg1()

function drawImg2() {
    var image = document.querySelector(".demo")
    context2.drawImage(image,0,0,200,200)
}

drawImg2()

function drawImg3() {
    var image = document.querySelector(".demo")
    context3.drawImage(image,0,0,670,503,0,0,200,200)
}

drawImg3()