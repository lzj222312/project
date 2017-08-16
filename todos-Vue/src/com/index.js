// let list = [
//     {
//         title: '吃饭睡觉打豆豆',
//         isChecked: false
//     },
//     {
//         title: '妙味课堂',
//         isChecked: false
//     }
// ]

let stor = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}

let list = stor.fetch('storData');

let filter = {
                all:function(list){
                    return list
                },
                finished:function(list){
                    return list.filter(function(item){
                        return item.isChecked
                    })
                },
                unfinished:function(list){
                    return list.filter(function(item){
                        return !item.isChecked
                    })
                }
            }

let vm = new Vue({
    el: '.main',
    data: {
        list: list,
        todo: '',
        edtorTodo: '',
        beforeTitle: '',
        localHash: 'all'
    },
    watch: {
        list: {
            handler: function(){
                stor.save('storData',this.list);
            },
            deep: true
        }
    },
    computed: {
        noCheckedLength:function(){
            return this.list.filter(function(item){
                    return !item.isChecked    
            }).length
        },
        filterList:function(){
            // console.log(this.localHash)
            return filter[this.localHash] ? filter[this.localHash](list):list;
        }
      
    },
    methods: {
        //事件参数event在函数中没有参数存在，
        //第一个参数将是event，
        //反之要使用vue的变量获取事件参数$event
        addTodo(e){  //添加任务项
            // console.log(e)
            this.list.push({
                title:this.todo,
                isChecked: false
            });
            this.todo = ''
        },
        delTodo(index){ //删除任务项
            // let index = this.list.indexOf(item)  //使用原生indexOf找到数组对应下标
            this.list.splice(index,1);
        },
        editTodo(todo){ //编辑任务项
            // console.log(todo)
            this.beforeTitle = todo.title;
            this.edtorTodo = todo;
        },
        complatedTodo(){  //完成编辑
            this.edtorTodo = ''
        },
        cancelTodo(todo){   //取消编辑
            todo.title = this.beforeTitle;
            this.beforeTitle = '';
            this.edtorTodo = '';
        }
    },
    directives: {
        "focus":{
            update(el,binding) {
                // console.log(binding)
                if(binding.value){
                    el.focus();
                }
            }   
        }
    }
})

function watchHash(){
    let hash = window.location.hash.slice(1);
    vm.localHash = hash;
}

watchHash();

window.addEventListener('hashchange',watchHash);