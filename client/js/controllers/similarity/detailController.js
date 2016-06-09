angular
  .module('appEdutic')
  .controller('DetailController', ['$scope', '$location', '$routeParams', 'AppServices',
    function($scope, $location, $routeParams, AppServices) {
    	$scope.$parent.class_body = "hold-transition skin-blue sidebar-mini";
		$scope.$parent.class_wrapper = "";
    	
		$scope.idPage = $routeParams.idPage;
		$scope.distance = $routeParams.distance;
    $scope.$parent.branch_id = $routeParams.idBranch;
    $scope.$parent.course_id = $routeParams.idCourse;
    $scope.$parent.unit_id = $routeParams.idUnit;
    $scope.$parent.similarity = $routeParams.similarity;
    $scope.$parent.datos_val = $routeParams.datos;

		$scope.similarities = {};

		AppServices.getDetails(
      		$scope.$parent.branch_id, 
      		$scope.$parent.course_id, 
      		$scope.$parent.unit_id, 
      		$scope.idPage, 
      		$scope.$parent.similarity, 
      		$scope.distance, 
      		$scope.$parent.datos_val)
      	.success(function (data) {
      		$scope.similarities = data.data;
      		for (var i = 0; i < $scope.similarities.length; i++) {
      			//console.log($scope.similarities[i]);
      			$scope.similarities[i].errors = {};
      			$scope.similarities[i].recommendations = {};
      			AppServices.getErrors($scope.similarities[i].id, $scope.$parent.datos_val, i)
      			.success(function (data) {
      				//console.log(data);
      				if (data.data != undefined)
      					$scope.similarities[data.data.index].errors = data.data.data;
					     //console.log($scope.similarities[data.data.index]);
      			});
      			$scope.similarities[i].recommendations = AppServices.getRecommendations($scope.similarities[i].id, $scope.$parent.datos_val, i)
      			.success(function (data) {
      				//console.log(data);
      				if (data.data != undefined)
      				 	$scope.similarities[data.data.index].recommendations = data.data.data;
      			});
      		};
      	})
        .finally(function(data) {
          console.log($scope.similarities.length);
          for (var i = 0; i < $scope.similarities.length; i++) {
            console.log("code_" + $scope.similarities[i].answer_id);
            editor("code_" + $scope.similarities[i].answer_id);
            //editor("code_" + $scope.similarities[i].answer_id + "_r");
          }
        });

      	$scope.getErrors = function (idSolution) {
      		return AppServices.getErrors(idSolution, $scope.$parent.datos_val)
    			.success(function (data) {
    				/*console.log("I: " + i);
    				if (data.data != undefined)
    					$scope.similarities[i].errors = data.data;*/
  				return data.data;      				
    			});
      	}
        $scope.aceLoaded = function(_editor) {
          // Options
          /*_editor.getSession().setAnnotations([{
            row: 1,
            column: 5,
            text: "Strange error",
            type: "warning" // also warning and information
          }]);
          */
          _editor.setReadOnly(true);
          _editor.setOptions({
            fontSize: "12pt"
          });
          //_editor.setHighlightActiveLine(false);
        };

        $scope.aceChanged = function(e) {
          //
        };
        var Range = ace.require("ace/range").Range;
        $scope.setError = function (id, line) {
          var editor = ace.edit("code_" + id);
          var editor_r = ace.edit("code_" + id + "_r");
          editor.getSession().addMarker(new Range(line - 1, 1, line - 1, 144), "errorHighlightxdd", "fullLine");
          editor_r.getSession().addMarker(new Range(line - 1, 1, line - 1, 144), "errorHighlightxdd", "fullLine");
        }
  }]);