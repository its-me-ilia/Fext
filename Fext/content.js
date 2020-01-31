console.log('Chrome extension RUN');
const port = chrome.runtime.connect();
chrome.runtime.onMessage.addListener((req, sender, res) => {
    try {
        console.log(req)
        if (req.command === 'FbOauth') {
            port.postMessage({
                command: 'FbOauth'
            })
        };
        res({
            success: true
        })
    } catch (err) {
        console.log(err.message)
    }
})
port.onMessage.addListener(async function (req, sender, sendRes) {
    try {
        if (req.success) {
            console.log(req.redirUrl)
            const query = req.redirUrl.substr(req.redirUrl.indexOf('=') + 1, req.redirUrl.indexOf('&'));
            const accessToken = query.split('&')[0];
            console.log(accessToken);
            const data = {
                accessToken: accessToken
            }
            console.log(data)
            const foc = await fetch('http://localhost:4000/api/findorcreate',{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log(await foc.json());
        }
    }catch(err){
        console.log(err.message)
    }
});