//队列
var myQueue = [];

//显示队列
function showQueue() {
    var str = "";
    myQueue.forEach(function (item, index) {
        str += "<div data_i=" + index + ">" + item + "</div>"
    });
    $("#queue").innerHTML = str;
}

//数据入队列
function queueIn(func) {
    var input = $("#input").value.trim().split(/\s|、|，|,/);
    input.forEach(function (item) {
        if (!/^[0-9a-zA-z]|[\u4e00-\u9fff]$/.test(item)) {
            alert("输入项只能为数字、中文、英文");
        }
    });

    // if (/^\d+$/.test(input)) {
    //     if (typeof func == "function") {
    //         func.call(myQueue, +input);
    //     }
    //     showQueue();
    // } else {
    //     alert("请输入一个正数，可以为整数或小数");
    // }
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

    //点击队列中元素的响应
    addEvent($("#queue"), "click", function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.className.indexOf("queue") == -1 && target.nodeName.toUpperCase() == "DIV") {
            var i = target.getAttribute("data_i");
            myQueue.splice(i, 1);
            target.remove();
        }
    });
};

window.onload = function () {
    init();
};
