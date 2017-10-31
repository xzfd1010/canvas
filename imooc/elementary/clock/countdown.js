var WINDOW_WIDTH
var WINDOW_HEIGHT
var MARGIN_LEFT // 数字距离画布上边缘的距离
var RADIUS // 半径
var MARGIN_TOP  // 数字距离画布左边缘的距离
var NUMBER_MARGIN_LEFT // 每个数字 + margin占的宽度
var COLON_WIDTH // 冒号 + margin的宽度

var endTime = new Date() // 当前时间
endTime.setTime(endTime.getTime() + 3600 * 1000)
var curShowTimeSeconds = 0  // 用于保存当前时间与截止时间秒数的差值

var balls = [] // 保存生成的小球

// 保存小球的随机颜色
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]


window.onload = function () {

    WINDOW_WIDTH = document.body.clientWidth
    WINDOW_HEIGHT = document.body.clientHeight

    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10)
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5)
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108 - 1)  // 除108，总共的数字是108个

    NUMBER_MARGIN_LEFT = 15 * (RADIUS + 1)
    COLON_WIDTH = 9 * (RADIUS + 1)


    var canvas = document.getElementById("canvas")
    var context = canvas.getContext("2d")

    canvas.width = WINDOW_WIDTH
    canvas.height = WINDOW_HEIGHT

    curShowTimeSeconds = getCurrentShowTimeSeconds()
    setInterval(
        function () {
            render(context)
            update()
        }
        , 50
    )
}

function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds() //每过50ms就获取一次当前时间

    var nextHours = parseInt(nextShowTimeSeconds / 3600)
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
    var nextSeconds = nextShowTimeSeconds % 60

    var curHours = parseInt(curShowTimeSeconds / 3600)
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
    var curSeconds = curShowTimeSeconds % 60

    // 通过秒数的比较更新时间，时间发生改变时，生成一系列的小球
    // 同时要检测发生改变的数字
    if (nextSeconds !== curSeconds) {
        // hours第一位
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10))
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + NUMBER_MARGIN_LEFT, MARGIN_TOP, parseInt(curHours % 10))
        }
        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + NUMBER_MARGIN_LEFT * 2 + COLON_WIDTH, MARGIN_TOP, parseInt(nextMinutes / 10))
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + NUMBER_MARGIN_LEFT * 3 + COLON_WIDTH, MARGIN_TOP, parseInt(curMinutes % 10))
        }
        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + NUMBER_MARGIN_LEFT * 4 + COLON_WIDTH * 2, MARGIN_TOP, parseInt(curSeconds / 10))
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + NUMBER_MARGIN_LEFT * 5 + COLON_WIDTH * 2, MARGIN_TOP, parseInt(nextSeconds % 10))
        }

        curShowTimeSeconds = nextShowTimeSeconds
    }

    updateBalls()
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx
        balls[i].y += balls[i].vy
        balls[i].vy += balls[i].g

        // 碰撞检测
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS
            balls[i].vy = -balls[i].vy * 0.75 // 摩擦系数
        }
    }

    // 删除小球的边界条件：右边缘>0，左边缘<画面长度
    var cnt = 0 // 记录保存在画面中的小球
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[i]  // 技巧：cnt之前的小球都是在屏幕中的
        }
    }
    while (balls.length > cnt) {
        balls.pop()
    }

}

// 遍历二维数组，添加小球
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var centerX = x + j * 2 * (RADIUS + 1) + (RADIUS + 1)
                var centerY = y + i * 2 * (RADIUS + 1) + (RADIUS + 1)
                var aBall = {
                    x: centerX,
                    y: centerY,
                    g: 1.5 + Math.random(), // 加速度1.5-2.5
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4, // -4 或者 +4
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall)
            }
        }
    }

}

function getCurrentShowTimeSeconds() {
    var curTime = new Date()
    // var ret = endTime.getTime() - curTime.getTime()
    // ret = Math.round(ret / 1000)

    var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds()
    return ret
    // return ret >= 0 ? ret : 0
}

function render(ctx) {

    // 清空上次的图像
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)

    var hours = parseInt(curShowTimeSeconds / 3600)
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60)
    var seconds = curShowTimeSeconds % 60

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx)
    renderDigit(MARGIN_LEFT + NUMBER_MARGIN_LEFT, MARGIN_TOP, parseInt(hours % 10), ctx)
    renderDigit(MARGIN_LEFT + NUMBER_MARGIN_LEFT * 2, MARGIN_TOP, 10, ctx) // 此时10代表的是数组中的索引
    renderDigit(MARGIN_LEFT + NUMBER_MARGIN_LEFT * 2 + COLON_WIDTH, MARGIN_TOP, parseInt(minutes / 10), ctx) // 此时10代表的是数组中的索引
    renderDigit(MARGIN_LEFT + NUMBER_MARGIN_LEFT * 3 + COLON_WIDTH, MARGIN_TOP, parseInt(minutes % 10), ctx) // 此时10代表的是数组中的索引
    renderDigit(MARGIN_LEFT + NUMBER_MARGIN_LEFT * 4 + COLON_WIDTH, MARGIN_TOP, 10, ctx) // 此时10代表的是数组中的索引
    renderDigit(MARGIN_LEFT + NUMBER_MARGIN_LEFT * 4 + COLON_WIDTH * 2, MARGIN_TOP, parseInt(seconds / 10), ctx) // 此时10代表的是数组中的索引
    renderDigit(MARGIN_LEFT + NUMBER_MARGIN_LEFT * 5 + COLON_WIDTH * 2, MARGIN_TOP, parseInt(seconds % 10), ctx) // 此时10代表的是数组中的索引

    for (var i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color

        ctx.beginPath()
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true)
        ctx.closePath()

        ctx.fill()
    }

}

/**
 * 作用：渲染数字
 * 参数：
 *    1. 开始绘制数字的位置
 *    2. 绘制的数字（两位数字要分别绘制）
 */
function renderDigit(x, y, num, ctx) {
    var centerX, centerY

    ctx.fillStyle = "rgb(0,102,153)"
    // i代表行数，j代表列数
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                centerX = x + j * 2 * (RADIUS + 1) + (RADIUS + 1)
                centerY = y + i * 2 * (RADIUS + 1) + (RADIUS + 1)
                ctx.beginPath()
                ctx.arc(centerX, centerY, RADIUS, 0, 2 * Math.PI, false)
                ctx.closePath()
                ctx.fill()
            }
        }
    }
}
