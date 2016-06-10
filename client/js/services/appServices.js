var appServices = angular.module('appServices',['ngResource']);

appServices
	.factory('AppServices', function($http, $resource, $cookieStore){
		var token = "";
		var idUser = "";
		var server = "/api/";
		return {
			subirImagen: function (foto, nombreFile) {
				var fd = new FormData();
				foto.file.name = nombreFile;
				console.log(foto.file);
				fd.append('key',foto.file);
				return $http.post(
					'/api/containers/container1/upload',
					//server + service + "/subirImagen",
					//"http://localhost:8080/upload-image-brand",
					fd,
					{
						headers: {'Content-Type': undefined},
						transformRequest: angular.identity
				});
			},
			subirImagen2: function (foto) {
				var fd = new FormData();
				foto.filename = "XD";
				foto.name = "XDDD";
				console.log(foto);
				fd.append('key',foto);
				return $http.post(
					'/api/containers/container1/upload',
					//server + service + "/subirImagen",
					//"http://localhost:8080/upload-image-brand",
					fd,
					{
						headers: {'Content-Type': undefined},
						transformRequest: angular.identity
				});
			},
			getUserLogged: function () {
				token = $cookieStore.get("e_session_").id;
				idUser = $cookieStore.get("e_session_").idUser;
				return $http({
					url: server + 'Users/' + idUser,
					method: 'GET',
					params: {
						access_token: token
					}
				});
			},
			getParamsByGrupo: function (grupo) {
				return $http({
					url: "/s/parametros/getParamsByGrupo",
					method: "GET",
					params: {
						grupo: grupo
					}
				});
			},
			getBranches: function () {
				return $http({
					url: "/api/Solutions/getBranchs",
					method: "POST"
				});
			},
			getCourses: function () {
				return $http({
					url: "/api/Solutions/getCourses",
					method: "POST"
				});
			},
			getUnits: function () {
				return $http({
					url: "/api/Solutions/getUnits",
					method: "POST"
				});
			},
			getSimilarities: function (idBranch, idCourse, idUnit, similarity, datos) {
				return $http({
					url: "/api/Solutions/getSimilarities",
					method: "POST",
					data: {
						idBranch: idBranch,
						idCourse: idCourse,
						idUnit: idUnit,
						similarity: similarity,
						datos: datos
					}
				});
			},
			getDetails: function (idBranch, idCourse, idUnit, idPage, similarity, distance, datos, limit, offset) {
				return $http({
					url: "/api/Solutions/getDetails",
					method: "POST",
					data: {
						idBranch: idBranch ,
						idCourse: idCourse ,
						idUnit: idUnit ,
						idPage: idPage ,
						similarity: similarity ,
						distance: distance ,
						datos: datos,
						limit: limit,
						offset: offset
					}
				});
			},
			getErrors: function (idSolution, datos, index) {
				return $http({
					url: "/api/Solutions/getErrors",
					method: "POST",
					data: {
						idSolution: idSolution, 
						datos: datos,
						index: index
					}
				});
				
			},
			getRecommendations: function (idSolution, datos, index) {
				return $http({
					url: "/api/Solutions/getRecommendations",
					method: "POST",
					data: {
						idSolution: idSolution, 
						datos: datos,
						index: index
					}
				});
			},
			getUnitsByCourse: function (idCourse) {
				return $http({
					url: "/api/Solutions/getUnitsByCourse",
					method: "POST",
					data: {
						idCourse: idCourse
					}
				}); 
			}
		}
	});

