var log = console.log.bind(console)
// 2,3,5,7,11,13,17,19,
// 根据定义遍历求解
var primeNum = function (num) {
    var primeArr = [2]
    for (var i = 3; i <= num; i+=2) {
        // 被 1 或 自己 整除
        var flag = true
        var n = Math.sqrt(i) // 可以优化算法
        for (var j = 2; j <= n; j++) {
            if (i !== j && i % j === 0) {
                flag = false
            }
        }
        if (flag) {
            primeArr.push(i)
        }
    }
    log(primeArr)
    return primeArr
}

primeNum(100)