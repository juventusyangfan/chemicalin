// vue渲染产品列表
var vm = new Vue({
    el: '#searchList',
    data() {
        return {
            loading: true,
            list: [],
            witch: 'witchON',
            count: 0,
            limit: 10,
            current: 1
        }
    },
    mounted() {
        this.getList(1);
    },
    methods: {
        getList(currentPage) {
            var that = this;
            that.loading = true;
            that.current = currentPage || that.current;
            $.get("/json/searchlist.json", {
                witch: that.witch
            }, function (dataObj) {
                if (dataObj.code == 2000) {
                    that.count = dataObj.count;
                    that.list = dataObj.data;
                }
                that.loading = false;
            });
        },
        changeWitch() {
            if (this.witch == "witchON") {
                this.witch = "witchOFF";
            } else {
                this.witch = "witchON";
            }
            this.getList(1);
        }
    }

});