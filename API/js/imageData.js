var drawing = document.getElementById("drawing")

var context = drawing.getContext("2d")

function drawImageData() {
    var context = drawing.getContext("2d")
    var image = document.images[0]
    var imageData, data, i, len, average, red, green, blue, alpha

    // 绘制原始数据
    context.drawImage(image, 0, 0)
    
    // 取得图像数据
    imageData = context.getImageData(0, 0, drawing.width, drawing.height)
    data = imageData.data

    for (i = 0, len = data.length; i < len; i += 4) {
        red = data[i]
        green = data[i + 1]
        blue = data[i + 2]
        alpha = data[i + 3]

        // 求得平均值
        average = Math.floor((red + green + blue) / 3)

        // 设置颜色值，透明度不变
        data[i] = average
        data[i + 1] = average
        data[i + 2] = average
    }

    // 回写图像数据并显示结果
    imageData.data = data
    context.putImageData(imageData, 0, 0)
}

drawImageData()