define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'collections/questions',
  'text!templates/questions/list.html'
], function($, _, Backbone, Questions,questionListTemplate){
  	var QuestionList = Backbone.View.extend({
  		/* HTML element for single page app */
  		el: '.page',
  		render: function () {
  			$('#trivia_tab').addClass('selected');
  			$('#user_tab').removeClass('selected');
  			/* Create an instance for reference in anonymous function */
  			var element = this;
  			/* Create a collection of questions */
  			var questions = new Questions();
  			/* fetch results from db */
  			questions.fetch({
  				success: function (questions) {
  					/* Load the html template with the data obtained. Each row is passed in JSON format */
  					var listTemplate = _.template(questionListTemplate)({questions: questions.models});
  					element.$el.html(listTemplate);
  				}
  			})		
  		}
  	});
  // Our module now returns our view
  return QuestionList;
});

