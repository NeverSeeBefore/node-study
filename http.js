const http = require("http");

const request = http.request(
  // "http://duyi.ke.qq.com/",
  "http://yuanjin.tech:5005/api/movie",
  {
    // method: "GET"
    method: "POST"
  },
  resp => {
    console.log("服务器响应的状态码", resp.statusCode);
    console.log("服务器响应头的", resp.headers);
    let result = "";
    resp.on("data", (chunk) => {
      // console.log(chunk)
      result += chunk.toString("utf-8");
    })
    resp.on("end", (chunk) => {
      // console.log("end", chunk);
      console.log("result: ", JSON.parse(result));
    })
  }
)
request.write("a=1&b=2")
request.end(); // 表示消息体结束

