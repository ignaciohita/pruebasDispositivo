/*global cordova, Blob, device, Connection*/
var cadenaRegistro = "";

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

function exportarInformacion() {
    "use strict";

    window.resolveLocalFileSystemURL(cordova.file.externalCacheDirectory, function (dir) {
        dir.getFile("sysinfo.txt", {
            create: true
        }, function (file) {
            file.createWriter(function (fileWriter) {
                fileWriter.seek(fileWriter.length);
                fileWriter.write(new Blob([cadenaRegistro], {
                    type: "text/plain"
                }));

                navigator.notification.alert("Se ha creado el archivo de información del sistema en: " + dir.nativeURL, undefined, "Archivo creado", "Aceptar");
            });
        }, function (fileError) {
            navigator.notification.alert("Hubo un error en la creación del archivo", undefined, "Error", "Aceptar");
        });
    }, function (fileError) {
        navigator.notification.alert("Hubo un error en la creación del archivo", undefined, "Error", "Aceptar");
    });
}

function dispositivoListo() {
    "use strict";

    registrarEvento("deviceready");

    document.getElementById("infoGlobalizacion").innerHTML = "";

    navigator.globalization.getPreferredLanguage(function (idioma) {
        cadenaRegistro += "Idioma preferido: " + idioma.value + "\n";
        document.getElementById("infoGlobalizacion").innerHTML += "Idioma preferido: " + idioma.value + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Idioma preferido no disponible<br>";
    });

    navigator.globalization.getLocaleName(function (idioma) {
        cadenaRegistro += "Idioma local: " + idioma.value + "\n";
        document.getElementById("infoGlobalizacion").innerHTML += "Idioma local: " + idioma.value + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Idioma local no disponible<br>";
    });

    navigator.globalization.getDatePattern(function (patronFecha) {
        cadenaRegistro += "Patrón de fecha: " + patronFecha.pattern + "\n";
        document.getElementById("infoGlobalizacion").innerHTML += "Patrón de fecha: " + patronFecha.pattern + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Patrón de fecha no disponible<br>";
    });

    navigator.globalization.dateToString(new Date(), function (cadenaFecha) {
        cadenaRegistro += "Fecha: " + cadenaFecha.value + "\n";
        document.getElementById("infoGlobalizacion").innerHTML += "Fecha: " + cadenaFecha.value + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Fecha no disponible<br>";
    });

    navigator.globalization.getNumberPattern(function (patronNumero) {
        cadenaRegistro += "Patrón de número: " + patronNumero.pattern + "\n";
        document.getElementById("infoGlobalizacion").innerHTML += "Patrón de número: " + patronNumero.pattern + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Patrón de número no disponible<br>";
    });

    navigator.globalization.numberToString(1234567.89, function (cadenaNumero) {
        cadenaRegistro += "Número: " + cadenaNumero.value + "\n";
        document.getElementById("infoGlobalizacion").innerHTML += "Número: " + cadenaNumero.value + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Número no disponible<br>";
    });

    navigator.globalization.getCurrencyPattern("EUR", function (patronMoneda) {
        cadenaRegistro += "Patrón de moneda: " + patronMoneda.pattern + "\n";
        document.getElementById("infoGlobalizacion").innerHTML += "Patrón de moneda: " + patronMoneda.pattern + "<br>";
    }, function () {
        document.getElementById("infoGlobalizacion").innerHTML += "Patrón de moneda no disponible<br>";
    });

    if (navigator.connection.type === Connection.NONE) {
        document.getElementById("infoConexion").innerHTML = "Dispositivo desconectado.";
        cadenaRegistro += "Dispositivo desconectado\n";
    } else {
        document.getElementById("infoConexion").innerHTML = "Dispositivo conectado con red: " + navigator.connection.type;
        cadenaRegistro += "Dispositivo conectado con red: " + navigator.connection.type + "\n";
    }

    cadenaRegistro += "Información dispositivo:\n - Cordova: " + device.cordova + "\n - Model: " + device.model + "\n - Platform: " + device.platform + "\n - UUID: " + device.uuid + "\n";
    document.getElementById("infoDispositivo").innerHTML = " - Cordova: " + device.cordova + "<br> - Model: " + device.model + "<br> - Platform: " + device.platform + "<br> - UUID: " + device.uuid;

    document.addEventListener("batterystatus", function (info) {
        cadenaRegistro += "Nivel de batería aceptable: " + info.level + "\n";
        document.getElementById("infoBateria").innerHTML = " - Nivel aceptable: " + info.level;
        navigator.notification.beep(1);

    }, false);

    document.addEventListener("batterylow", function (info) {
        cadenaRegistro += "Nivel de batería bajo: " + info.level + "\n";
        document.getElementById("infoBateria").innerHTML = " - Nivel bajo: " + info.level;
        navigator.notification.beep(2);
        navigator.notification.alert("Nivel de batería bajo", undefined, "Carga el dispositivo", "Aceptar");
    }, false);

    document.addEventListener("batterycritical", function (info) {
        cadenaRegistro += "Nivel de batería crítico: " + info.level + "\n";
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
