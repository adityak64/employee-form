// create the module and name it 
var mainApp = angular.module('mainApp', [ 'ngRoute' ]);

// configure our routes
mainApp.config(function($routeProvider) {
	$routeProvider

	// route for the home page
	.when('/', {
		templateUrl : 'pages/home.html',
		controller : 'mainController'
	})

	// route for the create page
	.when('/create', {
		templateUrl : 'pages/create.html',
		controller : 'createController'
	})
	
	// route for the create page
	.when('/edit', {
		templateUrl : 'pages/edit.html',
		controller : 'editController'
	})

	// route for the about page
	.when('/about', {
		templateUrl : 'pages/about.html',
		controller : 'aboutController'
	})

	// route for the contact page
	.when('/contact', {
		templateUrl : 'pages/contact.html',
		controller : 'contactController'
	});
});

// create the controller and inject Angular's $scope
mainApp.controller('mainController', function($scope, $http, $location, commonService) {
	
	$http({
		method : 'GET',
		url : '/employee/allEmployee'
	}).then(function successCallback(response) {
		$scope.empList = response.data;
	}, function errorCallback(response) {
		console.log('Error has occured in mainController: GET method allEmployee');
	});
	
	$scope.editEmployee = function(emp) {		
		$http({
			method : 'GET',
			url : '/employee/viewEmployee/'	+ emp.userId		
		}).then(function successCallback(response) {
			commonService.setData(response.data);
			$location.path("/edit");
			console.log("Suceessfully fetched employee details");
		}, function errorCallback(response) {
			console.log('Error has occured in createController: POST method addEmployee');
		});
	}	
});

mainApp.controller('createController', function($scope, $http, $location) {
	$scope.saveEmpDetails = function() {
		var empData = {
		        userId : $scope.uid,
		        firstName: $scope.fname,
		        lastName: $scope.lname,
		        email: $scope.email,
		        department: $scope.dept
		    }
		$http({
			method : 'POST',
			url : '/employee/addEmployee',
			data: empData
		}).then(function successCallback(response) {
			console.log("Suceessfully saved employee details");
			$location.path("/");
		}, function errorCallback(response) {
			console.log('Error has occured in createController: POST method addEmployee');
		});
	}
	
});

mainApp.controller('editController', function($scope, $http, $location, commonService) {
	$scope.empData = commonService.getData();
	$scope.fname = $scope.empData.firstName;
	$scope.lname = $scope.empData.lastName;
	$scope.uid = $scope.empData.userId;
	$scope.dept = $scope.empData.department;
	$scope.email = $scope.empData.email;
	console.log("empid: "+ $scope.empData.empid);
	$scope.updateEmpDetails = function() {
		var empData = {
				empid : $scope.empData.empid,
		        userId : $scope.uid,
		        firstName: $scope.fname,
		        lastName: $scope.lname,
		        email: $scope.email,
		        department: $scope.dept
		    }
		$http({
			method : 'PUT',
			url : '/employee/updateEmployee/' + $scope.uid,
			data: empData
		}).then(function successCallback(response) {
			console.log("Suceessfully saved employee details");
			$location.path("/");
		}, function errorCallback(response) {
			console.log('Error has occured in editController: PUT method updateEmployee');
		});
	}
});

mainApp.controller('aboutController', function($scope) {
	$scope.message = 'Look! I am an about page.';
});

mainApp.controller('contactController', function($scope) {
	$scope.message = 'Contact us!.';
});


mainApp.service('commonService', function() {

    var data = {};

    this.getData = function () {
        return data;
    }

    this.setData = function (dataToSet) {
        data = dataToSet;
    }

});
