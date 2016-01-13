var Issue = require('../models/modelIssue.js')();

module.exports = function(){
    return Backbone.Collection.extend({
        model: Issue
    });
}