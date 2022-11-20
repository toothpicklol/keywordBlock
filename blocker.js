var keyword = []
var body = document.getElementById("content");

try {
    chrome.storage.local.get(['keyword'], function(result) {
        console.log(result.keyword)
        if (result.keyword == null || result.keyword == undefined) {
            keyword = []
        } else {
            try {
                keyword = JSON.parse(result.keyword)
            } catch (e) {
                keyword = []
            }
        }
        blocker()

    });
} catch (e) {
    keyword = []
};

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var MutationObserverConfig = {
    childList: true,
    subtree: true,
    characterData: true
};
var observer = new MutationObserver(function(mutations) {
    blocker()
});
observer.observe(body, MutationObserverConfig);

async function blocker() {
    var collection = document.getElementsByClassName("style-scope ytd-rich-grid-row");
    for (var i = 0; i < collection.length; i++) {
        //console.log(collection[i].tagName)
        if (collection[i].tagName == 'YTD-RICH-ITEM-RENDERER') {
            var tmp = collection[i].innerHTML

            for (var j = 0; j < keyword.length; j++) {
                var index = tmp.indexOf(keyword[j]);                
                if (index !== -1) {
                    console.log(collection[i])                    
                    collection[i].remove()
                }
            }
        }

    }

}