/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    //从输入获取数据
    var city = $("#aqi-city-input").value.trim(),
        aqi = $("#aqi-value-input").value.trim();
    //验证输入
    if (/^[a-zA-Z]+$/.test(city) || /^[\u4E00-\u9FA5]+$/.test(city)) {
        if (/^\d+$/.test(aqi)) {
            if (typeof aqiData[city] != "undefined") {
                //已存在则不操作
                alert("该城市信息已存在");
            } else {
                //向aqiData中更新一条数据
                aqiData[city] = aqi;
            }
        } else {
            alert('输入空气指数不正确，必须为正整数');
        }

    } else {
        alert('输入城市名称不正确，必须为纯英文或纯中文');
    }

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var rows = "";
    for (var key in aqiData) {
        //如果存在这条数据
        if (typeof aqiData[key] != "undefined") {
            //向rows中保存一条数据
            rows +=
                "<tr>" +
                "    <td>" + key + "</td>" +
                "    <td>" + aqiData[key] + "</td>" +
                "    <td><button data_city=" + key + ">删除</button></td>" +
                "</tr>";
        }

    }
    //将所有数据填入aqi-table中
    $("#aqi-table").innerHTML = rows;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    //删除aqiData中的数据
    var key = target.getAttribute("data_city");
    aqiData[key] = undefined;
    //更新表格
    renderAqiList();
}

function init() {
    // 给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $("#add-btn").addEventListener("click", function () {
        addBtnHandle();
    }, false);
    // 给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    $("body")[0].addEventListener("click", function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName.toUpperCase() === "BUTTON") {
            switch (target.innerHTML) {
                case "删除":
                    delBtnHandle(target);
                    break;
                default:
                    break;
            }
        }

    }, false);
}

// window.onload = init;
window.onload = function () {
    init();
};
