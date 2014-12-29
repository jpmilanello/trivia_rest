define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'router',
  'models/users',
  'text!templates/users/edit.html'
], function($, _, Backbone, Router,User,editUserTemplate){
  	var EditUser = Backbone.View.extend({
  		/* HTML element for single page app */
  		el: '.page',
  		render: function (options) {
  			$('#trivia_tab').removeClass('selected');
  			$('#user_tab').addClass('selected');
  			/* Create an instance for reference in anonymous function */
  			var element = this;
  			/* if an id is present, it will load the data in the html form template */
  			if(options.id){
  				/* Create a model of users */
  				element.user = new User({id: options.id});
  				/* fetch results from db */
  				element.user.fetch({
  					success: function (user) {
  						/* Load the html template with the data obtained. The row is passed in JSON format */
  						var editTemplate = _.template(editUserTemplate)({user: user});
  						element.$el.html(editTemplate);
  					}
  				})
  			/* if an id is not present, it will load an empty html form template */
  			}else{
  				var editTemplate = _.template(editUserTemplate)({user: null});
  				element.$el.html(editTemplate);
  			}	
  		},
  		/* Control events */
  		events: {
  			'submit .edit-user-form': 'saveUser',
  			'click .delete-user': 'deleteUser'
  		},
  		saveUser: function (ev){
  			var usersDetails = $(ev.currentTarget).serializeObject();
  			var user = new User();
  			user.save(usersDetails,{
  				success: function () {
  					Backbone.history.navigate('#/admin',true);
  				}
  			});
  			return false;
  		},
  		deleteUser: function (ev){
  			this.user.destroy({
  				success: function () {
  					Backbone.history.navigate('#/admin',true);
  				}
  			});
  			return false;
  		}
  	});
  // Our module now returns our view
  return EditUser;
});


