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
        csv = await window.ipc.ipcRenderer.invoke('getEnterprisesCsv');
        console.log(csv);
        
        window.ipc.ipcRenderer.invoke('fileUtils',{csv: csv, path: path + '/output.csv'});
    } catch (error) {
        console.error('Erro ao acionar o scrapper:', error);
    }
});