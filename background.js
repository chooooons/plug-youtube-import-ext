const spec = [ "blocking" ];
const filter = {
    urls: [
        "*://content.googleapis.com/youtube/v3/channels?forUsername=*"
    ]
};

const listener = req => {
    console.info(`BEGIN redirector: ${req.url}`);

    const cid = (req.url.match(/(?<=forUsername=)[\w\d\-]+/) || [])[0];

    /**
     * Making the assumption that any channelId that isn't 24 characters
     * is a 'named' channel so redirection isn't needed.
     */
    if(cid?.length !== 24) {
        return;
    }

    const rurl = req.url;
    const redirectUrl = rurl.replace('forUsername=', 'id=');

    console.info(`Redirect to: ${redirectUrl}`);

    return {
        redirectUrl
    };
};

chrome.webRequest.onBeforeRequest.addListener(listener, filter, spec);
