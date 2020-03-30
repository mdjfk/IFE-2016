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

function buildQueue(func, msg) {
    var input = $("#input").value.trim();
    if (/^\d+$/.test(input)) {
        //验证为数字
        if (typeof Array[func] == "function") {
            Array[func].call(myQueue, +input);
            // myQueue.func(+input);
        }
        showQueue();
    } else {
        alert(msg);
    }
}

//初始化button事件
function init() {
    //4个按钮的响应
    addEvent($("#btnGroup"), "click", function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName.toUpperCase() == "BUTTON") {
            var input = $("#input").value.trim();
            if (/^\d+$/.test(input)) {
                //验证为数字
                switch (target.id) {
                    case "leftIn":
                        //左侧入响应事件
                        myQueue.unshift(+input);
                        showQueue();
                        break;
                    case "rightIn":
                        //右侧入响应事件
                        myQueue.push(+input);
                        showQueue();
                        break;
                    case "leftOut":
                        //左侧出响应事件
                        myQueue.shift();
                        showQueue();
                        break;
                    case "rightOut":
                        //右侧出响应事件
                        myQueue.pop();
                        showQueue();
                        break;
                    default:
                        break;
                }

            } else {
                alert("请输入一个正数，可以为整数或小数");
            }

        }

    });
    //点击队列中元素的响应
    addEvent($("#queue"), "click", function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.className.indexOf("queue") == -1 && target.nodeName.toUpperCase() == "DIV") {
            //TODO:
        }
    });
    // //左侧入响应事件
    // addEvent($("#leftIn"), "click", function () {
    //     buildQueue(Array.unshift, info);
    // });

    // //右侧入响应事件
    // addEvent($("#rightIn"), "click", function () {
    //     buildQueue(push, info);
    // });

    // //左侧出响应事件
    // addEvent($("#leftOut"), "click", function () {
    //     buildQueue(shift, info);
    // });

    // //右侧出响应事件
    // addEvent($("#rightOut"), "click", function () {
    //     buildQueue(pop, info);
    // });
};

window.onload = function () {
    init();
};
