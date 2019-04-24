//开关切换
$(".ci-searchlist-witch").unbind().bind("click", function () {
    if ($(this).hasClass("witchON")) {
        $(this).removeClass("witchON").addClass("witchOFF");
    } else {
        $(this).removeClass("witchOFF").addClass("witchON");
    }
    return false;
});