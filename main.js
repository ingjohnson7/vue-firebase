// Initialize Firebase
var config = {
    apiKey: "AIzaSyADHMik9SVhJcHjf5csPPzryHOQ6-GzLc0",
    authDomain: "vuefireitems.firebaseapp.com",
    databaseURL: "https://vuefireitems.firebaseio.com",
    projectId: "vuefireitems",
    storageBucket: "",
    messagingSenderId: "394162984324"
};

firebase.initializeApp(config);

var db = firebase.database();

Vue.component('item-template', {

    template: '#item-template',

    data: function() {
        return {
            newItem:'',
            editingItem: null,
        };
    },

    props: ['items'],
    
    methods: {
        addNewItem: function() {
            db.ref('items/').push({
                name: this.newItem,
                completed: false
            });
            this.newItem = '';
        },

        editItem: function(item) {            
            db.ref('items/' + item['.key']).update({
                name: item.name
            });
        },

        updateState: function(state, item) {
            db.ref('items/' + item['.key']).update({
                completed: state ? true : false
            });
        },
        
        removeItem: function(item) {
            db.ref('items/' + item['.key']).remove();
        }
    }
})

var vFire = new Vue({
    el: '.container',
    data: {
        items: []
    },
    mounted: function() {
        db.ref('items/').on('value', function(snapshot){
            vFire.items = [];
            var obj = snapshot.val();
            for(var prop in obj) {
                vFire.items.unshift({
                    '.key': prop,
                    completed: obj[prop].completed,
                    name: obj[prop].name
                });
            }
        });
    }  
});    
