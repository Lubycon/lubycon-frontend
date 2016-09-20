THREE.DirectionalLightHelper = function ( light, size ) {

	THREE.Object3D.call( this );

	this.light = light;
	this.light.updateMatrixWorld();

	this.matrix = light.matrixWorld;
	this.matrixAutoUpdate = false;

	size = size || 1;

	var lightPointTexture = new THREE.TextureLoader().load("/assets/images/editor/lightPoint.png");

	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0,0,0));
	var material = new THREE.PointsMaterial({ size: 30, map: lightPointTexture, sizeAttenuation: false, alphaTest: 0.5, transparent: true });
	material.color.setHSL( 1.0, 0.3, 1 );
	this.particle = new THREE.Points(geometry,material);

	this.add(this.particle);

	geometry = new THREE.CircleGeometry(size,32);
	material = new THREE.LineBasicMaterial( { fog: false } );
	material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

	this.lightPlane = new THREE.Line( geometry, material );
	this.add( this.lightPlane );

	geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(),
		new THREE.Vector3()
	);
	material = new THREE.LineBasicMaterial( { fog: false } );
	material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

	this.targetLine = new THREE.Line( geometry, material );
	this.add( this.targetLine );

	//guideLine start

	//guideLine end

	geometry = new THREE.CircleGeometry(size,32);
	material = new THREE.LineBasicMaterial( { fog: false } );
	material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

	this.targetPlane = new THREE.Line( geometry, material );
	this.add( this.targetPlane );

	this.update();

};

THREE.DirectionalLightHelper.prototype = Object.create( THREE.Object3D.prototype );
THREE.DirectionalLightHelper.prototype.constructor = THREE.DirectionalLightHelper;

THREE.DirectionalLightHelper.prototype.dispose = function () {

	this.lightPlane.geometry.dispose();
	this.lightPlane.material.dispose();
	this.targetLine.geometry.dispose();
	this.targetLine.material.dispose();
	this.targetPlane.geometry.dispose();
	this.targetPlane.material.dispose();

};

THREE.DirectionalLightHelper.prototype.update = function () {

	var v1 = new THREE.Vector3();
	var v2 = new THREE.Vector3();
	var v3 = new THREE.Vector3();

	return function () {
		var r = this.lightPlane.geometry.parameters.radius;

		v1.setFromMatrixPosition( this.light.matrixWorld );
		v2.setFromMatrixPosition( this.light.target.matrixWorld );
		v3.subVectors( v2, v1 );

		this.lightPlane.lookAt( v3 );
		this.lightPlane.material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

		this.targetLine.geometry.vertices[ 1 ].copy( v3 );
		this.targetLine.geometry.verticesNeedUpdate = true;
		this.targetLine.material.color.copy( this.lightPlane.material.color );

		this.targetPlane.position.copy(v3);
		this.targetPlane.lookAt( v3.multiplyScalar( -1 ) );
		this.targetPlane.material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

	};

}();
