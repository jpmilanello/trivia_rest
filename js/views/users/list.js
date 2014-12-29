define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'collections/users',
  'text!templates/users/list.html'
], function($, _, Backbone, Users, userListTemplate){
  	var UserList = Backbone.View.extend({
  		/* HTML element for single page app */
  		el: '.page',
  		render: function () {
  			$('#trivia_tab').removeClass('selected');
  			$('#user_tab').addClass('selected');
  			/* Create an instance for reference in anonymous function */
  			var element = this;
  			/* Create a collection of users */
  			var users = new Users();
  			/* fetch results from db */
  			users.fetch({
  				success: function (users) {
  					/* Load the html template with the data obtained. Each row is passed in JSON format */
  					var listTemplate = _.template(userListTemplate)({users: users.models});
  					element.$el.html(listTemplate);
  				}
  			})		
  		}
  	});

  // Our module now returns our view
  return UserList;
});
