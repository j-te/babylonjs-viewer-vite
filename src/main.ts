import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div id="app-content">
        <p>Some content goes here, click to focus-out of canvas.</p>
        <p>Re-size while unfocused to visualise.</p>
    </div>
    <babylon-viewer
        source="https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/ufo.glb"
        environment="https://cdn.jsdelivr.net/npm/@babylonjs/viewer@preview/assets/photoStudio.env"
        animation-auto-play
        engine="WebGPU"
        autofocus
        tabindex="-1"
    >
    </babylon-viewer>
`

const viewer: any = document.querySelector('babylon-viewer');
if (viewer) {
    viewer.addEventListener('viewerready', () => {
        // Suspend while canvas is not focused
        let renderingSuspension: any = null;
        viewer.addEventListener('focus', () => {
            renderingSuspension?.dispose();
            renderingSuspension = null;
        });
        viewer.addEventListener('blur', () => {
            if (!renderingSuspension) {
                renderingSuspension = viewer.viewerDetails.suspendRendering();
            }
        });

        // resizeListener to re-render, while rendering is suspended (not focused).
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
