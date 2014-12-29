// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/questions/list',
  'views/questions/edit',
  'views/users/list',
  'views/users/edit'
], function($, _, Backbone, QuestionList,EditQuestion, UserList, EditUser){
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

  var initialize = function(){
  	$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  	  options.url = 'https://triviaserver.herokuapp.com' + options.url;
  	});

  	$.fn.serializeObject = function() {
  	  var o = {};
  	  var a = this.serializeArray();
  	  $.each(a, function() {
  	      if (o[this.name] !== undefined) {
  	          if (!o[this.name].push) {
  	              o[this.name] = [o[this.name]];
  	          }
  	          o[this.name].push(this.value || '');
  	      } else {
  	          o[this.name] = this.value || '';
  	      }
  	  });
  	  return o;
  	};
  	/* initialize views*/
  	var questionList = new QuestionList();
  	var editQuestion = new EditQuestion();

  	var userList = new UserList();
  	var editUser = new EditUser();

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
  };
  return {
    initialize: initialize
  };
});

