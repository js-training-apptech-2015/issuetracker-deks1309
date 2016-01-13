var TemplateView = require('../views/viewTemplate.js')();

module.exports = function(breadcrumbs){
    return TemplateView.extend({
        template: 'breadcrumbs',
        model: breadcrumbs
    });
}