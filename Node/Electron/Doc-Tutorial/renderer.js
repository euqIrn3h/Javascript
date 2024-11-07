let path = '';
let csv = '';

document.getElementById('btn-chooseDir').addEventListener('click', async () => {
    try {
        path = await window.ipc.ipcRenderer.invoke('chooseDirectory');
        document.getElementById('chosenPath').innerHTML = `<p class="p-2 m-2 border border-2 rounded-3"> ${path}</p>`;
    } catch (error) {
        console.error('Erro ao selecionar diretório:', error);
    }
});

document.getElementById('search').addEventListener('click', async () => {
    try {
        let city = document.getElementById('city').value;
        let business = document.getElementById('business').value;
        let maxRecords = document.getElementById('maxRecords').value;
        let maxIterations = document.getElementById('maxIterations').value;
        
        csv = await window.ipc.ipcRenderer.invoke('getEnterprisesCsv', {city:city, business: business, maxRecords: maxRecords, maxIterations: maxIterations});
        
        window.ipc.ipcRenderer.invoke('fileUtils',{csv: csv, path: path + '/output.csv'});
    } catch (error) {
        console.error('Erro ao acionar o scrapper:', error);
    }
});