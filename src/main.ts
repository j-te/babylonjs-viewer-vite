import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <babylon-viewer
        source="https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/ufo.glb"
        environment="https://cdn.jsdelivr.net/npm/@babylonjs/viewer@preview/assets/photoStudio.env"
    >
    </babylon-viewer>
`
