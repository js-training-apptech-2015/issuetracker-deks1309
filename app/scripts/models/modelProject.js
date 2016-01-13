module.exports = function(){
    return Backbone.Model.extend({
        defaults:{
            id:'',
            name:'',
            issues:[]
        }      
    });    
}
