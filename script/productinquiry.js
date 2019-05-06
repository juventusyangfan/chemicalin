var vm = new Vue({
    el: '#inquiry',
    data: {
        requestData: {
            quantity1: "g",
            quantityVal1:"",
            quantity2: "g",
            quantityVal2:"",
            purity: "",
            shippingTo: "nation",
            addtionalRequest: "",
            firstName: "",
            lastName: "",
            email: "",
            company: "",
            phone: "",
            ulShow:false
        },
        country: ["nation", "Afghanistan", "Åland", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire, Sint Eustatius, and Saba", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos [Keeling] Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Hashemite Kingdom of Jordan", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Luxembourg", "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar [Burma]", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of Korea", "Republic of Lithuania", "Republic of Moldova", "Republic of the Congo", "Reunion", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Saint-Barthélemy", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovak Republic", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "U.S. Virgin Islands", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Wallis and Futuna", "Yemen", "Zambia", "Zimbabwe"],
        selectList: []
    },
    watch: {
        'requestData.shippingTo': {
            handler(newVal) {
                var that = this;
                that.selectList = [];
                for (var i = 0; i < that.country.length; i++) {
                    if (that.country[i].toLowerCase().indexOf(newVal.toLowerCase()) > -1) {
                        that.selectList.push(that.country[i]);
                    }
                }
            },
            deep: true
        }
    },
    mounted() {
        this.selectList=this.country;
    },
    methods: {
        showUl:function(){
            this.requestData.ulShow = true;
        },
        selectItem:function(item){
            this.requestData.shippingTo = item;
            this.requestData.ulShow = false;
        },
        submit: function () {
            var formData = JSON.stringify(this.requestData);
            if(this.requestData.quantityVal1==""){
                $.msgTips({
                    type: "warning",
                    content: "请输入Quantity1"
                });
            }
            else if(this.requestData.purity==""){
                $.msgTips({
                    type: "warning",
                    content: "请输入Purity"
                });
            }
            else if(this.requestData.shippingTo==""){
                $.msgTips({
                    type: "warning",
                    content: "请输入Shipping to"
                });
            }
            else if(this.requestData.firstName==""||this.requestData.lastName==""){
                $.msgTips({
                    type: "warning",
                    content: "请输入Your Name"
                });
            }
            else if(this.requestData.email==""){
                $.msgTips({
                    type: "warning",
                    content: "请输入Email"
                });
            }
            else if(this.requestData.company==""){
                $.msgTips({
                    type: "warning",
                    content: "请输入Company/Institution"
                });
            }
            else{
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
    }
});

$(document).on("click", function (e) {
    var _con = $('.ci-inquiry-list,.js_selInput'); // 设置目标区域
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        vm.requestData.ulShow = false;
    }
});