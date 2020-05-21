const net = require('net');
const server = net.createServer();

server.listen(12306);

server.on("listening", (data) => {
  console.log("服务器在监听", data)
})

server.on("connection", socket => {
  console.log("一个客户端连接", Object.keys(socket));
  socket.on("data", chunk => {
    console.log("request", chunk.toString("utf-8"));
    socket.write(`HTTP/1.1 200 ok

<html>你好</html>    `);
    socket.end();
  })
  socket.on("end", () => {
    console.log('连接断开')
  })
})


// 响应
// HTTP/1.1 200 ok
// 
// 响应体