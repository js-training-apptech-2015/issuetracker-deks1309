
/* global Backbone */
/* global templates */
/* global Marionette */
/* global _ */
/* global $ */
Marionette.Renderer.render = function(template, data) {
    if (!template) {
        throw new Marionette.Error({
            name: 'TemplateNotFoundError',
            message: 'Cannot render the template since its false, null or undefined.'
        });
    }
    if(templates && templates[template]){
        Marionette.TemplateCache.templateCaches[template] = new Marionette.TemplateCache(template);
        return templates[template].render(data);
    }
    var templateFunc = _.isFunction(template) ? template : Marionette.TemplateCache.get(template);
  
    return templateFunc(data);
};

(function () {
    
    'use strict';
    var Controller = require('./router.js')();

    $(function () {
        var controller = new Controller();	
        Backbone.history.start();
    });
})();
