(function () {

    /*
        * 加减数量
        * 删除某行
        * 全选反选
        * 总数量和总价格
        * 数据持久化:存到本地
    */

    let vm = new Vue({
        el: '#app',
        data: {
            goodlists: [{
                shop_isok: false,//店铺复选框
                shop_id: 10001,//店铺id
                shop_name: '5香麻辣店',//店铺名称
                shop_comm: [{ //店铺的商品
                    comm_isok: false,//商品复选框
                    comm_id: 1008,//商品id
                    comm_img: './images/1.png',//商品img路径
                    comm_int: '这是一家很不错的店里面的货物',//标题
                    comm_big: '259g', //规格
                    comm_price: '8998', //单价
                    num: 1, //数量
                    total: 8998,//总价
                    stock: 86
                }, {
                    comm_isok: false,
                    comm_img: './images/4.png',
                    comm_id: 1008,
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '1998',
                    num: 1,
                    total: 1998,
                    stock: 100
                }]
            },
            {
                shop_isok: false,
                shop_id: 10002,
                shop_name: '7香麻辣店',
                shop_comm: [{
                    comm_isok: false,
                    comm_id: 1008,
                    comm_img: './images/2.png',
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '4998',
                    num: 1,
                    total: 4998,
                    stock: 10
                }, {
                    comm_isok: false,
                    comm_id: 1008,
                    comm_img: './images/1.png',
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '8998',
                    num: 1,
                    total: 8998,
                    stock: 20
                }, {
                    comm_isok: false,
                    comm_img: './images/4.png',
                    comm_id: 1008,
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '1998',
                    num: 1,
                    total: 1998,
                    stock: 68
                }]
            }, {
                shop_isok: false,
                shop_id: 10003,
                shop_name: '1香麻辣店',
                shop_comm: [{
                    comm_isok: false,
                    comm_id: 1008,
                    comm_img: './images/3.png',
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '5998',
                    num: 1,
                    total: 5998,
                    stock: 16
                }, {
                    comm_isok: false,
                    comm_id: 1008,
                    comm_img: './images/1.png',
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '8998',
                    num: 1,
                    total: 8998,
                    stock: 61
                }, {
                    comm_isok: false,
                    comm_img: './images/4.png',
                    comm_id: 1008,
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '1998',
                    num: 1,
                    total: 1998,
                    stock: 60
                }]
            }, {
                shop_isok: false,
                shop_id: 10004,
                shop_name: '2香麻辣店',
                shop_comm: [{
                    comm_isok: false,
                    comm_img: './images/4.png',
                    comm_id: 1008,
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '1998',
                    num: 1,
                    total: 1998,
                    stock: 6
                }, {
                    comm_isok: false,
                    comm_id: 1008,
                    comm_img: './images/1.png',
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '8998',
                    num: 1,
                    total: 8998,
                    stock: 26
                }]
            }
            ],
            showme:false,/* 弹出层 */
            total:0,     /* 总数量 */
            allPrice:0   /* 总价格 */
        },

        // 方法
        methods:{
            // 点击删除，打开弹出层
            remove(index,idx){
                console.log(999)
                this.showme = true;
                localStorage.setItem('shopindex',index);
                localStorage.setItem('goodindex',idx);
            },

            // 点击确定删除某行
            removeGood(){
                let index = localStorage.getItem('shopindex');
                let idx = localStorage.getItem('goodindex');
                this.goodlists[index].shop_comm.splice(idx,1);
                this.showme = false
            },

            // 点击二级复选框，控制三级
            change(index){
                this.goodlists[index].shop_comm.forEach(good => {
                    good.comm_isok = !this.goodlists[index].shop_isok
                })
            }
        },

        // 监听器
        watch:{
            goodlists:{
                deep:true,
                handler(newval){
                    // 商品数量
                    newval.forEach(element => {
                        element.shop_comm.forEach(good => {
                            // food ---->  商品
                            if(good.num < 1){
                                good.num = 1;
                                alert('不买不给走')
                            }else if(good.num > good.stock){
                                good.num = good.stock;
                                alert('库存只有' + good.stock)
                            }
                        })
                    });

                    // 二三全选反选
                    newval.forEach(item => {
                        //item：某个店铺，三级复选框控制二级复选框
                        item.shop_isok = item.shop_comm.every(good => good.comm_isok == true)
                    });

                    // 统计总数量和总价 ---选中的商品
                    let arr = [];
                    newval.forEach(item => {
                        let filterArr = item.shop_comm.filter(good => good.comm_isok == true)
                        if(filterArr.length){
                            arr.push(filterArr)
                        }
                    })

                    // 计算总数量和总价
                    this.total = 0;    //每次监听器有新值就先清空旧值
                    this.allPrice = 0;
                    arr.forEach(item => {
                        item.forEach(good => {
                            this.total += good.num * 1;
                            this.allPrice += good.num * good.comm_price;
                        })
                    })

                }
            }
        },

        // 计算属性
        computed:{
            allcheck:{
                get(){ 
                    let arr = []
                    this.goodlists.forEach(item => {
                        let res = item.shop_comm.every(good => good.comm_isok == true)
                        arr.push(res)
                    })
                    return arr.every(item => item == true)
                },
                set(val){
                    this.goodlists.forEach(item => {
                        let res = item.shop_comm.forEach(good => {
                            good.comm_isok = val;
                        })
                    })
                }
            }
        }
    })
})();