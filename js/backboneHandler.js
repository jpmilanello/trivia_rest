var Questions = Backbone.Collection.extend({
	url: '/questions'
});

var Question = Backbone.Model.extend({
	urlRoot: '/questions'
});

var QuestionList = Backbone.View.extend({
	el: '.page',
	render: function () {
		var element = this;
		var questions = new Questions();
		questions.fetch({
			success: function (questions) {
				var listTemplate = _.template($('#listTemplate').html(),{questions: questions.model})
				element.$el.html(listTemplate)
			}
		})		
	}
});

var EditQuestion = Backbone.View.extend({
	el: '.page',
	render: function () {
		var listTemplate = _.template($('#editTemplate').html(),{})
		this.$el.html(listTemplate)		
	},
	events: {
		'submit .edit-question-form': 'saveUser'
	},
	saveUser: function (ev){
		var questionsDetails = $(ev.currentTarget).serializeObject();
		var question = new Question();
		question.save(questionsDetails,{
			success: function () {
				console.log(user.toJSON());
			}
		})
		return false;
	}
});

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'new': 'editQuestion'
	}
});

var questionList = new QuestionList();
var editQuestion = new EditQuestion();

var router = new Router();
router.on('route:home', function () {
	questionList.render();
});
router.on('route:editQuestion', function () {
	editQuestion.render();
});

Backbone.history.start();