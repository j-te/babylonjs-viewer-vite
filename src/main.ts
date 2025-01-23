import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <babylon-viewer
        source="https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/ufo.glb"
        environment="https://cdn.jsdelivr.net/npm/@babylonjs/viewer@preview/assets/photoStudio.env"
        animation-auto-play
        engine="WebGPU"
    >
    </babylon-viewer>
`

const viewer: any = document.querySelector('babylon-viewer');
if (viewer) {
    viewer.addEventListener('viewerready', () => {
        const scene = viewer.viewerDetails.scene;
        const resizeListener = () => {
            // https://forum.babylonjs.com/t/viewer-v2-render-considerations/56024/7
            scene.getEngine().beginFrame();
            scene.render();
            scene.getEngine().endFrame();
        };
        window.addEventListener("resize", resizeListener, true);
    });
} else {
    console.error("Did not find Viewer!")
}
