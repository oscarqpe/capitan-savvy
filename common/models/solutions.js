module.exports = function(Solutions) {
	function get_similarity_solutions(branch_id, course_id, unit_id, page_id, similarity, datos) {
	    var where = "";
	    where_concat = "";
	    if (branch_id != 0 && branch_id != null && !(datos != 1)) 
	      where_concat += (where_concat != "")? " and us.branch_id = " + branch_id + " " 
	                             : " us.branch_id = "+ branch_id + " ";

	    if (course_id != 0 && course_id != null)
	      where_concat += (where_concat != "")? " and c.id = " + course_id + " "
	                              : " c.id = " + course_id + " ";
	    
	    if (unit_id != 0 && unit_id != null)
	      where_concat += (where_concat != "")? " and u.id = " + unit_id + " "
	                              : " u.id = " + unit_id + " ";
	    
	    if (page_id != 0 && page_id != null)
	      where_concat += (where_concat != "")? " and p.id = " + page_id + " "
	                              : " p.id = " + page_id + " ";
	    
	    if (where_concat != "")
	      where += " where " + where_concat;
	    
	    group_by = ""
	    if (similarity == 1)
	      group_by = "s.similitud_levenshtein";
	    else
	      group_by = "s.similitud_ast";
	    

	  	query = "";
	    if (datos == 1) {
	      query = "select " + 
	        "  s.id, s.page_id,  " + 
	        "  COUNT(*) as total,  " + 
	        "  s.similitud_levenshtein,  " + 
	        "  p.title, " + 
	        "  s.similitud_ast " + 
	        "from solutions s  " + 
	        "left join pages p on p.id = s.page_id " + 
	        "inner join units u on u.id = p.unit_id " + 
	        "inner join courses c on c.id = u.course_id " + 
	        "inner join users us on us.id = s.user_id " + 
	        where + 
	        " group by " + group_by +
	        " order by " + group_by;
	    } else {
	      query = "select " +
	        "   s.id, s.page_id,  " + 
	        "   COUNT(*) as total,  " + 
	        "   s.similitud_levenshtein,  " + 
	        "   p.title, " + 
	        "   s.similitud_ast " + 
	        " from sintetics s  " + 
	        " left join pages p on p.id = s.page_id " + 
	        " inner join units u on u.id = p.unit_id " + 
	        " inner join courses c on c.id = u.course_id " + 
	        where + 
	        " group by " + group_by +
	        " order by " + group_by;
	    }
  		return query;
  	}
  	function get_similarity_solutions_details(branch_id, course_id, unit_id, page_id, similitud, datos, similarity, limit, offset) {
	    
	    where_concat = "";
	    if (branch_id != 0 && branch_id != null && !(datos != 1))
	      where_concat += (where_concat != "")? " and us.branch_id = " + branch_id + " " 
	                             : " us.branch_id = " + branch_id + " ";

	    if (course_id != 0 && course_id != null)
	      where_concat += (where_concat != "")? " and c.id = " + course_id + " " 
	                              : " c.id = " + course_id + " ";
	    
	    if (unit_id != 0 && unit_id != null)
	      where_concat += (where_concat != "")? " and u.id = " + unit_id + " " 
	                              : " u.id = " + unit_id + " ";
	    
	    if (page_id != 0 && page_id != null)
	      where_concat += (where_concat != "")? " and p.id = " + page_id + " " 
	                              : " p.id = " + page_id + " ";

	    simil = "";
	    if (similarity == 1)
	    	simil = "similitud_levenshtein";
	    else
	    	simil = "similitud_ast";
	    if (where_concat != "")
	      where_concat = " and " + where_concat;
	     
	    query = "";

	    if (datos == 1) {
	      query = "select " +
	        "   s.id,  " + 
	        "   s.user_id, " + 
	        "   s.page_id, " + 
	        "   s.answer_id, " + 
	        "   s.similitud_levenshtein, " + 
	        "   p.solution,  " + 
	        "   a.result,  " + 
	        "   us.name,  " + 
	        "   us.lastname1,  " + 
	        "   us.lastname2,  " + 
	        "   p.title " + 
	        " from solutions s  " + 
	        " left join pages p on p.id = s.page_id  " + 
	        " inner join units u on u.id = p.unit_id  " + 
	        " inner join courses c on c.id = u.course_id " + 
	        " left join answers a on a.id = s.answer_id " + 
	        " left join users us on us.id = s.user_id " + 
	        " where s.page_id = " + page_id + " " + where_concat + 
	        " and s." + simil + " = " + similitud + 
	        " order by s." + simil + " limit " + limit + " offset " + offset;
	    } else {
	      query = "select " +
	        "   s.id,  " + 
	        "   s.id as user_id, " + 
	        "   s.page_id, " + 
	        "   s.id as answer_id, " + 
	        "   s.similitud_levenshtein, " + 
	        "   p.solution,  " + 
	        "   s.result,  " + 
	        "   'SINTETIC' AS name,  " + 
	        "   'DATA' AS lastname1,  " + 
	        "   '' AS lastname2,  " + 
	        "   p.title " + 
	        " from sintetics s  " + 
	        " left join pages p on p.id = s.page_id  " + 
	        " inner join units u on u.id = p.unit_id  " + 
	        " inner join courses c on c.id = u.course_id " + 
	        " where s.page_id = " + page_id + " " + where_concat +
	        " and s." + simil + " = " + similitud +  
	        " order by s." + simil + " limit " + limit + " offset " + offset;
	    }
	    console.log(query);
	    return query;
  	}
	Solutions.getSimilarities = function (idBranch, idCourse, idUnit, similarity, datos, cb) {
		
		var ds = Solutions.dataSource;

		console.log(idBranch);

		if (idCourse == 0 || idCourse == null)
	      	idCourse = 1;
	    
	    if (similarity == 0 || similarity == null)
	     	similarity = 1;
	    
	    if (datos == 0 || datos == null)
	      	datos = 1;
	    
	    if (idBranch == 0 || idBranch == null)
	      	idBranch = 1;
	    
	    if (idUnit == null)
	      	idUnit = 0;

	    var sqlPages = "select pages.id, pages.title from pages left join units u on u.id = pages.unit_id where u.course_id = " + idCourse + " and page_type = 'editor'";

	    ds.connector.query(sqlPages, null, function (err, pages) {

            if (err) console.error(err);

            var cluster = [];

            console.log("Pages: " + pages.length);	
            var totalPages = pages.length;
            for (i = 0; i < pages.length; i++) {
            	console.log("PAgesID: " + pages[i].id);
            	query1 = get_similarity_solutions(idBranch, idCourse, idUnit, pages[i].id, similarity, datos);
            	console.log(query1);
	    		ds.connector.query(query1, null, function (err, data) {
	    			if (data != undefined) {
		    			console.log("Total: "+ data.length);
		    			cluster[cluster.length] = data;
	    			} else {
	    				cluster[cluster.length] = {};
	    			}
	    			totalPages--;
	    			if (totalPages == 0) {
	    				console.log("reponse");
	    				var response = {
							success: true,
							data: {
								pages: pages,
								cluster: cluster
							}
						}
			            cb(err, response);
	    			} 
	    		});
            }
        });
	};
	Solutions.getDetails = function (idBranch, idCourse, idUnit, idPage, similarity, distance, datos, limit, offset, cb) {
		
		var ds = Solutions.dataSource;

		console.log(idBranch);

		if (idCourse == 0 || idCourse == null)
	      	idCourse = 1;
	    
	    if (similarity == 0 || similarity == null)
	     	similarity = 1;
	    
	    if (datos == 0 || datos == null)
	      	datos = 1;
	    
	    if (idBranch == 0 || idBranch == null)
	      	idBranch = 1;
	    
	    if (idUnit == null)
	      	idUnit = 0;

	    var sqlSim = get_similarity_solutions_details(idBranch, idCourse, idUnit, idPage, distance, datos, similarity, limit, offset);

	    ds.connector.query(sqlSim, null, function (err, pages) {

            if (err) console.error(err);

            cb(err, pages);
        });
	};
	Solutions.getErrors = function (idSolution, datos, index, cb) {
		
		var ds = Solutions.dataSource;
		//console.log("ID Solution: " + idSolution);
	    var query = "";
	  	if (datos == 1)
	  		query = "select * from errors where solution_id = " + idSolution;
	  	else
	  		query = "select * from errors where sintetic_id = " + idSolution;
	  	

	    ds.connector.query(query, null, function (err, pages) {

            if (err) console.error(err);
            
            var response = {
				success: true,
				data: pages,
				index: index
			};
            cb(err, response);
        });
	};
	Solutions.getRecommendations = function (idSolution, datos, index, cb) {
		
		var ds = Solutions.dataSource;

	    var query = "";
	  	if (datos == 1)
	  		query = "select * from recommendations where solution_id = " + idSolution;
	  	else
	  		query = "select * from recommendations where sintetic_id = " + idSolution;
	  	

	    ds.connector.query(query, null, function (err, pages) {

            if (err) console.error(err);
            var response = {
				success: true,
				data: pages,
				index: index
			};
            cb(err, response);
        });
	};
	Solutions.getBranchs = function (cb) {
		var ds = Solutions.dataSource;
	    var sql = "select * from branches";
	    ds.connector.query(sql, null, function (err, datos) {
            if (err) console.error(err);
            cb(err, datos);
        });
	};
	Solutions.getCourses = function (cb) {
		var ds = Solutions.dataSource;
	    var sql = "select * from courses";
	    ds.connector.query(sql, null, function (err, datos) {
            if (err) console.error(err);
            cb(err, datos);
        });
	};
	Solutions.getUnits = function (cb) {
		var ds = Solutions.dataSource;
	    var sql = "select * from units";
	    ds.connector.query(sql, null, function (err, datos) {
            if (err) console.error(err);
            cb(err, datos);
        });
	};
	Solutions.getUnitsByCourse = function (idCourse, cb) {
		var ds = Solutions.dataSource;
	    var sql = "select * from units where course_id = " + idCourse;
	    ds.connector.query(sql, null, function (err, datos) {
            if (err) console.error(err);
            cb(err, datos);
        });
	}
	Solutions.remoteMethod(
		'getSimilarities',
		{
			description: 'Get similarities.',
			accepts: [
				{ arg: 'idBranch', type: 'number', required: true, description: 'Branch id'},
				{ arg: 'idCourse', type: 'number', required: true, description: 'Course id'},
				{ arg: 'idUnit', type: 'number', required: true, description: 'Unit id'},
				{ arg: 'similarity', type: 'number', required: true, description: 'Similarity'},
				{ arg: 'datos', type: 'number', required: true, description: 'Data Type'}
			],
			http: { verb: 'post', path: '/getSimilarities'},
			isStatic: true,
			returns: { arg: 'data', type: 'object'}
		}
	);
	Solutions.remoteMethod(
		'getDetails',
		{
			description: 'Get details.',
			accepts: [
				{ arg: 'idBranch', type: 'number', required: true, description: 'Branch id'},
				{ arg: 'idCourse', type: 'number', required: true, description: 'Course id'},
				{ arg: 'idUnit', type: 'number', required: true, description: 'Unit id'},
				{ arg: 'idPage', type: 'number', required: true, description: 'Page id'},
				{ arg: 'similarity', type: 'number', required: true, description: 'Similarity'},
				{ arg: 'distance', type: 'number', required: true, description: 'Distance'},
				{ arg: 'datos', type: 'number', required: true, description: 'Data Type'},
				{ arg: 'limit', type: 'number', required: true, description: 'Limit'},
				{ arg: 'offset', type: 'number', required: true, description: 'Offset'}
			],
			http: { verb: 'post', path: '/getDetails'},
			isStatic: true,
			returns: { arg: 'data', type: 'object'}
		}
	);
	Solutions.remoteMethod(
		'getErrors',
		{
			description: 'Get errors.',
			accepts: [
				{ arg: 'idSolution', type: 'number', required: true, description: 'Solution id'},
				{ arg: 'datos', type: 'number', required: true, description: 'Datos'},
				{ arg: 'index', type: 'number', required: true, description: 'Index'}
			],
			http: { verb: 'post', path: '/getErrors'},
			isStatic: true,
			returns: { arg: 'data', type: 'object'}
		}
	);
	Solutions.remoteMethod(
		'getRecommendations',
		{
			description: 'Get errors.',
			accepts: [
				{ arg: 'idSolution', type: 'number', required: true, description: 'Solution id'},
				{ arg: 'datos', type: 'number', required: true, description: 'Datos'},
				{ arg: 'index', type: 'number', required: true, description: 'Index'}
			],
			http: { verb: 'post', path: '/getRecommendations'},
			isStatic: true,
			returns: { arg: 'data', type: 'object'}
		}
	);
	Solutions.remoteMethod(
		'getBranchs',
		{
			description: 'Get brachs.',
			accepts: [],
			http: { verb: 'post', path: '/getBranchs'},
			isStatic: true,
			returns: { arg: 'data', type: 'object'}
		}
	);
	Solutions.remoteMethod(
		'getCourses',
		{
			description: 'Get brachs.',
			accepts: [],
			http: { verb: 'post', path: '/getCourses'},
			isStatic: true,
			returns: { arg: 'data', type: 'object'}
		}
	);
	Solutions.remoteMethod(
		'getUnits',
		{
			description: 'Get brachs.',
			accepts: [],
			http: { verb: 'post', path: '/getUnits'},
			isStatic: true,
			returns: { arg: 'data', type: 'object'}
		}
	);
	Solutions.remoteMethod(
		'getUnitsByCourse',
		{
			description: 'Get brachs.',
			accepts: [
				{ arg: 'idCourse', type: 'number', required: true, description: 'Course id'},
			],
			http: { verb: 'post', path: '/getUnitsByCourse'},
			isStatic: true,
			returns: { arg: 'data', type: 'object'}
		}
	);
};
