var drawing = document.getElementById("drawing")

var context = drawing.getContext("2d")

function transformContext() {
    context.beginPath()

    context.arc(100, 100, 99, 0, 2 * Math.PI, false)

    context.moveTo(194, 100)
    context.arc(100, 100, 94, 0, 2 * Math.PI, false)

    // 变换原点
    context.translate(100, 100)

    context.rotate(1)

    // 绘制分针
    context.moveTo(0, 0)
    context.lineTo(0, -85)

    // 绘制时针
    context.moveTo(0, 0)
    context.lineTo(-65, 0)

    // 描边路径
    context.stroke()
}

// transformContext()

function saveAndRestore() {
    context.fillStyle = "#ff0000"
    context.save()

    context.fillStyle = "#00ff00"
    context.translate(100,100)
    context.save()

    context.fillStyle = "#0000ff"
    context.fillRect(0,0,100,200) // 蓝色矩形

    context.restore()
    context.fillRect(10,10,100,200) // 绿色矩形

    context.restore() // 不仅仅是画笔的样式，还有坐标的位置
    context.fillRect(0,0,100,200) // 红色矩形

}

saveAndRestore()