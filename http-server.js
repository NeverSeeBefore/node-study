const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

async function getStat(filename) {
  try {
    return await fs.promises.stat(filename);
  } catch (e) {
    return null;
  }
}

async function getFile(requestUrl) {
  const urlObj = url.parse(requestUrl);
  let filename = path.resolve(__dirname, "public", urlObj.pathname.substr(1));
  let state = await getStat(filename);
  if (!state) {
    // 文件不存在 或者 是一个目录
    console.log("文件不存在");
    return null;
  } else if (state.isDirectory()) {
    filename = path.resolve(__dirname, "public", urlObj.pathname.substr(1), "index.html");
    state = await getStat(filename);
    if(!state){
      console.log("文件还是不存在");
      return null;
    }else{
      console.log("加了个index.html");
      console.log(filename);
      return await fs.promises.readFile(filename);
    }
  }else{
    console.log("正常的文件");
    console.log(filename);
    return await fs.promises.readFile(filename);
  }
}

const server = http.createServer(async function handler(request, response) {
  const info = await getFile(request.url);
  if(!info) {
    response.statusCode = 404;
    response.write("请求文件不存在");
  }else{
    response.write(info);
  }
  response.end();
});

server.on("listening", () => {
  console.log("listening on 12306");
});
server.listen("12306");
