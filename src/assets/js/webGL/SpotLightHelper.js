THREE.SpotLightHelper = function ( light ) {

	THREE.Object3D.call( this );

	this.light = light;
	this.light.updateMatrixWorld();

	this.matrix = light.matrixWorld;
	this.matrixAutoUpdate = false;

	var lightPointTexture = new THREE.TextureLoader().load("/assets/images/editor/lightPoint.png");

	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0,0,0));
	var material = new THREE.PointsMaterial({ size: 30, map: lightPointTexture, sizeAttenuation: false, alphaTest: 0.5, transparent: true });
	material.color.setHSL( 1.0, 0.3, 1 );
	this.particle = new THREE.Points(geometry,material);
	this.add(this.particle);

	geometry = new THREE.CylinderGeometry( 0, 1, 1, 20, 1, true );

	geometry.translate( 0, - 0.5, 0 );
	geometry.rotateX( - Math.PI / 2 );

	material = new THREE.MeshBasicMaterial( { wireframe: true, fog: false } );

	this.cone = new THREE.Mesh( geometry, material );
	this.add( this.cone );

	this.update();
};

THREE.SpotLightHelper.prototype = Object.create( THREE.Object3D.prototype );
THREE.SpotLightHelper.prototype.constructor = THREE.SpotLightHelper;

THREE.SpotLightHelper.prototype.dispose = function () {

	this.cone.geometry.dispose();
	this.cone.material.dispose();

};

THREE.SpotLightHelper.prototype.update = function () {

	var vector = new THREE.Vector3();
	var vector2 = new THREE.Vector3();

	return function () {

		var coneLength = this.light.distance ? this.light.distance*0.5 : 10000;
		var coneWidth = coneLength * Math.tan( this.light.angle );

		this.cone.scale.set( coneWidth, coneWidth, coneLength );

		vector.setFromMatrixPosition( this.light.matrixWorld );
		vector2.setFromMatrixPosition( this.light.target.matrixWorld );

		this.cone.lookAt( vector2.sub( vector ) );

		this.cone.material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

	};

}();
