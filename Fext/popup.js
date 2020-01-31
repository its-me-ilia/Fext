document.getElementById('fbOauth').onclick = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {command: 'FbOauth'}, function(res){
            console.log(res)
        });
    });
};