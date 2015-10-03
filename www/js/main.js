function registrarEvento(evento) {
    "use strict";

    document.getElementById("infoSistema").innerHTML += "<br>- " + evento;
}

function dispositivoListo() {
    "use strict";

    registrarEvento("deviceready");

    document.addEventListener("pause", function () {
        registrarEvento("pause");
    }, false);

    document.addEventListener("resume", function () {
        registrarEvento("resume");
    }, false);

    document.addEventListener("online", function () {
        registrarEvento("online");
    }, false);

    document.addEventListener("offline", function () {
        registrarEvento("offline");
    }, false);

    document.addEventListener("backbutton", function () {
        registrarEvento("backbutton");
    }, false);

    document.addEventListener("menubutton", function () {
        registrarEvento("menubutton");
    }, false);

    document.addEventListener("searchbutton", function () {
        registrarEvento("searchbutton");
    }, false);

    document.addEventListener("startcallbutton", function () {
        registrarEvento("startcallbutton");
    }, false);

    document.addEventListener("endcallbutton", function () {
        registrarEvento("endcallbutton");
    }, false);

    document.addEventListener("volumedownbutton", function () {
        registrarEvento("volumedownbutton");
    }, false);

    document.addEventListener("volumeupbutton", function () {
        registrarEvento("volumeupbutton");
    }, false);
}

function inicioAplicacion() {
    "use strict";
    document.addEventListener("deviceready", dispositivoListo);
}
