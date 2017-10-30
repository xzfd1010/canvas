var drawing = document.getElementById("drawing")

var context = drawing.getContext("2d")

// 导出图像
function drawImg(canvas) {
    var imgURI = canvas.toDataURL("image/png")

    var image = document.createElement("img")

    image.src = imgURI

    document.body.appendChild(image)
}

// 填充
function fill(context){
    context.fillStyle = "#ff0000"

    context.fillRect(10,10,50,50)

    context.fillStyle = "rgba(0,0,255,0.5)"
    context.fillRect(30,30,50,50)
}
// fill(context)
// 描边
function stroke(context){
    
    context.strokeStyle = "#ff0000"
    context.strokeRect(10,10,50,50)

    // 半透明蓝色矩形
    context.strokeStyle = "rgba(0,0,255,.5)"
    context.strokeRect(30,30,50,50)
}
// stroke(context)
function clear(context){
    context.clearRect(40,40,10,10)
}

stroke(context)

clear(context)

// drawImg(drawing)



