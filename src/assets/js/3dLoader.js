/**
 * @author : mrdoob / http://mrdoob.com/
 * @redesign : Lubycon / http://www.lubycon.com
 */
THREE.OBJLoader = function ( manager ) {
	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
	this.materials = null;
};

THREE.OBJLoader.prototype = {
	constructor: THREE.OBJLoader,
	load: function ( url, onLoad, onProgress, onError ) {
		var scope = this;
		var loader = new THREE.XHRLoader( scope.manager );
		loader.setPath( this.path );
		loader.load( url, function ( text ) {
			onLoad( scope.parse( text ) );
		}, onProgress, onError );
	},
	setPath: function ( value ) {
		this.path = value;
	},
	setMaterials: function ( materials ) {
		this.materials = materials;
	},
	parse: function ( text ) { //text = file contents
		"use strict";

		console.time( 'OBJLoader' );
		var objects = [];
		var objIndex = objects.length;
		var object;
		var foundObjects = false;
		var vertices = [];
		var normals = [];
		var uvs = [];
		var faceVertexUvs = [];
		var faces = [];

		var patterns;

		var vertexCount = 0;
		var normalCount = 0;
		var uvCount = 0;
		var triFaceCount = 0;
		var quadFaceCount = 0;
		var materialCount = 0;
		var materialIndex = 0;

		function addObject(name){
			var geometry = {
				vertices: [],
				normals: [],
				uvs: [],
				faces: [],
				faceVertexUvs: []
			};
			var material = {
				materials: [],
				name: null,
				smooth: true
			};
			object = {
				name: name,
				geometry: geometry,
				material: material
			}

			objects.push(object);
		}
		addObject("main");

		function addVertex(x,y,z){
			var vertex = new THREE.Vector3(x,y,z);
			object = objects[objIndex];
			vertices.push(vertex);
			object.geometry.vertices = vertices;
			object.geometry.verticesNeedUpdate = true;
		}
		function addNormal(x,y,z){
			var normal = new THREE.Vector3(x,y,z);
			object = objects[objIndex];
			normals.push(normal);
			object.geometry.normals = normals;
		}
		function addUV(w,h){
			var uv = new THREE.Vector2(w,h);
			object = objects[objIndex];
			uvs.push(uv);
			object.geometry.uvs = uvs;
		}
		function addFace(v1,v2,v3,v4,uv1,uv2,uv3,uv4,nm1,nm2,nm3,nm4){
			object = objects[objIndex];
			var face = new THREE.Face3(1,1,1);
			var face2 = new THREE.Face3(1,1,1);
			var uvArray = [];
			var uvArray2 = [];

			if(isNaN(v4)){
				triFaceCount++;
				face.a = v1;
				face.b = v2;
				face.c = v3;
				face.materialIndex = materialIndex;
			}
			else{
				quadFaceCount++;
				face.a = v1;
				face.b = v2;
				face.c = v4;
				face2.a = v2;
				face2.b = v3;
				face2.c = v4;

				face.materialIndex = materialIndex;
				face2.materialIndex = materialIndex;
			}
			if(!isNaN(uv1)){ //face uv = [x,y,z]
				if(!isNaN(uv4)){
					var a = uvs[uv1];
					var b = uvs[uv2];
					var c = uvs[uv3];
					var d = uvs[uv4];
					uvArray.push(a,b,d);
					uvArray2.push(b,c,d);
				}
				else if(isNaN(uv4)){
					var a = uvs[uv1];
					var b = uvs[uv2];
					var c = uvs[uv3];
					uvArray.push(a,b,c);
				}
			}

			if(!isNaN(nm1)){
				if(!isNaN(nm4)){
					var a = normals[nm1];
					var b = normals[nm2];
					var c = normals[nm3];
					var d = normals[nm4];
					face.normal.set(a,b,d);
					face2.normal.set(b,c,d);
				}
				else if(isNaN(nm4)){
					var a = normals[nm1];
					var b = normals[nm2];
					var c = normals[nm3];
					face.normal.set(a,b,c);
				}
			}

			if(isNaN(v4)) faces.push(face);
			else faces.push(face,face2);

			if(isNaN(uv4)) faceVertexUvs.push(uvArray);
			else faceVertexUvs.push(uvArray,uvArray2);

			object.geometry.faces = faces;
			object.geometry.faceVertexUvs = faceVertexUvs;
		}

		////////////////////////////////////////patterns start/////////////////////////////////////
		patterns = {
			vertex : /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
			//v float float float
			normal : /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
			//vn float float float
			uv : /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
			//vt float float
			face1 : /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
			//f vertex vertex vertex (index)
			face2 : /^f\s+((-?\d+)\/(-?\d+))\s+((-?\d+)\/(-?\d+))\s+((-?\d+)\/(-?\d+))(?:\s+((-?\d+)\/(-?\d+)))?/,
			//f vertex/uv vertex/uv vertex/uv (index)
			face3 : /^f\s+((-?\d+)\/(-?\d+)\/(-?\d+))\s+((-?\d+)\/(-?\d+)\/(-?\d+))\s+((-?\d+)\/(-?\d+)\/(-?\d+))(?:\s+((-?\d+)\/(-?\d+)\/(-?\d+)))?/,
			//f vertex/uv/normal vertex/uv/normal vertex/uv/normal
			face4 : /^f\s+((-?\d+)\/\/(-?\d+))\s+((-?\d+)\/\/(-?\d+))\s+((-?\d+)\/\/(-?\d+))(?:\s+((-?\d+)\/\/(-?\d+)))?/,
			//f vertex//normal vertex//normal vertex//normal
			object : /^[og]\s*(.+)?/,
			smooth : /^s\s+(\d+|on|off)/,
			mtllib : /^mtllib /,
			usemtl : /^usemtl /
		};
		//////////////////////////////////////////patterns end////////////////////////////////////
		var lines = text.split("\n"),
		result;
		for(var i = 0, l = lines.length; i < l; i++){
			var line = lines[i];
			var materials = object.material.materials;
			line = line.trim();
			if(line.length === 0 || line.charAt(0) === "#"){
				continue;
			}
			else if((result = patterns.vertex.exec(line)) !== null){
				var x = parseFloat(result[1]);
				var y = parseFloat(result[2]);
				var z = parseFloat(result[3]);
				vertexCount++;
				addVertex(x,y,z);
				//console.log("vertex_" + vertexCount + " : " + result[1],result[2],result[3]);
			}
			else if((result = patterns.normal.exec(line)) !== null){
				var x = parseFloat(result[1]);
				var y = parseFloat(result[2]);
				var z = parseFloat(result[3]);
				normalCount++;
				addNormal(x,y,z);
				//console.log("normal_" + normalCount + " : " + result[1],result[2],result[3]);
			}
			else if((result = patterns.uv.exec(line)) !== null){
				var w = parseFloat(result[1]);
				var h = parseFloat(result[2]);
				uvCount++;
				addUV(w,h);
				//console.log("uv_" + uvCount + " : " + result[1],result[2]);
			}
			else if((result = patterns.face1.exec(line)) !== null){
				//console.log(result);
				var v1 = parseFloat(result[1]) - 1;
				var v2 = parseFloat(result[2]) - 1;
				var v3 = parseFloat(result[3]) - 1;
				var v4 = parseFloat(result[4]) - 1;
				addFace(v1,v2,v3,v4);
			}
			else if((result = patterns.face2.exec(line)) !== null){
				var v1 = parseFloat(result[2]) - 1;
				var v2 = parseFloat(result[5]) - 1;
				var v3 = parseFloat(result[8]) - 1;
				var v4 = parseFloat(result[11]) - 1;

				var uv1 = parseFloat(result[3]) - 1;
				var uv2 = parseFloat(result[6]) - 1;
				var uv3 = parseFloat(result[9]) - 1;
				var uv4 = parseFloat(result[12]) - 1;

				addFace(v1,v2,v3,v4,uv1,uv2,uv3,uv4);
				//console.log("face");
			}
			else if((result = patterns.face3.exec(line)) !== null){
				var v1 = parseFloat(result[2]) - 1;
				var v2 = parseFloat(result[6]) - 1;
				var v3 = parseFloat(result[10]) - 1;
				var v4 = parseFloat(result[14]) - 1;

				var uv1 = parseFloat(result[3]) - 1;
				var uv2 = parseFloat(result[7]) - 1;
				var uv3 = parseFloat(result[11]) - 1;
				var uv4 = parseFloat(result[15]) - 1;

				var nm1 = parseFloat(result[4]) - 1;
				var nm2 = parseFloat(result[8]) - 1;
				var nm3 = parseFloat(result[12]) - 1;
				var nm4 = parseFloat(result[16]) - 1;
				addFace(v1,v2,v3,v4,uv1,uv2,uv3,uv4,nm1,nm2,nm3,nm4);
			}
			else if((result = patterns.face4.exec(line)) !== null){
				var v1 = parseFloat(result[2]) - 1;
				var v2 = parseFloat(result[5]) - 1;
				var v3 = parseFloat(result[8]) - 1;
				var v4 = parseFloat(result[11]) - 1;

				var uv1 = undefined;
				var uv2 = undefined;
				var uv3 = undefined;
				var uv4 = undefined;

				var nm1 = parseFloat(result[3]) - 1;
				var nm2 = parseFloat(result[6]) - 1;
				var nm3 = parseFloat(result[9]) - 1;
				var nm4 = parseFloat(result[12]) - 1;
				addFace(v1,v2,v3,v4,uv1,uv2,uv3,uv4,nm1,nm2,nm3,nm4);
			}
			else if((result = patterns.object.exec(line)) !== null){
				//console.log(1);
			}
			else if((result = patterns.smooth.exec(line)) !== null){
				if(result[1] === "1" || result[1] === "on"){
					if(materials.length !== 0){
						materials[materials.length-1].shading = THREE.SmoothShading;
					}
					//console.log(materials[materials.length-1]);
				}
				//console.log("smooth : " + line.substring(2));
			}
			else if((result = patterns.mtllib.exec(line)) !== null){
				//console.log("material library " + line.substring(7).trim());
			}
			else if((result = patterns.usemtl.exec(line)) !== null){
				var existCheck = false;
				var name = line.substring(7).trim();
				if(materials.length == 0){ //first material
					var material = new THREE.MeshPhongMaterial({ color: 0x888888 });
					material.name = name;
					materials.push(material);
					materialCount++;
				}
				else if(materials.length > 0){ //after second material
					for(var j = 0; j < materials.length; j++){
						if(materials[j].name == name){
							existCheck = true;
							materialIndex = j;
							break;
						}
						else existCheck = false;
					}
					if(!existCheck){
						var material = new THREE.MeshPhongMaterial({ color: 0x888888 });
						material.name = name;
						material.textureIndex = -1;
						materials.push(material);
						materialIndex = materials.length - 1;
						materialCount++;
					}
				}
				//console.log("Loaded material_" + materialIndex + " : " + line.substring(7).trim());
			}
			else{
				//console.log("Load Error : " + line);
			}
		}

		console.timeEnd( 'OBJLoader' );

		var container = [];
		for(var i = 0, l = objects.length; i < l; i++){
			var mesh = {
				geometry: null,
				material: null,
				name: null
			}
			object = objects[i];
			var geometry = new THREE.Geometry();

			geometry.vertices = object.geometry.vertices;
			geometry.faces = object.geometry.faces;
			geometry.faceVertexUvs[0] = object.geometry.faceVertexUvs;
			geometry.elementsNeedUpdate = true;
			geometry.computeFaceNormals();
			geometry.computeVertexNormals();
			geometry.computeBoundingBox();
			geometry.normalize();

			object.geometry = geometry;

			var material;
			if(object.material.materials.length === 0) {
				material = new THREE.MeshPhongMaterial({ color: 0x888888});
				material.name = "default";
				object.material.materials.push(material);
			}
			material = new THREE.MeshFaceMaterial(object.material.materials);

			mesh.geometry = geometry;
			mesh.material = material;
			mesh.name = object.name;
			mesh.userData = {
				vertices : vertexCount,
				normals : normalCount,
				uvs : uvCount,
				triFaces : triFaceCount,
				quadFaces : quadFaceCount
			};
			container.push(mesh);
		}

		return container;
	}

};
