/*global device, Connection*/
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

    document.getElementById("infoGlobalizacion").innerHTML = "";

    navigator.globalization.getPreferredLanguage(function (idioma) {
        document.getElementById("infoGlobalizacion").innerHTML += "Idioma preferido: " + idioma.value + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Idioma preferido no disponible<br>";
    });

    navigator.globalization.getLocaleName(function (idioma) {
        document.getElementById("infoGlobalizacion").innerHTML += "Idioma local: " + idioma.value + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Idioma local no disponible<br>";
    });

    navigator.globalization.getDatePattern(function (patronFecha) {
        document.getElementById("infoGlobalizacion").innerHTML += "Patrón de fecha: " + patronFecha.pattern + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Patrón de fecha no disponible<br>";
    });

    navigator.globalization.dateToString(new Date(), function (cadenaFecha) {
        document.getElementById("infoGlobalizacion").innerHTML += "Fecha: " + cadenaFecha.value + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Fecha no disponible<br>";
    });

    navigator.globalization.getNumberPattern(function (patronNumero) {
        document.getElementById("infoGlobalizacion").innerHTML += "Patrón de número: " + patronNumero.pattern + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Patrón de número no disponible<br>";
    });

    navigator.globalization.numberToString(1234567.89, function (cadenaNumero) {
        document.getElementById("infoGlobalizacion").innerHTML += "Número: " + cadenaNumero.value + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Número no disponible<br>";
    });

    navigator.globalization.getCurrencyPattern("EUR", function (patronMoneda) {
        document.getElementById("infoGlobalizacion").innerHTML += "Patrón de moneda: " + patronMoneda.pattern + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Patrón de moneda no disponible<br>";
    });

    if (navigator.connection.type === Connection.NONE) {
        document.getElementById("infoConexion").innerHTML = "Dispositivo desconectado.";
    } else {
        document.getElementById("infoConexion").innerHTML = "Dispositivo conectado con red: " + navigator.connection.type;
    }

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
