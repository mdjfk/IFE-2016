/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
// 初始nowSelectCity为aqiSourceData的第一个城市，nowGraTime为第一个radio值
var pageState = {
    nowSelectCity: Object.keys(aqiSourceData)[0],
    nowGraTime: $("#gra-time").elements[0].value
}

var colors = ["#707070", "#980000", "#000066", "#0066CC", "#009933", "#660066", "#708090", "#808000", "#8B4513", "#8FBC8F", "	#9370DB", "	#B0C4DE"];

/**
 * 渲染图表
 */
function renderChart() {
    var blocks = "",
        index = 0;

    switch (pageState.nowGraTime) {
        case "day":
            var city = aqiSourceData[pageState.nowSelectCity];
            for (var date in city) {
                index = Math.floor(Math.random() * colors.length);
                blocks += '<div style="height:' + city[date] + 'px;width:7px;background-color:' + colors[index] + ';" title="' + date + ' [AQI]:' + city[date] + '"></div>';
            }
            break;

        case "week":
            var arr_week = chartData[pageState.nowSelectCity]['week'];
            for (let i = 0; i < arr_week.length; i++) {
                index = Math.floor(Math.random() * colors.length);
                blocks += '<div style="height:' + arr_week[i] + 'px;width:25px;background-color:' + colors[index] + ';" title="第' + (i + 1) + '周 [AQI]:' + arr_week[i] + '"></div>';
            }
            break;

        case "month":
            var arr_month = chartData[pageState.nowSelectCity]['month'];
            for (let i = 0; i < arr_month.length; i++) {
                index = Math.floor(Math.random() * colors.length);
                blocks += '<div style="height:' + arr_month[i] + 'px;width:60px;background-color:' + colors[index] + ';" title="第' + (i + 1) + '月 [AQI]:' + arr_month[i] + '"></div>';
            }
            break;

        default:
            break;
    }

    $("#aqi-chart-wrap").innerHTML = blocks;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(radio) {
    // 确定是否选项发生了变化
    if (radio.value != pageState.nowGraTime) {
        // 设置对应数据
        pageState.nowGraTime = radio.value;
        // 调用图表渲染函数
        renderChart();
    }

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    if ($("#city-select").value != pageState.nowSelectCity) {
        // 更新对应数据
        pageState.nowSelectCity = $("#city-select").value;
        // 调用图表渲染函数
        renderChart();
    }

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    //设置第一个radio选中
    $("#gra-time").elements[0].checked = "checked";
    $("#gra-time").addEventListener("click", function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName.toUpperCase() == "INPUT") {
            graTimeChange(target);
        }
    }, false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var options = "";
    for (var key in aqiSourceData) {
        options +=
            "<option>" + key + "</option>";
    }
    $("#city-select").innerHTML = options;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    $("#city-select").onchange = function () {
        citySelectChange();
    };
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var weekTotal = weekCnt = monthTotal = monthCnt = lastMonth = totalCnt = 0,
        week = [],
        month = [];
    for (var city in aqiSourceData) {
        var cityLength = Object.keys(aqiSourceData[city]).length;
        for (var date in aqiSourceData[city]) {
            totalCnt++;
            var ymd = date.split("-"),
                weekDay = new Date(ymd[0], +ymd[1] - 1, ymd[2]).getDay();
            weekTotal += aqiSourceData[city][date];
            weekCnt++;
            //周日或最后一天
            if (weekDay == 0 || totalCnt == cityLength) {
                week.push(Math.round(weekTotal / weekCnt));
                weekTotal = weekCnt = 0;
            }

            if (totalCnt == 1) {
                // 第一天 起始日
                lastMonth = +ymd[1];
            } else {
                //除了起始日的每个月的一号
                if (+ymd[1] != lastMonth) {
                    month.push(Math.round(monthTotal / monthCnt));
                    monthTotal = monthCnt = 0;
                    lastMonth = +ymd[1];
                }
            }
            monthTotal += aqiSourceData[city][date];
            monthCnt++;

            //最后一天
            if (totalCnt == cityLength) {
                month.push(Math.round(monthTotal / monthCnt));
                monthTotal = monthCnt = 0;
            }

        }

        //month第一项需移除
        month.shift();
        chartData[city] = {
            'week': week,
            'month': month
        };
        weekTotal = weekCnt = monthTotal = monthCnt = lastMonth = totalCnt = 0;
        week = [];
        month = [];
    }

    //初始化显示图表
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

window.onload = function () {
    init();
};
