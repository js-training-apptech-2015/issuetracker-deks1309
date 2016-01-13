var TemplateView = require('../views/viewTemplate.js')();
var ProjectsList = require('../collections/collectionProject.js')();
var projectsList = new ProjectsList();

module.exports = function(){
    return TemplateView.extend({
        template: 'projects-list',
        collection: projectsList
    });
}