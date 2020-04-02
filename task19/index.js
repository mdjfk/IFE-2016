//队列
var myQueue = [];

//显示队列
function showQueue() {
    var str = "";
    arr = arguments[0] || myQueue;
    arr.forEach(function (item) {
        str += "<div style='height: " + item + "px;' title='" + item + "'></div>";
    });
    $("#queue").innerHTML = str;
}

//数据入队列
function queueIn(func) {
    var input = $("#input").value.trim();
    if (/^\d+$/.test(input) && +input >= 10 && +input <= 100) {
        if (myQueue.length < 60) {
            if (typeof func == "function") {
                func.call(myQueue, +input);
            }
            showQueue();
        } else {
            alert("There are 60 elements in the queue");
        }
    } else {
        alert("Please input a positive integer within the range of [10,100]");
    }
}

//数据出队列
function queueOut(func) {
    if (myQueue.length > 0) {
        if (typeof func == "function") {
            alert(func.call(myQueue));
        }
        showQueue();
    } else {
        alert('The queue is empty');
    }
}

//生成随机队列
function randomQueue(num) {
    for (var i = 0; i < num; i++) {
        myQueue.push(Math.floor(Math.random() * 91 + 10));
    }
    showQueue();
}

//初始化button事件
function init() {
    // 4个按钮的响应
    addEvent($("#leftIn"), "click", function () {
        queueIn(Array.prototype.unshift);
    });

    addEvent($("#rightIn"), "click", function () {
        queueIn(Array.prototype.push);
    });

    addEvent($("#leftOut"), "click", function () {
        queueOut(Array.prototype.shift);
    });

    addEvent($("#rightOut"), "click", function () {
        queueOut(Array.prototype.pop);
    });

    //sort
    addEvent($("#sort"), "click", function () {
        var len = myQueue.length,
            cnt = 0,
            interval = $("#interval").value || 700,
            div = $("#queue").getElementsByTagName("div"),
            divLen = div.length;
        for (var i = 0; i < len - 1; i++) {
            for (var j = i + 1; j < len; j++) {
                var markRed = function (a, b) {
                    return function () {
                        for (var k = 0; k < divLen; k++) {
                            div[k].style.backgroundColor = (k == a || k == b) ? "red" : "pink";
                        }
                    };
                };
                //将正在比较元素的颜色标记为红色
                setTimeout(markRed(i, j), cnt++ * interval);

                if (myQueue[i] > myQueue[j]) {
                    //交换
                    var temp = myQueue[i];
                    myQueue[i] = myQueue[j];
                    myQueue[j] = temp;

                    //间隔1000ms显示排序过程
                    setTimeout(function (arr, i, j) {
                        var myArr = arr.concat();
                        return function () {
                            //显示交换后的队列
                            showQueue(myArr);
                            //将正在比较元素的颜色标记为红色
                            markRed(i, j)();
                        };
                    }(myQueue, i, j), cnt++ * interval);
                }
            }
        }

        setTimeout(function () {
            //重新显示（把所有元素都标记成pink）
            showQueue();
        }, cnt++ * interval);

    });

    //random button
    addEvent($("#random"), "click", function () {
        randomQueue(8);
    });

    //empty button
    addEvent($("#empty"), "click", function () {
        myQueue.length = 0;
        showQueue();
    });

};

window.onload = function () {
    init();
};
