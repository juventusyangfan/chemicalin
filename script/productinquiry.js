var vm = new Vue({
    el: '#inquiry',
    data: {
        requestData: {
            quantity1: "g",
            quantity2: "g",
            purity: "",
            shippingTo: "",
            addtionalRequest: "",
            firstName: "",
            lastName: "",
            email: "",
            company: "",
            phone: ""
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