var scene, camera, renderer, raycaster, light, car, car2, Mining, factory, House, Niagrafalls, ship, treo, dirLight,
    mouse = new THREE.Vector2(),
    INTERSECTED,
    slider = document.getElementById('slider'),
    tween, object, dae, car, material, timer, group, cloud, sprite, sprite2;
var textureLoader = new THREE.TextureLoader();

var cameraSpeed = .1;

const init = (resolve) => {
    //add detector to see if WebGL is supported
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    //set up a scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x534f4f, 0.09, 20)
    //add a camera
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    //render the scene - start renderer and set it's size
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //add to webpage
    document.body.appendChild(renderer.domElement);
    light = new THREE.AmbientLight(0xffffff, .1);
    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(dirLight);
    scene.add(light);
    group = new THREE.Group();
    cloud = textureLoader.load("assets/img/cloud.png");
    material = new THREE.SpriteMaterial({
        map: cloud,
        color: 0xffffff,
        fog: true
    });
    //    for (i = 0; i < 100; i++) {
    //        var x = 300 * Math.random() - 150;
    //        var y = (10 * Math.random()) + 90;
    //        var z = 300 * Math.random() - 150;
    //
    //        sprite = new THREE.Sprite(material);
    //        sprite.position.set(x, y, z);
    //        sprite.scale.x = sprite.scale.y = sprite.scale.z = 20;
    //        group.add(sprite);
    //
    //    }
    scene.add(group);
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('assets/Canada.dae', collada => {
        dae = collada.scene;
        dae.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        dae.scale.x = dae.scale.y = dae.scale.z = 1;
        dae.updateMatrix();
        scene.add(dae);
        var box_geo = new THREE.BoxGeometry(5000, 600, 5000);
        var box_mat = new THREE.MeshBasicMaterial({
            color: 0x343932,
            transparent: true
        });
        car = dae.getObjectByName("Honda", true);
        car2 = dae.getObjectByName("Toyota", true);
        Mining = dae.getObjectByName("Mining", true);
        factory = dae.getObjectByName("factory", true);
        House = dae.getObjectByName("House", true);
        Niagrafalls = dae.getObjectByName("Niagrafalls", true);
        ship = dae.getObjectByName("ship", true);
        treo = dae.getObjectByName("treo", true);

        resolve('resolved');
        render();
        timer = setInterval(makeSmoke, 2500);

        /*    //star field code https://threejs.org/docs/#api/en/materials/PointsMaterial//

            var starsGeometry = new THREE.Geometry();

            for (var i = 0; i < 10000; i++) {

                var star = new THREE.Vector3();
                star.x = THREE.Math.randFloatSpread(2000);
                star.y = THREE.Math.randFloatSpread(2000);
                star.z = THREE.Math.randFloatSpread(2000);

                starsGeometry.vertices.push(star);

            }

            var starsMaterial = new THREE.PointsMaterial({
                color: 0xffffff
            });

            var starField = new THREE.Points(starsGeometry, starsMaterial);

            scene.add(starField);*/


    });
    //position camera
    camera.position.set(8, 2, 4);
    camera.rotation.y = 0.8;
    raycaster = new THREE.Raycaster();
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const onDocumentMouseMove = event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

document.onmousedown = e => {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        INTERSECTED = intersects[0].object;
        if (INTERSECTED.parent.name == "tree") {
            INTERSECTED.position.y += 10;
        }
    }
}

function makeSmoke() {
    var pos = car.position.clone();
    var pos2 = car2.position.clone();
    var pos3 = Mining.position.clone();
    var pos4 = factory.position.clone();
    var pos5 = House.position.clone();
    var pos6 = Niagrafalls.position.clone();
    var pos7 = ship.position.clone();
    var pos8 = treo.position.clone();
    sprite = new THREE.Sprite(material);
    sprite2 = new THREE.Sprite(material);
    sprite3 = new THREE.Sprite(material);
    sprite4 = new THREE.Sprite(material);
    sprite5 = new THREE.Sprite(material);
    sprite6 = new THREE.Sprite(material);
    sprite7 = new THREE.Sprite(material);
    sprite8 = new THREE.Sprite(material);
    sprite.position.set(pos.x, pos.y, pos.z);
    sprite2.position.set(pos2.x, pos2.y, pos2.z);
    sprite3.position.set(pos3.x, pos3.y, pos3.z);
    sprite4.position.set(pos4.x, pos4.y, pos4.z);
    sprite5.position.set(pos5.x, pos5.y, pos5.z);
    sprite6.position.set(pos6.x, pos6.y, pos6.z);
    sprite7.position.set(pos7.x, pos7.y, pos7.z);
    sprite8.position.set(pos8.x, pos8.y, pos8.z);
    sprite.scale.x = sprite.scale.y = sprite.scale.z = 0.1;
    sprite2.scale.x = sprite2.scale.y = sprite2.scale.z = 0.1;
    sprite3.scale.x = sprite3.scale.y = sprite3.scale.z = 0.1;
    sprite4.scale.x = sprite4.scale.y = sprite4.scale.z = 0.1;
    sprite5.scale.x = sprite5.scale.y = sprite5.scale.z = 0.1;
    sprite6.scale.x = sprite6.scale.y = sprite6.scale.z = 0.1;
    sprite7.scale.x = sprite7.scale.y = sprite7.scale.z = 0.1;
    sprite8.scale.x = sprite8.scale.y = sprite8.scale.z = 0.1;
    group.add(sprite);
    group.add(sprite2);
    group.add(sprite3);
    group.add(sprite4);
    group.add(sprite5);
    group.add(sprite6);
    group.add(sprite7);
    group.add(sprite8);
}

const render = () => {
    dirLight.position.set(camera.position.x, camera.position.y, camera.position.z);
    TWEEN.update();
    requestAnimationFrame(render);
    var timer = Date.now() * 0.00001;
    renderer.render(scene, camera);


    for (let i = 0; i < group.children.length; i++) {
        var obj = group.children[i];
        if (obj.position.y < 30) {
            obj.position.y += 0.01;
            obj.scale.x = obj.scale.y = obj.scale.z += 0.002;
        }
    }
}
//y is height, z is to zoom 
const changeCamera = () => {
    let pos1 = new TWEEN.Tween(camera.position).to({
        x: 6,
        y: 3,
        z: 4
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos2 = new TWEEN.Tween(camera.position).to({
        x: 8,
        y: .9,
        z: 2
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos3 = new TWEEN.Tween(camera.position).to({
        x: .9,
        y: 4,
        z: 2
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos4 = new TWEEN.Tween(camera.position).to({
        x: 8,
        y: 4,
        z: -7
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos5 = new TWEEN.Tween(camera.position).to({
        x: -3,
        y: 1,
        z: 2
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos6 = new TWEEN.Tween(camera.position).to({
        x: 45,
        y: 6,
        z: 7
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos7 = new TWEEN.Tween(camera.position).to({
        x: 28,
        y: 4,
        z: 20
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let pos8 = new TWEEN.Tween(camera.position).to({
        x: 28,
        y: 400,
        z: 20
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);


    let rot2 = new TWEEN.Tween(camera.rotation).to({
        y: -1,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot3 = new TWEEN.Tween(camera.rotation).to({
        z: 1,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot4 = new TWEEN.Tween(camera.rotation).to({
        y: .6,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot5 = new TWEEN.Tween(camera.rotation).to({
        y: -25,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    let rot8 = new TWEEN.Tween(camera.rotation).to({
        y: 60,
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);





    slider.value == 1 ? (pos1.start(), switchTo('texts', 'text1')) : slider.value == 2 ? (pos2.start(), rot2.start(), switchTo('texts', 'text2')) : slider.value == 3 ? (pos3.start(), switchTo('texts', 'text3')) : slider.value == 4 ? (pos4.start(), switchTo('texts', 'text4')) : slider.value == 5 ? (pos5.start(), switchTo('texts', 'text5')) : slider.value == 6 ? (pos6.start(), switchTo('texts', 'text6')) : slider.value == 7 ? (pos7.start(), switchTo('texts', 'text7')) : slider.value == 8 ? (pos8.start(), switchTo('texts', 'text8')) : 0;
}
//dynamic functions
const switchTo = (off, on) => {
    //Hiding all
    let allTargets = document.getElementsByClassName(off);
    for (let i = 0; i < allTargets.length; i++) {
        allTargets[i].style.display = 'none';
    }
    //Showing dynamic
    let target = document.getElementsByClassName(on)[0];
    target.style.display = 'block';
    target.style.opacity = 0;
    target.style.transition = 'opacity 10s ease-out';
    setTimeout(() => {
        target.style.opacity = 1;
    }, 100)
}

function initThreeJs() {
    return new Promise(resolve => {
        init(resolve);
    });
}
async function deleteLoading() {
    var result = await initThreeJs();
    let preLoad = document.getElementsByClassName('preload')[0];
    preLoad.style.display = 'none';
}

deleteLoading();
