document.addEventListener("DOMContentLoaded", function () {
    //activate sidebar nav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                //Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });
            }

            //Add Event Listener 
            document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                elm.addEventListener("click", function (event) {
                    //Close Sidenav
                    var sidenav = document.querySelector(".sidenav")
                    M.Sidenav.getInstance(sidenav).close();

                    //LoadPage
                    page = event.target.getAttribute("href").substr(1)
                    loadPage(page)
                })
            })
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    };

    //load page content
    var page = window.location.hash.substr(1)
    if (page == "") page = "home";
    loadPage(page)

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            var content = document.querySelector("#body-content")
            if (this.readyState == 4) {
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText
                    if (page == "teamlist") getTeamList()
                    if (page == "schedule") getSchedule()
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan</p>"
                } else {
                    content.innerHTML = "<p>Ups, Halaman tidak bisa diakses</p>"
                }
            }
        }
        xhttp.open("GET", "pages/" + page + ".html", true)
        xhttp.send()
    }
})