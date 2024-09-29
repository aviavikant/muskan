var app = new Vue({
            el: "#appProduct",
            data: {
                products: [],
                category: [],
                tags: [],
                size: [],
                featured_product: [],
                check:0,
                price_type:'',
                search_size:'',
                sortbyprice:'',
                search_keyword:'',
                price_range:'',
                slug:'',
                cate_filter:'',
                from_price:'',
                currentUrl:'',
                to_price:'',
                cat_slug:'',
                pagination: {
                total: 0,
                per_page: 10,
                from: 1,
                to: 0,
                current_page: 1,
                last_page: 0
                },
                offset: 5 

            },

            http:{
                headers: {
                    'X-CSRF-Token': $('meta[name=_token]').attr('content')
                }
            },

            mounted: function () {
           this.makePagination(_products[0]);
            //alert('test')
            },
            computed: {
            isActived: function () {
            return this.pagination.current_page;
            },
            pagesNumber: function () {
            if (!this.pagination.to) {
               return [];
            }
            var from = this.pagination.current_page - this.offset;
            if (from < 1) {
               from = 1;
            }
            var to = from + (this.offset * 2);
            if (to >= this.pagination.last_page) {
               to = this.pagination.last_page;
            }
            var pagesArray = [];
            while (from <= to) {
               pagesArray.push(from);
               from++;
            }
            return pagesArray;
            }
            },

            created: function () 
            {
            Vue.set(this.$data, 'products', _products[0].data);
            Vue.set(this.$data, 'category', _category[0]);
            Vue.set(this.$data, 'tags', _tags[0]);
            Vue.set(this.$data, 'size', _size[0]);
            Vue.set(this.$data, 'featured_product', _featured_product[0]);
            var currentUrl = window.location.pathname; 
            var array = currentUrl.split(" ");
            this.cat_slug =  array[0];
            },
            methods: {
                changePage: function (page) {
                    this.pagination.current_page = page;
                    app.filter(page);

                },
                makePagination: function(data){
                    var pagination = {
                    total: data.total,
                    from: data.from,
                    to: data.to,
                    current_page: data.current_page,
                    last_page: data.last_page,
                    per_page: data.per_page
                }
                Vue.set(this.$data, 'pagination', pagination);
                document.getElementById('productView').scrollIntoView({ behavior: 'smooth' });
                },

                filterData:function(){
                this.$http.post('/product_filter',{'price_type': this.price_type,'search_size': this.search_size,'search_keyword':this.search_keyword,'cat_slug':this.cat_slug,'from_price': this.from_price,'to_price': this.to_price})
                .then(function(response)
                { 

                 this.makePagination(response.data['products']);
                  document.getElementById('productView').scrollIntoView({ behavior: 'smooth' });
                  Vue.set(this.$data,'products',response.data['products'].data);
                }).catch(function(response) {
                    Vue.set(this.$data, 'errors', response.data);
                }) 
                },
                searchPrice:function(){
                this.$http.post('/product_filter',{'from_price': this.from_price,'to_price': this.to_price,'price_type': this.price_type,'search_size': this.search_size,'search_keyword':this.search_keyword,'cat_slug':this.cat_slug})
                .then(function(response)
                { 
                 
                 this.makePagination(response.data['products']);
                  document.getElementById('productView').scrollIntoView({ behavior: 'smooth' });
                  Vue.set(this.$data,'products',response.data['products'].data);
                }).catch(function(response) {
                    Vue.set(this.$data, 'errors', response.data);
                }) 
                },
                sreachProductSize:function(){
                this.$http.post('/product_filter',{'search_size': this.search_size,'price_type': this.price_type,'search_keyword':this.search_keyword,'cat_slug':this.cat_slug,'from_price': this.from_price,'to_price': this.to_price})
                .then(function(response)
                { 
                
                this.makePagination(response.data['products']);
                  document.getElementById('productView').scrollIntoView({ behavior: 'smooth' });
                  Vue.set(this.$data,'products',response.data['products'].data);

                }).catch(function(response) {
                    Vue.set(this.$data, 'errors', response.data);
                })  
                },
                filter:function(page)
                {
                  
                 this.$http.post('/product_filter',{'price_type': this.price_type,'search_size': this.search_size,'search_keyword':this.search_keyword,'cat_slug':this.cat_slug,'from_price': this.from_price,'to_price': this.to_price,'page':page})
                .then(function(response) {
                      Vue.set(app.$data, 'products',response.data['products'].data);
                      app.makePagination(response.data['products']);
                      document.getElementById('productView').scrollIntoView({ behavior: 'smooth' });

                })
                .catch(function(response) {
                    Vue.set(this.$data, 'errors', response.data);
                })

                },

                resetAll: function()
                {
                  
                  this.search_keyword = '';
                  this.filterData(0);
                }

                },
                
        });


