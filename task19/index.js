//队列
var myQueue = [81, 48, 56, 78, 36, 100, 68];

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
            alert("队列已有60个元素");
        }
    } else {
        alert("请输入一个10-100的正整数");
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
        alert('队列已经是空的了');
    }
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
            cnt = 0;
        for (var i = 0; i < len - 1; i++) {
            for (var j = i + 1; j < len; j++) {
                // setTimeout(function () {

                //     $("#queue").childNodes[i].style.backgroundColor = "red";
                //     $("#queue").childNodes[j].style.backgroundColor = "red";
                // }, ++cnt * 1000);

                if (myQueue[i] > myQueue[j]) {
                    //交换
                    var temp = myQueue[i];
                    myQueue[i] = myQueue[j];
                    myQueue[j] = temp;

                    //间隔1000ms显示排序过程
                    setTimeout(function (arr) {
                        var myArr = arr.concat();
                        return function () {
                            showQueue(myArr);
                        };
                    }(myQueue), ++cnt * 1000);
                }
            }
        }
    });
    //empty
    addEvent($("#empty"), "click", function () {
        myQueue.length = 0;
        showQueue();
    });

};

window.onload = function () {
    init();
    showQueue();
};
