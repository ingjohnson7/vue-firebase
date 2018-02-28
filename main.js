var vFire = new Vue({
    el: '.container',
    data: {
        newItem:'',
        editingItem: null,
        items: [
            {name: 'To buy a cat', completed: false},
            {name: 'Eat a pizza', completed: false},
            {name: 'To buy a dog', completed: true}
        ]
    },
    methods: {
        addNewItem: function() {
            if(this.newItem.length > 3){
                this.items.unshift({
                    name: this.newItem,
                    completed: false
                });
                this.newItem = '';
            }
        },

        editItem: function(item) {            
            console.info(item);
        },
        
        removeItem: function(index) {
            this.items.splice(index, 1);
        }
    }
});    
