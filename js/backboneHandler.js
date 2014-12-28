/* Collections */
/* Create collections for users and questions */
var Questions = Backbone.Collection.extend({
	url: '/questions'
});

var Users = Backbone.Collection.extend({
	url: '/admins'
});

/* Models */
/* Create Models for users and questions */
var Question = Backbone.Model.extend({
	urlRoot: '/questions'
});

var User = Backbone.Model.extend({
	urlRoot: '/admins'
});

/* Views */
/* Create a View to show the questions list */
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
				var listTemplate = _.template($('#questionListTemplate').html())({questions: questions.models});
				element.$el.html(listTemplate);
			}
		})		
	}
});

/* Create a View to edit the questions */
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
					var listTemplate = _.template($('#editQuestionTemplate').html())({question: question});
					element.$el.html(listTemplate);
				}
			})
		/* if an id is not present, it will load an empty html form template */
		}else{
			var listTemplate = _.template($('#editQuestionTemplate').html())({question: null});
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
				router.navigate('',{trigger: true});
			}
		});
		return false;
	},
	/* Function to send the destry request (DELETE) to rest server */
	deleteQuestion: function (ev){
		this.question.destroy({
			success: function () {
				/* Trigger home page refresh */
				router.navigate('',{trigger: true});
			}
		});
		return false;
	}
});

/* Create a View to show the user list */
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
			success: function (questions) {
				/* Load the html template with the data obtained. Each row is passed in JSON format */
				var userListTemplate = _.template($('#userListTemplate').html())({users: users.models});
				element.$el.html(userListTemplate);
			}
		})		
	}
});

/* Create a View to edit the users */
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
					var listTemplate = _.template($('#editUserTemplate').html())({user: user});
					element.$el.html(listTemplate);
				}
			})
		/* if an id is not present, it will load an empty html form template */
		}else{
			var listTemplate = _.template($('#editUserTemplate').html())({user: null});
			element.$el.html(listTemplate);
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
				router.navigate('#/admin',{trigger: true});
			}
		});
		return false;
	},
	deleteUser: function (ev){
		this.user.destroy({
			success: function () {
				router.navigate('#/admin',{trigger: true});
			}
		});
		return false;
	}
});

var questionList = new QuestionList();
var editQuestion = new EditQuestion();

var userList = new UserList();
var editUser = new EditUser();

/* Routes */
var Router = Backbone.Router.extend({
	routes: {
		'': 'homeTrivia',
		'admin': 'homeUser',
		'new': 'editQuestion',
		'admin/new': 'editUser',
		'edit/:id': 'editQuestion',
		'admin/edit/:id': 'editUser',
	}
});

var router = new Router();
router.on('route:homeTrivia', function () {
	questionList.render();
});
router.on('route:homeUser', function () {
	userList.render();
});
router.on('route:editQuestion', function (id) {
	editQuestion.render({id: id});
});
router.on('route:editUser', function (id) {
	editUser.render({id: id});
});

$('#user_tab').on('click',function () {
	router.navigate('#/admin',{trigger: true});
});
$('#trivia_tab').on('click',function () {
	router.navigate('',{trigger: true});
});

Backbone.history.start();