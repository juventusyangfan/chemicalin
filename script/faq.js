//展开收起问答
$(".ci-faq-list").find("dl a").unbind().bind("click", function () {
    if ($(this).parents("dl").hasClass("act")) {
        $(this).parents("dl").removeClass("act");
    }
    else {
        $(".ci-faq-list").find("dl").removeClass("act");
        $(this).parents("dl").addClass("act");
    }
    return false;
});