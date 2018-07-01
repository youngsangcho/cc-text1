
var camera, light, spotLight, spotLight2, controls, scene, maskScene;
var frameCount = 0;

var composer, renderer;

var worldWidth = 256, worldDepth = 256,
worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;

var clock = new THREE.Clock();

var objectHolder;
var theFont;
var textShapes;

init();
animate();

function init() {
    var container = document.getElementById( 'container' );
    container.innerHTML = "";  

    scene = new THREE.Scene();

    spotLight = new THREE.SpotLight( 0xffffff, 1 );
    spotLight.position.set( 15, 40, 35 );
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.05;
    spotLight.decay = 2;
    spotLight.distance = 200;

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;
    scene.add( spotLight );

    //camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
    //camera = new THREE.OrthographicCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
    //camera.position.z = 300;
    //camera.position.set( 5, 5, 30 );
    var frustumSize = 100;
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, 
        frustumSize / 2, frustumSize / - 2, 1, 2000 );
    camera.position.y = 100;
    camera.position.x = 0;
    camera.position.z = 10;


    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setClearColor(0xFFFFFF);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = true;
    document.body.html = "";
    document.body.appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.minDistance = 20;
    controls.maxDistance = 500;
    controls.enablePan = false;

    controls.target.copy( new THREE.Vector3(0,0,0) );
    controls.update();


    window.addEventListener('resize', onWindowResize, false);

    document.getElementById('btn_export').addEventListener('click', function () {
        var exporter = new THREE.STLExporter();
        var result = exporter.parse( scene );
        vlog(result);   
    });

    initApp();
}

function initApp() {
    objectHolder = new vObject();
    scene.add( objectHolder );

    var loader = new THREE.FontLoader();
    var _this = this;
    loader.load( 'assets/SpoqaHanSans_Bold.json', function ( font ) {
        theFont = font;
        document.getElementById('myText').addEventListener('input', _this.textUpdated.bind(_this));
        generateTextShape(document.getElementById('myText').value);
    } );
}

function generateTextShape(txt) {
    // clear objectHolder
    while( objectHolder.children.length > 0 ) {
        objectHolder.remove( objectHolder.children[0] );
    }

    textShapes = [];
    //vlog( txt, objectHolder.children.length );
    if( txt.length == 0 ) {
        return;
    }

    var x = 0;
    for ( var i = 0; i < txt.length; i++ ) {
        var aShape = theFont.generateShapes( txt[i], 2, 1 );
        var charObj = new CharObject(aShape);
        charObj.position.x = x;
        objectHolder.add( charObj );
        x += charObj.boundingBox.max.x - charObj.boundingBox.min.x;
    }
}

function textUpdated(e) {
    if ( e.target.value.length >= 0 ) {
        generateTextShape(e.target.value);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    objectHolder.updateTree();
    
    var time = performance.now() * 0.001;


    renderer.render( scene, camera );

    frameCount++;
}

