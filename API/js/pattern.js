var drawing = document.getElementById("drawing")

var context = drawing.getContext("2d")

// var image = document.images[0]

var image = new Image()
image.src = "/img/demo.jpg"
console.log(image instanceof Node)
image.onload = function(){
    var pattern = context.createPattern(image,"repeat")
    context.fillStyle = pattern
    context.fillRect(10, 10,2000, 2000)
}


