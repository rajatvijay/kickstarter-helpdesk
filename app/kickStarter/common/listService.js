/**
 * Created by rajat on 1/4/17.
 */

app.service('listService', ['api', 'kickStarterAPI',function(api, kickStarterAPI) {

    this.getProjects = function() {
      return api.get(kickStarterAPI.projects) ;
    } ;

  }
]) ;
