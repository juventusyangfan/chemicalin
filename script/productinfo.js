    //查看更多
    // $(".see-more").unbind().bind("click", function () {
    //     if ($(this).parent().hasClass("open")) {
    //         $(this).parent().removeClass("open");
    //     } else {
    //         $(this).parent().addClass("open");
    //     }
    //     return false;
    // });
    $(document).on("click", function (e) {
        var _con = $('.see-more,.show-box'); // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            vm.showMore = false;
        }
    });

    // 点击导航条后滑动到相应的位置
    // $(".ci-productInfo-menu").on("click", "a", function () {
    //     var barclass = $(this).attr('data-href');
    //     var top = $("#" + barclass).offset().top;
    //     $(".ci-productInfo-menu").find("li").removeClass("act");
    //     $(this).parent().addClass("act");
    //     $("html,body").animate({
    //         scrollTop: top
    //     }, 500);
    // });

    var vm = new Vue({
        el: '#productInfo',
        data() {
            return {
                showMore: false,
                title: "",
                tips: [],
                des: "",
                img: "",
                seeMore: "",
                product_info: {
                    componud: "",
                    purity: "",
                    packing: "",
                    package: "",
                    lead_time: "",
                    origin: "",
                    loading_port: ""
                },
                properties: {
                    density: "",
                    boiling_point: "",
                    flash_point: "",
                    refractive_index: "",
                    storage_condition: ""
                },
                safety_infomation: {
                    symbol: "",
                    signal_word: "",
                    hazard: "",
                    precautionry: ""
                },
                documents: {
                    MSDS: ""
                }
            }
        },
        mounted() {
            this.getContent();
        },
        methods: {
            getContent() {
                var that = this;
                $.get("/json/productinfo.json", {
                    witch: that.witch
                }, function (dataObj) {
                    if (dataObj.code == 2000) {
                        that.title = dataObj.data.title;
                        that.tips = dataObj.data.tips;
                        that.des = dataObj.data.des;
                        that.img = dataObj.data.img;
                        that.seeMore = dataObj.data.seeMore;
                        that.product_info = dataObj.data.product_info;
                        that.properties = dataObj.data.properties;
                        that.safety_infomation = dataObj.data.safety_infomation;
                        that.documents = dataObj.data.documents;
                    }
                });
            },
            proScroll(type) { // 点击导航条后滑动到相应的位置
                var barclass = type;
                var top = $("#" + barclass).offset().top;
                $(".ci-productInfo-menu").find("li").removeClass("act");
                $(this).parent().addClass("act");
                $("html,body").animate({
                    scrollTop: top
                }, 500);
            },
            seeMoreFun() {
                this.showMore = !this.showMore;
            }
        }

    });