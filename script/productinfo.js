    //查看更多
    $(".see-more").unbind().bind("click", function () {
        if ($(this).parent().hasClass("open")) {
            $(this).parent().removeClass("open");
        } else {
            $(this).parent().addClass("open");
        }
        return false;
    });
    $(document).on("click", function () {
        $(".see-more").parent().removeClass("open");
    });
    
    // 点击导航条后滑动到相应的位置
    $(".ci-productInfo-menu").on("click", "a", function () {
        var barclass = $(this).attr('data-href');
        var top = $("#" + barclass).offset().top;
        $(".ci-productInfo-menu").find("li").removeClass("act");
        $(this).parent().addClass("act");
        $("html,body").animate({
            scrollTop: top
        }, 500);
    });