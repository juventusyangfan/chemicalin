    //vue分页组件
    Vue.component('vuePage', {
        data() {
            return {
                currentPage: 1,
                inputPage: 1
            }
        },
        props: ['count', 'limit'],
        computed: {
            totalPage() {
                var that = this;
                that.currentPage = 1;
                return Math.ceil(that.count / that.limit)
            },
            showPageBtn() {
                let pageNum = this.totalPage,
                    index = this.currentPage,
                    arr = [];
                if (pageNum <= 5) {
                    for (let i = 1; i <= pageNum; i++) {
                        arr.push(i)
                    }
                    return arr
                }
                if (index <= 2) return [1, 2, 3, 0, pageNum];
                if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum];
                if (index === 3) return [1, 2, 3, 4, 0, pageNum];
                if (index === pageNum - 2) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
                return [1, 0, index - 1, index, index + 1, 0, pageNum];
            }
        },
        watch: {
            inputPage(val) {
                var value = val;
                if (value.length == 1) {
                    value = value.replace(/[^1-9]/g, '')
                } else {
                    value = value.replace(/\D/g, '')
                }
                if (value > this.totalPage) {
                    value = this.totalPage.toString();
                }
                this.inputPage = value;
            }
        },
        methods: {
            goPage(index) {
                if (index === 0 || index === this.currentPage) {
                    return
                }
                this.currentPage = index;
                this.$emit('get-list', this.currentPage);
            },
            goPrePage() {
                if (this.currentPage === 1) {
                    return
                }
                this.currentPage--;
                this.$emit('get-list', this.currentPage);
            },
            goNextPage() {
                if (this.currentPage === this.totalPage) {
                    return
                }
                this.currentPage++;
                this.$emit('get-list', this.currentPage);
            }
        },
        template: '<div class="page_container"><div class="page_container_nav"><a href="javascript:;" class="page_up" @click="goPrePage()">Previous</a><span class="pageNumCon"><a href="javascript:;" class="page_num" v-for="i in showPageBtn" :class="{page_cur:i===currentPage}" v-if="i" @click="goPage(i)">{{i}}</a><span v-else class="page_elip">...</span></span><a href="javascript:;" class="page_down" @click="goNextPage()">Next</a></div></div>'
    });

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