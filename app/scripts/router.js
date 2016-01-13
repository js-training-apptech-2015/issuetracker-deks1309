var Breadcrumb = require('./models/modelBreadcrumb.js')();
var breadcrumbs = new Breadcrumb({history:[]});

var ProjectsList = require('./collections/collectionProject.js')();
var IssuesList = require('./collections/collectionIssue.js')();
var Description = require('./models/modelDescription.js')();

var projectsList = new ProjectsList();

var MainView = require('./views/viewMain.js')();
var ProjectListView = require('./views/viewProject.js')();
var IssuesListView = require('./views/viewIssue.js')();
var DescriptionView = require('./views/viewDescription.js')();
var BreadcrumbsView = require('./views/viewBreadcrumb.js')(breadcrumbs); 

function loadData(){
    return new Promise(function(resolve, reject){
        projectsList.fetch({
            success: function () {
                var projectListView = new ProjectListView({
                    el: $(".main__projects-list"),
                    collection: projectsList
                });
                resolve(projectListView);
                $('#wait').hide();
            },
            error: function(){
                reject();
            }
        });    
    })
}

module.exports = function(){
    var loaded = false;
    return Backbone.Router.extend({
        routes: {
            "/": "home",
            "": "home",
            "!/": "home",
            "!/project_:id_project": "showIssues",
            "!/project_:id_project/issue_:id": "showDescription"
        },
        home: function(){
            $('#wait').show();
            loadData()
                .then(function(projectListView){
                    var mainView = new MainView();
                    breadcrumbs.toStart();

                    mainView.breadcrumbsView = new BreadcrumbsView({
                        el: $('.breadcrumbs'),
                        model: breadcrumbs          
                    });
                    mainView.projectListView = projectListView;
                    mainView.issuesListView = new IssuesListView({
                        el: $(".main__issues-list"),
                    });
                    mainView.descriptionView = new DescriptionView({
                        el: $(".main__description"),
                    });

                    mainView.render();
                })
                .catch(function(err){
                    console.error(err);
                }); 
                loaded = true;                     
        },
        
        showIssues: function (id) {
            $('#wait').show();
            loadData()
                .then(function(projectListView){
                    var mainView = new MainView();
                    var project = projectListView.collection.findWhere({'id': id});
                    if(!loaded){
                        breadcrumbs.toStart();
                        loaded = true;
                    }
                    breadcrumbs.push(project.attributes.name, 'project', '#!/project_'+id);
                                     
                    mainView.breadcrumbsView = new BreadcrumbsView({
                        el: $('.breadcrumbs'),
                        model: breadcrumbs          
                    });
                    mainView.projectListView = projectListView;
                    mainView.issuesListView = new IssuesListView({
                        el: $(".main__issues-list"),
                        collection: new IssuesList(project.attributes.issues)
                    });
                    mainView.descriptionView = new DescriptionView({
                        el: $(".main__description"),
                    });
                    
                    mainView.render();
                    
                    //this.navigate(project.attributes.name, true);                    
                })
                .catch(function(err){
                    console.error(err);
                });
        },
        
        showDescription:function(id_project, id){
            $('#wait').show();
            loadData()
                .then(function(projectListView){
                    var mainView = new MainView();
                    var project = projectListView.collection.findWhere({'id': id_project});
                    var issuesList = new IssuesList(project.attributes.issues);
                    var issue = issuesList.findWhere({'id': id});
                    var description = new Description({
                            idIssue: id, 
                            nameIssue: issue.attributes.name, 
                            description: issue.attributes.description
                        }); 
                    if(!loaded){
                        breadcrumbs.toStart();
                        breadcrumbs.push(project.attributes.name, 'project', '#!/project_'+id_project);
                        loaded = true;
                    }
                    breadcrumbs.push(issue.attributes.name, 'issue', '#!/project_'+ id_project + '/issue_' + id);     
                    
                    mainView.breadcrumbsView = new BreadcrumbsView({
                        el: $('.breadcrumbs'),
                        model: breadcrumbs          
                    });     
                    mainView.projectListView = projectListView;
                    mainView.issuesListView = new IssuesListView({
                        el: $(".main__issues-list"),
                        collection: issuesList
                    });
                    mainView.descriptionView = new DescriptionView({
                        el: $(".main__description"),
                        model: description
                    });
                   
                    mainView.render();
                    
                    
                    //this.navigate(project.attributes.name + '/' + issue.attributes.name, true);
                })
                .catch(function(err){
                    console.error(err);
                });
        }
    });
}