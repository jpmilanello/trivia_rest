define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/users'
], function(_, Backbone, UserModel){
	var Users = Backbone.Collection.extend({
		model: UserModel,
		url: '/admins'
	});
  // You don't usually return a collection instantiated
  	return Users;
});
