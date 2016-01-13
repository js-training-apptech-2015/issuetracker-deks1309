var TemplateView = require('../views/viewTemplate.js')();
var IssuesList = require('../collections/collectionIssue.js')();
var issuesList = new IssuesList();

module.exports = function(){
    return TemplateView.extend({
        template: 'issues-list',
        collection: issuesList
    });
}