var drawing = document.getElementById("drawing")

var context = drawing.getContext("2d")

function drawGlobalAlpha() {
    context.globalAlpha = .5

    // 蓝色矩形
    context.fillStyle = "blue"
    context.fillRect(0,0,100,100)
}

function drawGlobalCompositionOperation() {
    // 红色矩形
    context.fillStyle = "#ff0000"
    context.fillRect(10,10,50,50)

    // 设置合成操作
    context.globalCompositeOperation = "destinatio"

    // 绘制蓝色矩形
    context.fillStyle = "rgba(0,0,255,1)"
    context.fillRect(30,30,50,50)

}

drawGlobalCompositionOperation()
