
function sendAjax(url, oData, reqListener) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener.bind(oReq));
    oReq.open("GET", url);
    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    oReq.send(JSON.stringify(oData));
}

//title=xxx&owner=xxxx&priority=2순위&regdate=20180116
function addTodoHtml(template) {
    var urlParams = new URLSearchParams(window.location.search);

    if(!urlParams.has("title")) return false;
    var title = urlParams.get('title');
    var owner= urlParams.get('owner');
    var priority = urlParams.get('priority').substring(0,1);
    var regdate = urlParams.get('regdate');


    var html = template.
            replace(/{{title}}/, title).
            replace(/{{owner}}/, owner).
            replace(/{{priority}}/, priority).
            replace(/{{regdate}}/, regdate);
            document.querySelector(".todo").insertAdjacentHTML("beforeend", html);
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

    var TODOTemplate = '<li data-id="4"><h3 class="title">{{title}}</h3><div class="sub-desc">등록날짜:regdate, {{owner}}, 우선순위 {{priority}}</div><button>&#8594;</button></li>';
    addTodoHtml(TODOTemplate);

});