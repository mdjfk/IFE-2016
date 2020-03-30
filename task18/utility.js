/**
 * 实现一个简单的$()选择器
 * @param {string} selector (id [class/tag]) (class [id/tag]) id class tag [attr] [attr=sth]
 * @class
 */
function $(selector) {
    var selItem = selector.split(" ");
    if (selItem.length === 1) {
        var aitem = selItem.toString();
        switch (aitem.substr(0, 1)) {
            case "#":
                return document.getElementById(aitem.substr(1));
                break;
            case ".":
                return document.getElementsByClassName(aitem.substr(1));
                break;
            case "[":
                if (aitem.charAt(aitem.length - 1) === "]") {
                    var item = aitem.substring(1, aitem.length - 1);
                    var elements = document.getElementsByTagName("*");
                    if (item.indexOf("=") != -1) {
                        var items = item.split("=");
                        for (var j = 0; j < elements.length; j++) {
                            if (elements[j].getAttribute(items[0]) === items[1]) {
                                return elements[j];
                            }
                        }
                    } else {
                        for (var i = 0; i < elements.length; i++) {
                            if (elements[i].hasAttribute(item)) {
                                return elements[i];
                            }
                        }
                    }
                } else {
                    throw Error("']' is missing !");
                }
                break;
            default:
                return document.getElementsByTagName(aitem);
        }
    } else if (selItem.length === 2) {
        if (selItem[0].substr(0, 1) == "#") {
            var itemId = document.getElementById(selItem[0].substr(1));
            switch (selItem[1].substr(0, 1)) {
                case ".":
                    return itemId.getElementsByClassName(selItem[1].substr(1))[0];
                    break;
                default:
                    return itemId.getElementsByTagName(selItem[1]);
            }
        } else if (selItem[0].substr(0, 1) == ".") {
            var itemClass = document.getElementsByClassName(selItem[0].substr(1));
            switch (selItem[1].substr(0, 1)) {
                case "#":
                    return itemClass.getElementById(selItem[1].substr(1));
                    break;
                default:
                    return itemId.getElementsByTagName(selItem[1]);
            }
        }
    }
}

/**
 * 给一个element绑定一个针对event事件的响应，响应函数为listener
 *
 * @class
 */
function addEvent(element, event, listener) {
    if (typeof element.addEventListener != "undefined") {
        element.addEventListener(event, listener, false);
    } else if (typeof element.attachEvent != "undefined") {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }

}
