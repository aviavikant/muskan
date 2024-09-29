var app = new Vue({
            el: "#appPBlog",
            data: {
                blog: [],
                category: [],
                tags: [],
                recent: [],
                comments: [],  
                featured_product: [],              
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
           this.makePagination(_blog[0]);
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
            Vue.set(this.$data, 'blog', _blog[0].data);
            Vue.set(this.$data, 'category', _category[0]);
            Vue.set(this.$data, 'tags', _tags[0]);
            Vue.set(this.$data, 'recent', _recent[0]);
            Vue.set(this.$data, 'comments', _comments[0]);
            Vue.set(this.$data, 'featured_product', _featured_product[0]);
            var currentUrl = window.location.pathname; 
            var array = currentUrl.split(" ");
            this.cat_slug =  array[0];
            },
            methods: {
                changePage: function (page) {
                    this.pagination.current_page = page;
                    this.filter(page);
                },
                makePagination: function(data){
                    //alert(data.total);
                    var pagination = {
                    total: data.total,
                    from: data.from,
                    to: data.to,
                    current_page: data.current_page,
                    last_page: data.last_page,
                    per_page: data.per_page
                }
                Vue.set(this.$data, 'pagination', pagination);
                //alert(this.pagination.current_page);
                },
                          
                
                filter:function(page)
                {
                    
                    this.$http.post('/blog_pagination',{'cat_slug':this.cat_slug,'page':page})
                    .then(function(response)
                    {  
                      Vue.set(this.$data,'blog',response.data['blog'].data);

                    }).catch(function(response) {
                        Vue.set(this.$data, 'errors', response.data);
                    })
                   
                },               

                },
                
        });


