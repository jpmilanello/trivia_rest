define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/questions'
], function(_, Backbone, QuestionModel){
  	var Questions = Backbone.Collection.extend({
  		model: QuestionModel,
  		url: '/questions'
  	});
  // You don't usually return a collection instantiated
  	return Questions;
});
