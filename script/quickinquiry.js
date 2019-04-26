var vm = new Vue({
    el: '#inquiry',
    data: {
        requestData:{
            CASNO: "",
            productName: "",
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

            $.post("ajaxUrl", formData, function (dataObj) {
                dataObj
            });
        }
    }
});