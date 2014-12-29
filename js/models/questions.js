define([
  'underscore',
  'backbone'
], function(_, Backbone){
  	var Question = Backbone.Model.extend({
  		urlRoot: '/questions'
  	});
  	// Return the model for the module
  	return Question;
});
