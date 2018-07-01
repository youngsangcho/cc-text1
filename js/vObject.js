var vObject = function (){
    THREE.Object3D.call(this);
};
vObject.prototype = Object.create( THREE.Object3D.prototype );
vObject.prototype.constructor = vObject;

vObject.prototype.init = function () {
}

THREE.Object3D.prototype.update = function () {
}

THREE.Object3D.prototype.updateTree = function () {

    this.update();

    this.children.forEach( function (child) {
        child.updateTree();
    });
}

var vlog = function () {
    for (var i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}

