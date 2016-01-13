var active = 'active';

module.exports = function(){
    return Backbone.Model.extend({
        history:[],
        push: function(name, type, url){
            var length = this.attributes.history.length;
            var history = this.attributes.history.slice();
        
            var repeat = history.find(obj => obj.type === type);
            if(repeat){
                var indx = history.indexOf(repeat);
                history[indx].name = name;
                history[indx].active = active;
                history.splice(indx + 1, history.length - indx - 1);
                this.set({'history':history});
                return;
            }
            
            var new_breadcrumb = {'name':name, 'type': type, 'url': url};

            if ( length > 0 ){
                history[length - 1].active = '';    
            }
            new_breadcrumb.active = active; 
            history.push(new_breadcrumb);

            this.set({'history':history});    
        },
        toStart: function(){
            var history = [{'name':'Home', 'type':'home', 'url':'#', 'active': active}];
            this.set({'history':history});
        }
    })
}