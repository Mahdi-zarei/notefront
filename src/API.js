

let TOKEN = null
let Username = null

export function set_credentials(token, username) {
    TOKEN = token
    Username = username
}

export function send_and_receive(data, URL, call_back, appendSecurity) {
    let xhttp = new XMLHttpRequest()
    xhttp.open("POST", `http://127.0.0.1:8000/${URL}/`)
    xhttp.onload = function () {
        let answer = this.responseText
        answer = JSON.parse(answer)
        call_back(answer)
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    if (appendSecurity) {
        data.Token = TOKEN
        data.Username = Username
    }
    let coded = JSON.stringify(data)
    xhttp.send(coded)
}

