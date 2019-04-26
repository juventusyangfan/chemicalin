var vm = new Vue({
    el: '#service',
    data: {
        requestData: {
            firstName: "",
            lastName: "",
            email: "",
            company: "",
            message: ""
        }
    },
    methods: {
        submit: function () {
            var formData = JSON.stringify(this.requestData);

            $.get("/json/formData.json", formData, function (dataObj) {
                if (dataObj.code == 2000) {
                    $.msgTips({
                        type: "success",
                        content: dataObj.msg
                    });
                } else {
                    $.msgTips({
                        type: "warning",
                        content: dataObj.msg
                    });
                }
            });
        }
    }
});