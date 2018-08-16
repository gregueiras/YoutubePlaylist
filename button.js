/*jshint esversion: 6*/

chrome.browserAction.onClicked.addListener(buttonClicker);

function buttonClicker(tab) {

    let myQuery = {
        "currentWindow": true,
        "url": "https://www.youtube.com/watch*"
    };

    chrome.tabs.query(myQuery, execute);

}

function execute(tabs) {
    let ids = getVideoIds(tabs);
    let URL = createURL(ids);
    closeYoutubeTabs(tabs);
    openPlaylist(URL);
}

function getVideoIds(tabs) {
    let ids = [];

    //ReGex by Andrei Zisu (https://goo.gl/vTqaC9)
    let regEx = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    for(let tab of tabs) {
        let url = tab.url;
        
        let id = url.match(regEx);
        ids.push(id[1]);
    }

    return ids;
}

function createURL(ids) {
    let URL = "http://www.youtube.com/watch_videos?video_ids=";

    for (const id of ids) {
        URL += id + ",";
    }

    return URL;
}

function closeYoutubeTabs(tabs) {
    tabs.forEach(tab => {
        chrome.tabs.remove(tab.id);        
    });
}

function openPlaylist(URL) {
    chrome.tabs.create({'url': URL}, function(tab) {
    });
}