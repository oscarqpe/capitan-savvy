angular
  .module('appEdutic')
  .controller('indexController', ['$scope', '$location',
    function($scope, $location) {

		$scope.$parent.class_body = "hold-transition skin-blue sidebar-mini";
		$scope.$parent.class_wrapper = "";

  }]);
