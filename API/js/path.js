var drawing = document.getElementById("drawing")

var context = drawing.getContext("2d")

function drawClock() {
    context.beginPath()
    // 外圆
    context.arc(100, 100, 99, 0, 2 * Math.PI, false)
    // 内圆
    context.moveTo(194, 100)
    context.arc(100, 100, 94, 0, 2 * Math.PI, false)

        //分针
    context.moveTo(100, 100)
    context.lineTo(100, 15)

    //时针
    context.moveTo(100, 100)
    context.lineTo(35, 100)

    if (context.isPointInPath(100, 100)) {
        console.log("Point(100,100) is in the path")
    }

    context.stroke()
}

function drawText() {
    context.font = "bold 14px Arial"
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText("12", 100, 20)

    // 起点对齐
    context.textAlign = "start"
    context.fillText("12", 100, 40)

    // 终点对齐
    context.textAlign = "end"
    context.fillText("12", 100, 60)
}

// drawClock()
// drawText()

function useMeasureText() {
    var fontSize = 100
    context.font = fontSize + "px Arial"
    context.textBaseline = "middle"

    while (context.measureText("Hello World!").width > 140) {
        fontSize--
        context.font = fontSize + "px Arial"
    }

    context.fillText("Hello World!", 10, 10)
    context.fillText("Font size is " + fontSize + "px", 10, 50)
}

// useMeasureText()

