angular
  .module('appEdutic')
  .controller('appController', ['$scope', '$location', 'AppServices',
    function($scope, $location, AppServices) {
    	$scope.class_body = "";
    	$scope.class_wrapper = "";
    	$scope.user = {};
    	$scope.rol = {};

    	$scope.branch_id = 1;
		$scope.course_id = 1;
		$scope.unit_id = 0;
		$scope.similarity = 1;
		$scope.datos_val = 1;

	    $scope.getIncludeHeader = function () {
	    	//if($location.$$path != '/login' && $location.$$path != '/register'){
	          	return "views/template/header.html";
	        //}
	        //return "";
	    }
	    $scope.getIncludeMenu = function () {
	    	//if($location.$$path != '/login' && $location.$$path != '/register'){
	          	return "views/template/menu.html";
	        //}
	        //return "";
	    }
	    $scope.getIncludeFooter = function () {
	    	//if($location.$$path != '/login' && $location.$$path != '/register'){
	          	return "views/template/footer.html";
	        //}
	        //return "";
	    }

	    $scope.goIndex = function (index) {
	    	$location.path("/" + index);
	    }

  	}])
	.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);;
