var keyword = []
var HTML


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn1").onclick = function() { btn1OnClick() };
    document.getElementById("btn2").onclick = function() { btn2OnClick() };
    try {
        chrome.storage.local.get(['keyword'], function(result) {
            //console.log(result.keyword)
            if (result.keyword == null || result.keyword == undefined) {
                keyword = []
            } else {
                try {
                    keyword = JSON.parse(result.keyword)
                } catch (e) {
                    keyword = []
                }
            }
            //console.log(keyword)
            keywordList()
        });
    } catch (e) {
        keyword = []
    };
})

function keywordList() {
    for (var i = 0; i < keyword.length; i++) {
        var node = document.createElement("button");
        node.className = "keywordBtn"
        node.setAttribute("id", "keywordBtn" + i);
        var textnode = document.createTextNode(keyword[i]);
        node.appendChild(textnode);
        document.getElementById("scroll").appendChild(node);
    }
    keywordButtonListener()
}

function updateKeywordList() {
    var ele = document.querySelectorAll(".keywordBtn")
    ele.forEach(keywordBtn => {
        keywordBtn.remove();
    });
    keywordList()
}

function btn1OnClick() {
    var text = document.getElementById("keyword").value

    if (text !== "") {
        if (!keyword.includes(text)) {
            keyword.push(text)
            alert('新增成功');

            var value = { "keyword": JSON.stringify(keyword) }
            try {
                chrome.storage.local.set(value, function() {;
                });
            } catch (e) {
                console.log(e)
                keyword = []
            }
            updateKeywordList();

        } else {
            alert('新增失敗:已有關鍵字');
        }


    } else {
        alert('新增失敗:關鍵字不可為空');
    }


}

function btn2OnClick() {

    var value = { "keyword": [] }
    try {
        chrome.storage.local.set(value, function() {;
        });
    } catch (e) {
        console.log(e)

    }

    try {
        chrome.storage.local.get(['keyword'], function(result) {
            //console.log(result.keyword)
            if (result.keyword == null || result.keyword == undefined) {
                keyword = []
            } else {
                try {
                    keyword = JSON.parse(result.keyword)
                } catch (e) {
                    keyword = []
                }

            }
            //console.log(keyword)
            updateKeywordList();


        });
    } catch (e) {
        keyword = []
    }




    alert('成功');

}

function keywordButtonListener() {

    var classname = document.querySelectorAll(".keywordBtn")


    for (var i = 0; i < classname.length; i++) {
        //console.log(classname[i])

        classname[i].addEventListener('click', function() {

            var vid = this.id;
            deleteEle(vid);
        });
    }


}

function deleteEle(i) {

    var ele = document.getElementById(i)
    var eleText = ele.innerText
    ele.remove();


    var index = keyword.indexOf(eleText);
    if (index !== -1) {
        keyword.splice(index, 1);
    }

    var value = { "keyword": JSON.stringify(keyword) }
    try {
        chrome.storage.local.set(value, function() {;
        });
    } catch (e) {
        console.log(e)
        keyword = []
    }



}