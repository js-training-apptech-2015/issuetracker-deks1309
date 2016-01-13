var Project = require('../models/modelProject.js')();

module.exports = function(){
    
    return Backbone.Collection.extend({
        model: Project,
        url: 'http://www.mocky.io/v2/569232f31200003842d7d1b3',
        initialize: function(){
            this.comparator = function(proj){
                return proj.get('id');
            };
        }
    });
}