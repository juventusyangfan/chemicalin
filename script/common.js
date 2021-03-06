    //公共ajax方法
    (function ($) {
        $.extend({
            ajaxForJson: function ajaxForJson(requestUrl, requestData, successCallback, errorCallback, successPar) {
                // if (typeof (requestData) == "string") {
                //     var dataArr = requestData.split("&"), escapeArr = [];
                //     for (var i = 0; i < dataArr.length; i++) {
                //         var key = dataArr[i].split("=")[0],
                //             val = dataArr[i].split("=")[1];
                //         if (key != "editorValue") {
                //             val = libs.html2Escape(decodeURIComponent(val));
                //             val = encodeURIComponent(val);
                //         }
                //         escapeArr.push(key + "=" + val);
                //     }
                //     requestData = escapeArr.join("&");
                // }
                // else if (typeof (requestData) == "object") {
                //     for (var k in requestData) {
                //         requestData[k] = libs.html2Escape(requestData[k].toString());
                //     }
                // }
                $.ajax({
                    type: "POST",
                    url: requestUrl,
                    data: requestData,
                    // xhrFields: {
                    //     withCredentials: true
                    // },
                    // crossDomain: true,
                    dataType: "json",
                    contentType: "application/x-www-form-urlencoded",
                    success: function success(data) {
                        var dataObj = null;
                        try {
                            dataObj = eval('(' + data + ')');
                        } catch (ex) {
                            dataObj = data;
                        }
                        if (dataObj.data && dataObj.data.status == "not_login") {
                            //$.messageDialog({
                            //    title: "提示",
                            //    icon: "warning",
                            //    content: dataObj.msg,
                            //    time: 1000
                            //});
                            //setTimeout(function () {
                            //    window.location.href = dataObj.data;
                            //}, 1000);
                            $.loginDialog();
                        } else {
                            if (successCallback) {
                                successCallback(dataObj, successPar);
                            }
                        }
                    },
                    error: function error(err) {
                        if (errorCallback) {
                            errorCallback();
                        }
                    },
                    complete: function complete(XHR, TS) {
                        XHR = null;
                    }
                });
            },
            ajaxJSONP: function ajaxJSONP(requestUrl, requestData, callback, errorCallback, successPar) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: requestUrl,
                    data: requestData,
                    // xhrFields: {
                    //    withCredentials: true
                    // },
                    // crossDomain: true,
                    dataType: "jsonp",
                    jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数吿(一般默认为:callback)
                    success: function success(json) {
                        if (json.data && json.data.status == "not_login") {
                            //$.messageDialog({
                            //    title: "提示",
                            //    icon: "warning",
                            //    content: dataObj.msg,
                            //    time: 1000
                            //});
                            //setTimeout(function () {
                            //    window.location.href = dataObj.data;
                            //}, 1000);
                            $.loginDialog();
                        } else {
                            if (callback) {
                                callback(json, successPar);
                            }
                        }
                    },
                    error: function error(err) {
                        err;
                    }
                });
            },
            cachedScript: function cachedScript(url, options) {
                var scriptsArray = new Array();
                //循环script标记数组
                for (var s in scriptsArray) {
                    //如果某个数组已经下载到了本地
                    if (scriptsArray[s] == url) {
                        return { //则返回一个对象字面量，其中的done之所以叫做done是为了与下面$.ajax中的done相对应
                            done: function done(method) {
                                if (typeof method == 'function') {
                                    //如果传入参数为一个方法
                                    method();
                                }
                            }
                        };
                    }
                }
                //这里是jquery官方提供类似getScript实现的方法，也就是说getScript其实也就是对ajax方法的一个拓展
                options = $.extend(options || {}, {
                    dataType: "script",
                    url: url,
                    cache: true //其实现在这缓存加与不加没多大区别
                });
                scriptsArray.push(url); //将url地址放入script标记数组中
                return $.ajax(options);
            }
        });
    })(jQuery);

    (function ($) {
        var timeObj = null;
        $.extend({
            msgTips: function (options) {
                var settings = {
                    type: "success",
                    icon: "",
                    content: "成功",
                    time: 1000,
                    callback: null
                };
                $.extend(settings, options || {});
                var msgTipsHtml = '';
                if ($(".cjy-poplayer").length === 0) {
                    msgTipsHtml = '<div class="cjy-bg" style="height: ' + $(document).outerHeight() + 'px;"></div><div class="cjy-msgTips"><p class="cjy-msgTips-inner">';
                } else {
                    msgTipsHtml = '<div class="cjy-msgTips"><p class="cjy-msgTips-inner">';
                }
                if (settings.type === "success") {
                    settings.icon = "icongou";
                } else if (settings.type === "warning") {
                    settings.icon = "icongantanhao";
                } else if (settings.type === "error") {
                    settings.icon = "iconcha1";
                }
                msgTipsHtml += '<i class="icon iconfont ' + settings.icon + ' ' + settings.type + '"></i><span>' + settings.content + '</span></p></div>';
                $("body").eq(0).append(msgTipsHtml);
                if ($(".cjy-poplayer").length !== 0) {
                    $(".cjy-bg").css("z-index", "101");
                }
                var ele = $(".cjy-msgTips");
                ele.css({
                    "left": ($(window).outerWidth() - ele.outerWidth()) / 2 + "px",
                    "top": $(document).scrollTop() + ele.outerHeight() + "px",
                    "z-index": 102
                });
                ele.fadeIn(400);
                setTimeout(function () {
                    ele.fadeOut(400, function () {
                        ele.remove();
                    });
                    if ($(".cjy-poplayer").length == 0) {
                        $(".cjy-bg").fadeOut(400, function () {
                            $(".cjy-bg").remove();
                        });
                    } else {
                        $(".cjy-bg").css("z-index", "99");
                    }
                    if (settings.callback !== null) {
                        settings.callback();
                    }
                }, settings.time);
            }
        });
    })(jQuery);

    //图片轮播公共方法
    $.fn.initPicPlayer = function () {
        var main = $(this);
        var btns = main.find(".js_pagination a"); //滚动按钮
        var container = main.find(".js_slidesContainer"); //轮播滚动的容器
        var left = main.find(".js_left");
        var right = main.find(".js_right");
        var imgWidth = main.width() //图片滚动宽度
        var iconClass = "active"; //按钮选中样式
        var selectedBtn; //选中的按钿
        var playID; //自动播放的id
        var selectedIndex; //选中图片的索引

        //设置容器和图片宽度
        //container.css("width", imgWidth * btns.length + "px");
        //container.find("a").css("width", imgWidth + "px");
        container.find(".js_slidesCell").eq(0).css("display", "block");

        if (container.find(".js_slidesCell").length <= 1) {
            main.find(".js_left").remove();
            main.find(".js_right").remove();
        }

        for (var i = 0; i < btns.length; i++) {
            (function () {
                var index = i;
                btns[i].onclick = function () {
                    if (selectedBtn == this) {
                        return;
                    }
                    setSelectedItem(index);
                    return main;
                };
            })();
        }
        setSelectedItem(0);

        function setSelectedItem(index) {
            selectedIndex = index;
            clearInterval(playID);
            if (container.find(".js_slidesCell").is(":animated")) {
                return;
            }
            container.find(".js_slidesCell").css({
                "zIndex": 0
            })
            container.find(".js_slidesCell").eq(index).css("zIndex", 1).fadeIn(500, function () {
                container.find(".js_slidesCell").each(function (n) {
                    if (n != index) {
                        $(this).css({
                            "display": "none"
                        })
                    }
                });
                //自动播放方法
                playID = setTimeout(function () {
                    if (btns.length == 1) { //如果只有一张图片 则不滚动。
                        return;
                    }
                    var index = selectedIndex + 1;
                    if (index >= btns.length) {
                        index = 0;
                    }
                    setSelectedItem(index);
                }, 5000);
            });

            if (selectedBtn) {
                $(selectedBtn).removeClass(iconClass);
            }
            selectedBtn = btns[parseInt(index)];
            btns.removeClass(iconClass);
            var that = btns[selectedIndex];
            $(that).addClass(iconClass);
        }

        main.bind({
            mouseover: function () {
                left.css("display", "block");
                right.css("display", "block");
                clearInterval(playID);
            },
            mouseout: function () {
                left.css("display", "none");
                right.css("display", "none");
                container.find(".js_slidesCell").each(function (n) {
                    if ($(this).css("display") == "block") {
                        setSelectedItem(n);
                    }
                });
            }
        });
        $(".js_slides").on("click", ".js_left", function () {
            if (container.is(":animated")) {
                return;
            }
            if (selectedIndex == 0) {
                selectedIndex = btns.length;
            }
            setSelectedItem(selectedIndex - 1);
            return false;
        });
        $(".js_slides").on("click", ".js_right", function () {
            if (container.is(":animated")) {
                return;
            }
            if (selectedIndex == btns.length - 1) {
                selectedIndex = -1;
            }
            setSelectedItem(parseInt(selectedIndex + 1));
            return false;
        });
        return main;
    };

    //顶部搜索筛选
    var inputObj = null;
    $(".ci-menu-search input").unbind().bind("input", function () {
        var _key = $(this).val();
        clearTimeout(inputObj);
        inputObj = setTimeout(function () {
            $.get("/json/searchData.json", {
                key: _key
            }, function (dataObj) {
                if (dataObj.code == 2000) {
                    var _html = '';
                    for (var i = 0; i < dataObj.data.length; i++) {
                        _html += '<li><a href="javascript:;">' + dataObj.data[i] + '</a></li>';
                    }
                    $(".ci-menu-search-list").html(_html).show();
                    $(".ci-menu-search-list").find("a").unbind().bind("click", function () {
                        var _val = $(this).html();
                        $(".ci-menu-search input").val(_val);
                        $(".ci-menu-search-list").hide();
                    });
                }
            });
        }, 500);
    });
    //点击空白区隐藏下拉框
    $(document).mouseup(function (e) {
        var _con = $('.ci-menu-search-list'); // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
            $('.ci-menu-search-list').hide();
        }
    });