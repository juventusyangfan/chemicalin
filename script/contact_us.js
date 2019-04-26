var vm = new Vue({
    el: '#contactUs',
    data: {
        requestData:{
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

            $.post("ajaxUrl", formData, function (dataObj) {
                dataObj
            });
        }
    }
});