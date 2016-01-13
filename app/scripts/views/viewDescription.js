var TemplateView = require('../views/viewTemplate.js')();
var Description = require('../models/modelDescription.js')();
var description = new Description();

module.exports = function(){
    return TemplateView.extend({
       template: 'description' ,
       model: description,
       render: function(){
           TemplateView.prototype.render.call(this, [this.template, this.getContext()]);
       },
       getContext:function(){
           return {
                issue: this.model ? this.model.toJSON() : {}
            }
       }
    });
}