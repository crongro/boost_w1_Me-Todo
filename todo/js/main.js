
function sendAjax(url, oData, reqListener) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener.bind(oReq));
    oReq.open("GET", url);
    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    oReq.send(JSON.stringify(oData));
}

document.addEventListener("DOMContentLoaded", function() {
    var listWrap = document.querySelector(".listwrap");

    listWrap.addEventListener("click", function(evt){
        var target = evt.target;
        if(target.tagName !== "BUTTON") return;

        var nextStatusWrap = target.closest("ul").nextElementSibling;

        sendAjax("./mock/updateStatus.json",
                 {
                     "id" : target.closest("li").dataset.id,
                     "nextStatus" : nextStatusWrap.className
                 },
                 function() {
                    if((JSON.parse(this.responseText).result) === "ok") {
                        nextStatusWrap.appendChild(target.parentElement);
                    }
                }
        );
    });
});