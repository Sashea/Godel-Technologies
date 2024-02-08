function init() {
    const fileInput = document.getElementById('musicFile');
    fileInput.onchange = playMusic;
    const audioElement = document.getElementById('musicPlayer');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audioElement);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    const gridContainer = document.getElementById('grid');
    const cells = gridContainer.querySelectorAll('#cell');
    const numCells = cells.length;

    function updateColors() {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        cells.forEach((cell, index) => {
            const frequencyIndex = Math.floor(index / numCells * dataArray.length);
            const intensity = dataArray[frequencyIndex] / 255;
            cell.style.backgroundColor = `rgba(195, 242, 114, ${intensity})`;
        });
        requestAnimationFrame(updateColors);
    }
    updateColors();

    function playMusic() {
        const fileInput = document.getElementById('musicFile');
        const file = fileInput.files[0];
        const objectURL = URL.createObjectURL(file);
        audioElement.src = objectURL;
        audioElement.play();
    }

    document.getElementById('musicPlayer').style.display = 'block';

}
