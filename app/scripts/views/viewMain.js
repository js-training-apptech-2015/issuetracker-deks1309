var TemplateView = require('../views/viewTemplate.js')();
var BreadcrumbsView = require('../views/viewBreadcrumb.js')();
var ProjectListView = require('../views/viewProject.js')();
var IssuesListView = require('../views/viewIssue.js')();
var DescriptionView = require('../views/viewDescription.js')();

module.exports = function(){
    return TemplateView.extend({
        render: function () {
            this.breadcrumbsView.render();
            
            this.projectListView.render();

            this.issuesListView.render();

            this.descriptionView.render();
        }
    });
}