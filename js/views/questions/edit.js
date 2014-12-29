define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'router',
  'models/questions',
  'text!templates/questions/edit.html'
], function($, _, Backbone, Router, Question, editQuestionTemplate){
	var EditQuestion = Backbone.View.extend({
		/* HTML element for single page app */
		el: '.page',
		render: function (options) {
			/* Create an instance for reference in anonymous function */
			var element = this;
			/* if an id is present, it will load the data in the html form template */
			if(options.id){
				/* Create a model of questions */
				element.question = new Question({id: options.id});
				/* fetch results from db */
				element.question.fetch({
					success: function (question) {
						/* Load the html template with the data obtained. The row is passed in JSON format */
						var listTemplate = _.template(editQuestionTemplate)({question: question});
						element.$el.html(listTemplate);
					}
				})
			/* if an id is not present, it will load an empty html form template */
			}else{
				var listTemplate = _.template(editQuestionTemplate)({question: null});
				element.$el.html(listTemplate);
			}	
		},
		/* Control events */
		events: {
			'submit .edit-question-form': 'saveQuestion',
			'click .delete-question': 'deleteQuestion'
		},
		/* Function to send the save request (POST if an id is not present, PUT if an id is present) to rest server */
		saveQuestion: function (ev){
			var questionsDetails = $(ev.currentTarget).serializeObject();
			var question = new Question();
			question.save(questionsDetails,{
				success: function () {
					/* Trigger home page refresh */
					Backbone.history.navigate('',{trigger: true});
				}
			});
			return false;
		},
		/* Function to send the destry request (DELETE) to rest server */
		deleteQuestion: function (ev){
			this.question.destroy({
				success: function () {
					/* Trigger home page refresh */
					Backbone.history.navigate('',{trigger: true});
				}
			});
			return false;
		}
	});
 
  	return EditQuestion;
});
