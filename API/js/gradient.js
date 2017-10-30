var drawing = document.getElementById("drawing")

var context = drawing.getContext("2d")

// 线性渐变
function drawLinearGradient() {
    var gradient = context.createLinearGradient(30, 30, 70, 70)

    gradient.addColorStop(0, "white")
    gradient.addColorStop(1, "black")

    //绘制红色矩形
    context.fillStyle = "#ff0000"
    context.fillRect(10, 10, 50, 50)

    //绘制渐变矩形
    context.fillStyle = gradient
    context.fillRect(30, 30, 50, 50)
}

function createRectLinearGradient(context, x, y, width, height) {
    return context.createLinearGradient(x, y, x + width, y + width)
}

// drawLinearGradient()

// 径向渐变
function drawRadialGradient() {
    var gradient = context.createRadialGradient(55, 55, 10, 55, 55, 30)

    gradient.addColorStop(0, "white")
    gradient.addColorStop(1, "black")

    //绘制红色矩形
    context.fillStyle = "#ff0000"
    context.fillRect(10, 10, 50, 50)

    // 绘制渐变矩形
    context.fillStyle = gradient
    context.fillRect(30, 30, 50, 50)
}

// drawRadialGradient()


// 同心圆渐变
function drawCircleGradient() {
    var gradient = context.createRadialGradient(100,100,30,100,100,100)

    gradient.addColorStop(0,"deepskyblue")
    gradient.addColorStop(1,"black")

    //绘制圆形
    context.beginPath()
    context.fillStyle = gradient
    context.arc(100,100, 100, 0, 2*Math.PI, false)
    context.fill()

}

drawCircleGradient()



