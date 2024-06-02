const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', function() {
        const code = document.getElementById('textarea').textContent;
        ipcRenderer.invoke('save-code-to-file', code)
            .then(filePath => {
                console.log('File saved:', filePath);
            })
            .catch(error => {
                console.error('Error saving file:', error);
            });
    });
});
