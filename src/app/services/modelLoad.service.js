(function () {
    'use strict';

    angular
        .module('app')
        .factory('modelLoadService', modelLoadService);

    function modelLoadService($rootScope, ArrayService) {
        var service = {
            combine: combine
        };

        return service;

        function combine(model) {
            console.time('Model combine');
            // console.log(model);


            var geometry = new THREE.Geometry();
            var usedMaterials = [],
                materials = [],
                materialNames,
                groupData = [];




            // SEARCH MODEL DATA
            for(var i = 0; i < model.children.length; i++) {
                var eachModel = model.children[i];
                var newGeometry = new THREE.Geometry().fromBufferGeometry(model.children[i].geometry);

                // SET MATERIAL NAME TO GROUP PROPERTY...
                if(eachModel.geometry.groups.length > 0){
                    for(var gi = 0; gi < eachModel.geometry.groups.length; gi++) {
                        eachModel.geometry.groups[gi].name = eachModel.material.materials[gi].name;

                        groupData.push(eachModel.geometry.groups[gi]);
                    }
                }
                else {
                    groupData.push({
                        count: eachModel.geometry.attributes.position.count,
                        name: eachModel.material.name
                    });
                }

                // console.log('group data',groupData);
                // console.log(i,eachModel,eachModel.geometry,eachModel.material);

                if(eachModel.material.constructor.name === 'MeshPhongMaterial') usedMaterials.push(eachModel.material);
                else if(eachModel.material.constructor.name === 'MultiMaterial'){
                    for(var mi = 0; mi < eachModel.material.materials.length; mi++) {
                        usedMaterials.push(eachModel.material.materials[mi]);
                    }
                }

                // MERGE GEOMETRIES...
                eachModel.updateMatrix();
                geometry.merge(newGeometry,eachModel.matrix);
                // console.log(geometry);
            }



            // SORTING MATERIALS
            usedMaterials = usedMaterials.sort(function (a, b) {
            	return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            });



            // REMOVE DUPLICATED MATERIALS
            for(var i = 0; i < usedMaterials.length; i++) {
                var isExistMaterial = false;

                // CHECK EXISTING...
                for(var j = 0; j < materials.length; j++){
                    if(materials[j].name === usedMaterials[i].name){
                        isExistMaterial = true;
                        break;
                    }
                    else isExistMaterial = false;
                }

                if(!isExistMaterial) materials.push(usedMaterials[i]);
            }
            materialNames = materials.map(function(v){
                return v.name;
            });
            // console.log(materials,materialNames);



            // BIND MATERIAL
            var faceIndex = 0, groupCount = 0, groupVertexCount = groupData[groupCount].count;
            // console.log(groupData);
            for(var i = 0; i < geometry.vertices.length; i++) {
                var face = geometry.faces[faceIndex];

                if((i+1)%3 === 0) {
                    face.materialIndex = materialNames.indexOf(groupData[groupCount].name) !== -1 ?
                        materialNames.indexOf(groupData[groupCount].name) : 0;
                    faceIndex++;
                }
                // console.log('current face',faceIndex,face,'current material',materials[face.materialIndex],'\n','current group',groupData[groupCount]);
                if(i >= groupVertexCount) {
                    groupCount++;
                    groupVertexCount += groupData[groupCount].count;
                }
            }
            // console.log(geometry.faces);

            // COMPUTE GEOMETRY
            geometry.center();
            geometry.normalize();

            // REDEFINE MODEL
            model.children = [];
            model.add(new THREE.Mesh(geometry,new THREE.MeshFaceMaterial(materials)));
            // console.log(model);

            console.timeEnd('Model combine');

            return model.children[0];
        }
    }
})();
