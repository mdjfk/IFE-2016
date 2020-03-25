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
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}
var colors = ["#000080", "#0000FF", "#00BFFF", "#00CED1", "#00FF7F", "#00FFFF", "#483D8B", "#7B68EE", "#C71585", "#FF0000", "#FFA500", "#FFFF00"];
/**
 * 渲染图表
 */
function renderChart() {

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化

    // 设置对应数据

    // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(option) {
    // 确定是否选项发生了变化
    if ($("#city-select").value != option.innerHTML) {
        //选项发生了变化
        // 更新对应数据
        pageState.nowSelectCity = option.getAttribute("data_no");
        // 调用图表渲染函数
        renderChart();
    }

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var options = "",
        cnt = 0;
    for (var key in aqiSourceData) {
        options +=
            "<option data_no=" + (cnt++) + ">" + key + "</option>";
    }
    $("#city-select").innerHTML = options;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    $("#city-select").addEventListener("click", function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        citySelectChange(target);
    }, false);


}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var weekTotal = 0,
        weekCnt = 0,
        monthTotal = 0,
        monthCnt = 0;
    var week = [],
        month = [];
    for (var city in aqiSourceData) {
        for (var date in aqiSourceData[city]) {
            var ymd = date.split("-"),
                weekDay = new Date(ymd[0], +ymd[1] - 1, ymd[2]).getDay();
            weekTotal += aqiSourceData[city][date];
            weekCnt++;
            monthTotal += aqiSourceData[city][date];
            monthCnt++;
            if (weekDay == 0) {
                week.push(Math.round(weekTotal / weekCnt));
                weekTotal = weekCnt = 0;
            }
            // 一个月的最后一天
            //if () {

            // }

        }
        chartData[city] = week;
    }
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
