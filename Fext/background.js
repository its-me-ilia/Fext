console.log('bg is running')
chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        const appId = "<CHROMIUM-APP-ID>";
        const fbAppId = "<FACEBOOK-ID>";
        console.log(msg)
        if (msg.command === 'FbOauth') {
            const serialize = function (obj) {
                const qstr = [];
                for (var p in obj)
                    if (obj.hasOwnProperty(p)) {
                        qstr.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                return qstr.join("&");
            }
            let options = {
                interactive: true,
                url: 'https://www.facebook.com/dialog/oauth?' +
                    serialize({
                        client_id: fbAppId,
                        redirect_uri: `https://${appId}.chromiumapp.org/redirect`,
                        response_type: 'token',
                        access_type: 'online',
                    })
            };
            chrome.identity.launchWebAuthFlow(options, function (redirectUri) {
                try {
                    console.log(redirectUri)
                    port.postMessage({
                        success: true,
                        redirUrl: redirectUri
                    });
                } catch (err) {
                    console.log(err.message)
                }
            });
        }
    })
})