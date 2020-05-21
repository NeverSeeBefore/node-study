
const net = require("net");
const socket = net.createConnection(
  {
    host: "duyi.ke.qq.com",
    port: 80,
  },
  (data) => {
    console.log("连接成功", data);
  }
);

let receive = null;

function parseHeader(response) {
  const index = response.indexOf("\r\n\r\n");
  const head = response.substring(0, index);
  const body = response.substring(index + 2, response.length);
  const headPorts = head.split("\r\n");
  const headArray = headPorts.slice(1).map(str => {
    return str.split(': ');
  })
  const header = headArray.reduce( (a, b) => {
    a[b[0]]= b[1];
    return a;
  }, {})
  console.log('header\r\n', header)
  console.log('header\r\n', "---" + body.substring(0, 4) + "---");
  return {
    header,
    body: body
  }
}

function isOver() {
  const contentLength = +receive.header["Content-Length"];
  const curReceiveLength = Buffer.from(receive.body, "utf-8").byteLength;
  // console.log(contentLength,curReceiveLength);
  return curReceiveLength >= contentLength;
}

socket.on("data", (data) => {
  // console.log("来自服务器的信息", data.toString("utf-8"));
  const response = data.toString("utf-8");
  if(!receive){
    receive = parseHeader(response);
    if(isOver()){
      socket.end();
    }
    return;
  }
  receive.body += response;
  console.log('header\r\n', "---" + response.substring(0, 6) + "---");
  if(isOver()){
    socket.end();
  }
  return;
});

socket.on("close", (data) => {
  console.log("结束",data);
});
// socket.write(`你好`);
// 请求行
// 请求头
// 请求行
// 请求行
// 请求体
socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com
Connection: keep-alive

`)


