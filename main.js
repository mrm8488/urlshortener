"use strict";

const endpoint =
  "https://www.jsonstore.io/c6e6aa61897fbcab475ef6460b7da8fd6f20ecc59d523e926edb58c63f18946d";

const getrandom = () => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

const geturl = () => {
  const url = document.getElementById("urlinput").value;
  const protocol_ok =
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("ftp://");
  if (!protocol_ok) {
    let newurl = `http://${url}`;
    return newurl;
  } else return url;
};

const genhash = () => {
  if (window.location.hash == "") {
    window.location.hash = getrandom();
  }
};

const sendRequest = url => {
  $.ajax({
    url: endpoint + "/" + window.location.hash.substr(1),
    type: "POST",
    data: JSON.stringify(url),
    dataType: "json",
    contentType: "application/json; charset=utf-8"
  });
};

const shorturl = () => {
  document.getElementById("alert").style = "display:none";
  const longurl = geturl();
  genhash();
  sendRequest(longurl);
  document.getElementById("alert").style = "display:block";
};

const hashh = window.location.hash.substr(1);

if (window.location.hash != "") {
  $.getJSON(endpoint + "/" + hashh, data => {
    data = data["result"];
    console.log(data);
    if (data != null) window.location.href = data;
  });
}
