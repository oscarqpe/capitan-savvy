angular
  .module('appEdutic')
  .controller('SimilarityController', ['$scope', '$location', 'AppServices', 
    function($scope, $location, AppServices) {
      	$scope.$parent.class_body = "hold-transition skin-blue sidebar-mini";
		$scope.$parent.class_wrapper = "";

		$scope.branch_id = $scope.$parent.branch_id;
		$scope.course_id = $scope.$parent.course_id;
		$scope.unit_id = $scope.$parent.unit_id;
		$scope.similarity = $scope.$parent.similarity;
		$scope.datos_val = $scope.$parent.datos_val;

		$scope.loadDetails = function (idPage, distance) {

			$location.path("/details/" + idPage + "/" + distance
				+ "/" + $scope.branch_id + "/" + $scope.course_id + "/" + $scope.unit_id 
				+ "/" + $scope.similarity
				+ "/" + $scope.datos_val);
		}
      	$scope.datos = [
      		{
      			id: 1,
      			name: "Estudiantes"
      		},
      		{
      			id: 2,
      			name: "Sintéticos"
      		}
      	];
      	$scope.similarities = [
      		{
      			id: 1,
      			name: "Distancia Levenshtein"
      		},
      		{
      			id: 2,
      			name: "Distancia AST"
      		}
      	];
      	$scope.branches = {};
      	$scope.courses = {};
      	$scope.units = {};

      	AppServices.getBranches()
      	.success(function (data) {
      		//console.log(data.data);
      		$scope.branches = data.data;
      	});
      	AppServices.getCourses()
      	.success(function (data) {
      		//console.log(data.data);
      		$scope.courses = data.data;
      	});
      	AppServices.getUnitsByCourse($scope.course_id)
      	.success(function (data) {
      		//console.log(data.data);
      		$scope.units = data.data;
      	});
      	$scope.pages = {};
      	$scope.cluster = {};
      	$scope.loadData = function () {
	      	AppServices.getSimilarities(
	      		$scope.$parent.branch_id, 
	      		$scope.$parent.course_id, 
	      		$scope.$parent.unit_id, 
	      		$scope.$parent.similarity, 
	      		$scope.$parent.datos_val)
	      	.success(function (data) {
	      		$scope.pages = data.data.data.pages;
	      		$scope.cluster = data.data.data.cluster;

	      		for (var i = 0; i < $scope.pages.length; i++) {
	      			$scope.pages[i].chart = {};
	      			$scope.pages[i].chart.type = "PieChart";
	      			var rows = [];
	      			for (var j = 0; j < $scope.cluster[i].length; j++) {
	      				console.log("Datos VAl: " + $scope.$parent.similarity);
	      				var row = {c: [
					        {v: "Distancia " + ($scope.$parent.similarity == 1 ? $scope.cluster[i][j].similitud_levenshtein : $scope.cluster[i][j].similitud_ast)},
					        {v: $scope.cluster[i][j].total}
					    ]};
					    rows.push(row);
	      			}
	      			console.log(rows);
		      		$scope.pages[i].chart.data = {
		      			"cols": [
					        {id: "t", label: "Topping", type: "string"},
					        {id: "s", label: "Slices", type: "number"}
					    ], 
					    "rows": rows
					};
				    $scope.pages[i].chart.options = {
				        'title': $scope.pages[i].title
				    };
				    console.log($scope.pages[i].chart);
				}
	      	});
		}
		$scope.loadData();
		$scope.loadFilters = function () {
			$scope.$parent.branch_id = $scope.branch_id;
			$scope.$parent.course_id = $scope.course_id;
			$scope.$parent.unit_id = $scope.unit_id;
			$scope.$parent.similarity = $scope.similarity;
			$scope.$parent.datos_val = $scope.datos_val;

			$scope.branch_id = $scope.$parent.branch_id;
			$scope.course_id = $scope.$parent.course_id;
			$scope.unit_id = $scope.$parent.unit_id;
			$scope.similarity = $scope.$parent.similarity;
			$scope.datos_val = $scope.$parent.datos_val;

			$scope.loadData();

			AppServices.getUnitsByCourse($scope.course_id)
	      	.success(function (data) {
	      		//console.log(data.data);
	      		$scope.units = data.data;
	      	});
		}
  }]);