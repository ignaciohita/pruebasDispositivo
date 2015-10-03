/*global device*/
var nombreUsuario;

function registrarEvento(evento) {
    "use strict";

    document.getElementById("infoSistema").innerHTML += "<br>- " + evento;
}

function limpiarRegistro() {
    "use strict";

    navigator.notification.confirm("¿Estás seguro de querer vaciar el registro?", function (indiceBotonPulsado) {
        if (indiceBotonPulsado === 1) {
            document.getElementById("infoSistema").innerHTML = "";
            navigator.notification.alert("Registro vaciado", undefined, "Acción completada", "Aceptar");
        }
    }, "¿Seguro?", ["Sí", "No"]);
}

function dispositivoListo() {
    "use strict";

    registrarEvento("deviceready");

    document.getElementById("infoDispositivo").innerHTML = " - Cordova: " + device.cordova + "<br> - Model: " + device.model + "<br> - Platform: " + device.platform + "<br> - UUID: " + device.uuid;

    document.addEventListener("batterystatus", function (info) {
        document.getElementById("infoBateria").innerHTML = " - Nivel aceptable: " + info.level;
        navigator.notification.beep(1);

    }, false);

    document.addEventListener("batterylow", function (info) {
        document.getElementById("infoBateria").innerHTML = " - Nivel bajo: " + info.level;
        navigator.notification.beep(2);
        navigator.notification.alert("Nivel de batería bajo", undefined, "Carga el dispositivo", "Aceptar");
    }, false);

    document.addEventListener("batterycritical", function (info) {
        document.getElementById("infoBateria").innerHTML = " - Nivel crítico: " + info.level;
        navigator.notification.beep(3);
        navigator.notification.alert("Nivel de batería crítico", undefined, "Carga el dispositivo", "Aceptar");
    }, false);

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
