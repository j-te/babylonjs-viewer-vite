import { debounce } from "../../src/utilities";

const viewer: any = document.querySelector("babylon-viewer");
if (viewer) {
  viewer.addEventListener("viewerready", () => {
    // Suspend while canvas is not focused
    let renderingSuspension: any = null;
    viewer.addEventListener("focus", () => {
      renderingSuspension?.dispose();
      renderingSuspension = null;
    });
    viewer.addEventListener("blur", () => {
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
  console.error("Did not find Viewer!");
}
