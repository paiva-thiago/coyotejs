function getRequestObject() {
    let possibilities = [
        () => new XMLHttpRequest(),
        () => new ActiveXObject("Microsoft.XMLHTTP"),
        () => new ActiveXObject("Msxml2.XMLHTTP.6.0")
    ];

    for (let i = 0; i < possibilities.length; i++) {
        try {
            return possibilities[i]()
        } catch (e) {}
    }
}

function aja(method, url, callbackSucesso, callbackErro, isAsync) {
    let request = getRequestObject();
    request.open(method, url, isAsync);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                callbackSucesso(this.responseText);
            } else {
                callbackErro();
            }
        }
    }
    request.send();
    request = null;
}