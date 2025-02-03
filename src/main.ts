import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div id="app-content">
        <p>Some content goes here, click to focus-out of canvas.</p>
        <p>Re-size while unfocused to visualise.</p>
    </div>
    <babylon-viewer
        source="Billy-T_Test.glb"
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
        const resizeListener = debounce(() => {
            // https://forum.babylonjs.com/t/viewer-v2-render-considerations/56024/7
            scene.getEngine().beginFrame();
            scene.render();
            scene.getEngine().endFrame();
        }, 50);
        window.addEventListener("resize", resizeListener, true);
    });
} else {
    console.error("Did not find Viewer!")
}

/**
 * Debouncing creates a factory function that limits high consecutive callbacks, effectively excluded from executing.
 * A good example is window resizing.
 *
 * @param {UnknownFunction} callback - The function to debounce.
 * @param {number} timeout - The number of milliseconds to delay the invocation of the callback.
 * @return {UnknownFunction} A debounced function that can be invoked with arguments.
 */
function debounce(callback: UnknownFunction, timeout: number): UnknownFunction {
    let timeoutId: number | undefined = undefined;
    return (...args: any[]) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => callback(...args), timeout);
    };
}

type UnknownFunction = (...args: unknown[]) => unknown;