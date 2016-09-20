THREE.PointLightHelper = function ( light, sphereSize ) {

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

	geometry = new THREE.CircleGeometry(sphereSize, 32);
	material = new THREE.LineBasicMaterial( { fog: false } );
	this.sphere0 = new THREE.Line( geometry, material );
	this.add( this.sphere0 );

	geometry = new THREE.CircleGeometry(sphereSize, 32);
	geometry.rotateX( - Math.PI / 2 );
	material = new THREE.LineBasicMaterial( { fog: false } );
	this.sphere1 = new THREE.Line( geometry, material );
	this.add( this.sphere1 );

	geometry = new THREE.CircleGeometry(sphereSize, 32);
	geometry.rotateY( - Math.PI / 2 );
	material = new THREE.LineBasicMaterial( { fog: false } );
	this.sphere2 = new THREE.Line( geometry, material );
	this.add( this.sphere2 );
	this.update();
};

THREE.PointLightHelper.prototype = Object.create( THREE.Object3D.prototype );
THREE.PointLightHelper.prototype.constructor = THREE.PointLightHelper;

THREE.PointLightHelper.prototype.dispose = function () {

	this.sphere0.geometry.dispose();
	this.sphere0.material.dispose();
	this.sphere1.geometry.dispose();
	this.sphere1.material.dispose();
	this.sphere2.geometry.dispose();
	this.sphere2.material.dispose();

};

THREE.PointLightHelper.prototype.update = function () {

	this.sphere0.material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );
	this.sphere1.material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );
	this.sphere2.material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

	/*
	var d = this.light.distance;

	if ( d === 0.0 ) {

		this.lightDistance.visible = false;

	} else {

		this.lightDistance.visible = true;
		this.lightDistance.scale.set( d, d, d );

	}
	*/

};
