var drawing = document.getElementById("drawing")
var context = drawing.getContext("2d")

function drawShadow(){
    // 设置阴影
    context.shadowOffsetX = 5
    context.shadowOffsetY = 5
    context.shadowBlur = 4
    context.shadowColor = "rgba(0,0,0,0.5)"

    // 红色矩形
    context.fillStyle = "#ff0000"
    context.fillRect(10,10,50,50)

    // 绘制蓝色矩形
    context.fillStyle = "rgba(0,0,255,1)"
    context.fillRect(30,30,50,50)


}

drawShadow()