angular.module('app', ['ngRoute', 'ngAnimate'])
	.config(function($routeProvider) {
	    $routeProvider
		.when('/', {
			templateUrl: 'views/index.html'
		})
		.when('/add', {
			templateUrl: 'views/add.html'
		})
		.otherwise({
			redirectTo: '/'
		});
	})
	.controller('tasksListCtrl', tasksList)
	.controller('addTaskCtrl', addTask)
	.directive('alertMsg', alertMsg)
	.factory('taskService', taskService);


// List of tasks
function tasksList(taskService, $rootScope) {
	var vm = this;
	vm.tasks = taskService.getTasks;

	vm.closeTask = function(item) {
		$rootScope.notification = {
			message: "Are you sure to close this task?",
			status: true,
			item: item
		}
	}
}

// Push new tasks
function addTask(taskService) {
	var vm = this;
	vm.addTask = taskService.addTask;
}

// Service of tasks
function taskService($location, $rootScope){
	var tasks = [
		{ id: 1, name: 'Lorem ipsum dolor', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing', status: 'Open' },
		{ id: 2, name: 'Pellentesque vitae', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing', status: 'Open' },
		{ id: 3, name: 'Etiam volutpat neque', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing', status: 'Open' },
		{ id: 4, name: 'Ut mattis rhoncus', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing', status: 'Open' },
		{ id: 5, name: 'Ut mattis rhoncus', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing', status: 'Closed' },
		{ id: 6, name: 'Etiam volutpat neque', description: 'Lorem ipsum dolor sit amet, consectetur', status: 'Closed' }
	];

	function addTask(form){
		var arr = { name: form.name, description: form.description, status: 'Open' }
		tasks.push(arr);
		$location.path('/');
	}

	function deleteTask() {
		var item = $rootScope.notification.item;
		for ( var i = 0; i < tasks.length; i++ ){
			if ( tasks[i].id == item.id ){
				tasks[i].status = 'Closed';
				$rootScope.notification.status = false;
			}
		}
	}

	var service = {
		getTasks: tasks,
		addTask: addTask,
		closeTask: deleteTask
	}
	return service
}

// Directive
function alertMsg($rootScope, taskService){
	return {
		restrict: 'E',
		templateUrl: "views/directives/alert-msg.html",
		scope: {
			alertData: '='
		},
		link: function($scope, $elem, $attrs){
			$scope.cancel = function() {
				$rootScope.notification.status = false;
			}
			$scope.confirm = taskService.closeTask;
		}
	}
}