module.exports = function (){
    return Backbone.Model.extend({
        defaults:{
            idIssue:'',
            nameIssue:'',
            description:''  
        }    
    });
}