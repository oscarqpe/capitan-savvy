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

    $scope.limit = 5;
    $scope.offset = 0;
    $scope.istheremore = true;

		$scope.similarities = {};

    $scope.loadData = function () {
		    AppServices.getDetails(
      		$scope.$parent.branch_id, 
      		$scope.$parent.course_id, 
      		$scope.$parent.unit_id, 
      		$scope.idPage, 
      		$scope.$parent.similarity, 
      		$scope.distance, 
      		$scope.$parent.datos_val,
          $scope.limit,
          $scope.offset)
      	.success(function (data) {
          if ($scope.offset == 0)
      		  $scope.similarities = data.data;
          else {
            for (i = 0; i < data.data.length; i++)
              $scope.similarities.push(data.data[i]);
          }
          console.log($scope.similarities);
          console.log($scope.similarities.length);
          if (data.data.length < 5 || data.data.length == 0) {
            console.log("no more data");
            $scope.istheremore = false;
          }
      		for (var i = $scope.offset; i < $scope.similarities.length; i++) {
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
          loadTrees();
          console.log($scope.similarities.length);
          for (var i = $scope.offset; i < $scope.similarities.length; i++) {
            console.log("code_" + $scope.similarities[i].answer_id);
            editor("code_" + $scope.similarities[i].answer_id);
            //editor("code_" + $scope.similarities[i].answer_id + "_r");
          }
        });

        setTimeout(function() {
          //console.log("Lenght: " + $scope.similarities.length);
          for (i = $scope.offset; i < $scope.similarities.length; i++) {
            //console.log("viz_" + $scope.similarities[i].id);
            var id_sim = $scope.similarities[i].id;
            init("viz_" + id_sim + "_res", $scope.similarities[i].result);
            init("viz_" + id_sim + "_sol", $scope.similarities[i].solution);
          }
        }, 3000);
      }
      $scope.loadData();

      $scope.pagination = function () {
        if ($scope.istheremore) {
          $scope.offset += $scope.limit;
          $scope.loadData();
        }
      }

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

        function toNode(html) {
          var doc = document.documentElement.cloneNode(false);
          doc.innerHTML = html;
          return doc;
        }
        var names = {}; // hash to keep track of what names have been used
        function init(div, content) {
        //  if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
          var $ = go.GraphObject.make;  // for conciseness in defining templates

          myDiagram =
            $(go.Diagram, div,
              {
                initialAutoScale: go.Diagram.UniformToFill,
                // define the layout for the diagram
                layout: $(go.TreeLayout, { nodeSpacing: 5, layerSpacing: 30 })
              });

          // Define a simple node template consisting of text followed by an expand/collapse button
          myDiagram.nodeTemplate =
            $(go.Node, "Horizontal",
              { selectionChanged: nodeSelectionChanged },  // this event handler is defined below
              $(go.Panel, "Auto",
                $(go.Shape, { fill: "#1F4963", stroke: null }),
                $(go.TextBlock,
                  { font: "bold 13px Helvetica, bold Arial, sans-serif",
                    stroke: "white", margin: 3 },
                  new go.Binding("text", "key"))
              ),
              $("TreeExpanderButton")
            );

          // Define a trivial link template with no arrowhead.
          myDiagram.linkTemplate =
            $(go.Link,
              { selectable: false },
              $(go.Shape));  // the link shape


          var nodeDataArray = [];

          // Walk the DOM, starting at document
          function traverseDom(node, parentName) {
            // skip everything but HTML Elements
            //if (!(node instanceof Element)) return;
            // Ignore the menu on the left of the page
            if (node.id === "menu") return;
            // add this node to the nodeDataArray
            var name = getName(node);
            var data = { key: name, name: name };
            nodeDataArray.push(data);
            // add a link to its parent
            if (parentName !== null) {
              data.parent = parentName;
            }
            // find all children
            var l = node.childNodes.length;
            for (var i = 0; i < l; i++) {
              traverseDom(node.childNodes[i], name);
            }
          }

          // Give every node a unique name
          function getName(node) {
            var n = node.nodeName;
            if (node.id) n = n + " (" + node.id + ")";
            var namenum = n;
            var i = 1;
            while (names[namenum] !== undefined) {
              namenum = n + i;
              i++;
            }
            names[namenum] = node;
            return namenum;
          }

          // build up the tree

          //console.log(document.activeElement);
        
          //ACA SE DEBE CONVERTIR A PARTIR DE UN STRING A TIPO DOCUMENT Y PASARLO AL TRAVERSEDOM
          //var str = document.getElementById("solution").value;
          /*console.log(jQuery.parseHTML(str));
          var html = jQuery.parseHTML(str);
          var d = document.createElement('div');
          d.innerHTML = jQuery.parseHTML(str);
          console.log(d.firstChild);*/
          var node = toNode(content);
          //console.log(node);

          traverseDom(node, null);

          //console.log(nodeDataArray);
          // create the model for the DOM tree
          myDiagram.model = new go.TreeModel(nodeDataArray);
        }
        // When a Node is selected, highlight the corresponding HTML element.
        function nodeSelectionChanged(node) {
          if (node.isSelected) {
            names[node.data.name].style.backgroundColor = "lightblue";
          } else {
            names[node.data.name].style.backgroundColor = "";
          }
        }
  }]);