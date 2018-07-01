var CharObject = function ( shape ) {
    vObject.call(this);

    this.shape = shape;

    this.boundingBox = new THREE.Box3();;

    this.init();
    
}
CharObject.prototype = Object.create(vObject.prototype);
CharObject.prototype.constructor = CharObject;

CharObject.prototype.init = function () {   

    for( var i =0; i< this.shape.length; i++ ){
        var shape3d = new THREE.ExtrudeGeometry( this.shape[i], {
            amount: 1.5,
            bevelEnabled: false
        } );

        //shape3d.normalize();
        shape3d.scale(5, 5, 5);

        /*for( var m = 0; m < vertices.length; m++) {
            //vertices[m].x += Math.random()*.1;
            //vertices[m].y += Math.random()*.1;
            if (vertices[m].x > this.maxX) this.maxX = vertices[m].x;
            if (vertices[m].x < this.minX) this.minX = vertices[m].x;
            if (vertices[m].y > this.maxY) this.maxY = vertices[m].y;
            if (vertices[m].y < this.minY) this.minY = vertices[m].y;
        }*/

        var material = new THREE.MeshBasicMaterial( {
                        //color: 0x0000FF,
                        color: new THREE.Color(Math.random(),Math.random(),Math.random()),
                        transparent: true,
                        opacity: 1,
                        //emissive: 0xff0000,
                        side: THREE.DoubleSide
                    } );

        var mesh = new THREE.Mesh( shape3d, material );
        mesh.verticesNeedUpdate = true;


        //mesh.translateZ(  -0 );
        //mesh.translateX( - 0 );
        //mesh.translateY( - 0 );
        this.add(mesh);
    }
    

    this.boundingBox.expandByObject(this);

    this.rotation.x = -Math.PI * 0.5;
    //this.rotation.x = -Math.PI * 0.5 + (Math.random() - 0.5);
    this.rotation.y = -Math.PI * 0.125;
    /*var vertices = shape3d.vertices;
    

    this.width = this.maxX - this.minX;
    this.height = this.maxY - this.minY;
*/

    
}

CharObject.prototype.update = function () {  
    //this.rotation.x += 0.001;
}
 

