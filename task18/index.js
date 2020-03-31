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

//初始化button事件
function init() {
    // 4个按钮的响应
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
                        alert(myQueue.shift());
                        showQueue();
                        break;
                    case "rightOut":
                        //右侧出响应事件
                        alert(myQueue.pop());
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
            var i = target.getAttribute("data_i");
            myQueue.splice(i, 1);
            target.remove();
            // showQueue();
        }
    });

};

window.onload = function () {
    init();
};
