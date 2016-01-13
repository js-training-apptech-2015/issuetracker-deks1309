module.exports = function(){
    return Backbone.Model.extend({
        defaults:{
            idProject:'',
            id:'',
            name:'',
            description:''  
        }    
    });
}