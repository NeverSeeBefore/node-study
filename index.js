// console.log(global);
// console.log(__dirname);
// const buffer = Buffer.from("anc", "utf-8")
// console.log(buffer);

// os
// const  os = require('os')
// console.log(os.cpus());
// console.log(os.tmpdir())
// console.log(os.homedir());

// path
// const path = require('path');

// const basename = path.basename("abc/asdc/asc/a.js", ".js")
// const basename1 = path.basename("abc/asdc/asc/a.html", ".js")
// console.log(basename, basename1);

// url
// const URL = require('url')
// console.log(new URL.URL("https://www.baidu.com:800/abc?a=1#aaa").searchParams.has('a'))

//util
// const util = require("util");
// const obj = {
//   a: 1,
//   b: "2",
//   c: {
//     a: "1",
//   },
// };

// console.log(
//   util.isDeepStrictEqual(obj, {
//     a: 1,
//     b: "2",
//     c: {
//       a: "1",
//     },
//   })
// );

// fs
// const fs = require("fs");
// const path = require("path");

// const filename = path.resolve(__dirname, "index.html");
// console.log(filename);
// fs.readFile(filename, "utf-8", (err, data) => {
//   if(err){
//     console.log("读取失败")
//   }else{
//     console.log(data.substr(0, 15));
//   }
// });
// console.log('111');

// var data = fs.readFileSync(filename, "utf-8");
// console.log(data);
// console.log('111');

// async function test(){
//   // copy
//   const filename = path.resolve(__dirname, "index.html");
//   const buffer = await fs.promises.readFile(filename);
//   const toFilename = path.resolve(__dirname, "./myFiles/index.copy.html");
//   await fs.promises.writeFile(toFilename, buffer);
//   console.log("copy successd");
// }
// test();

// fs.promises.stat(__filename).then(res => {
//   console.log(res.isDirectory());
//   console.log(res.isFile());
//   console.log(res.isFIFO());
// })

// fs.promises.readdir(__dirname).then(pathes => {
//   console.log(pathes);
// })

// async function test() {
//   // await fs.promises.mkdir('abc');
//   const abc = await exists(__dirname + '/abc.html')
//   console.log(abc);
// }

// async function exists(filename) {
//   try{
//     await fs.promises.stat(filename);
//     return true;
//   }catch(e){
//     console.log(e);
//     if(e.console === 'ENOENT'){
//       return false;
//     }
//   }
// }
// test();

// file
// class File {
//   constructor(filename, name, ext, isFile, size, ctime, utime) {
//     this.filename = filename;
//     this.name = name;
//     this.ext = ext;
//     this.isFile = isFile;
//     this.size = size;
//     this.ctime = ctime;
//     this.utime = utime;
//   }
//   async getContent(isBuffer = false) {
//     if(this.isFile){
//       if(isBuffer){
//         return await fs.promises.readFile(this.filename);
//       }else{
//         return await fs.promises.readFile(this.filename, "utf-8");
//       }
//     }else{
//       return null;
//     }
//   }
//   async getChildren(){
//     if(this.isFile){
//       return [];
//     }else{
//       let children = await fs.promises.readdir(this.filename);
//       children = children.map(name => {
//         const result = path.resolve(this.filename, name);
//         return File.getFile(result);
//       })

//       return Promise.all(children);
//     }
//   }
//   static async getFile(filename) {
//     const stat = await fs.promises.stat(filename);
//     const name = path.basename(filename);
//     const ext = path.extname(filename);
//     const isFile = stat.isFile();
//     const size = stat.size;
//     const ctime = new Date(stat.birthtime);
//     const utime = new Date(stat.mtime);
//     return new File(filename, name, ext, isFile, size, ctime, utime)
//   }
// }
// async function main() {
//   const filename = path.resolve(__dirname, "./myfiles");
//   const file = await File.getFile(filename);
//   console.log(await file.getChildren());
// }
// main();

// const {Readable, Writable} = require("stream");

// stream
// const filename = path.resolve(__dirname, "./myFiles/index.copy.html");
// const rs =  fs.createReadStream(filename, {
//   encoding: 'utf-8',
//   // start: 1,
//   // end: 15
//   highWaterMark: 1,
//   autoClose: true, // 读完自动关闭
// })
// rs.on("open", (data) => {
//   console.log('文件被打开', data)
// })
// rs.on("error", (data) => {
//   console.log('文件出错', data)
// })
// rs.on("close", (data) => {
//   console.log('文件关闭', data)
// })
// rs.on("end", (data) => {
//   console.log('读取完毕', data)
// })
// rs.on("data", (chunk) => {
//   console.log('正在读取 ', chunk)
//   rs.pause();
//   setTimeout(() => {
//     rs.resume();
//   }, 500)
// })
// rs.on("pause", (data) => {
//   console.log('暂停读取 ', data)
// })
// rs.on("resume", (data) => {
//   console.log('恢复读取 ', data)
// })

// console.log(rs.read(1))
// rs.pause(); //暂停读取 触发pause事件
// rs.resume() // 恢复读取 触发resume事件

// const filename = path.resolve(__dirname, "./myFiles/a.txt");
// const ws = fs.createWriteStream(filename, {
// encoding: 'utf-8',
// start:1, // 从第几个字节开始写入
// highWaterMark: 2, // 一次能写入的字节数 默认16Kb
// autoClose: true,
// })
// ws.on("close", () => {
//   console.log("写入流关闭")
// });
// ws.on("open", () => {
//   console.log("写入流开启")
// });
// ws.on("drain", () => {
//   console.log("队列清空")
// });

// const flag = ws.write('A啊啊');
// console.log(flag);

// fs.readFile(filename, (err, data) => {
//   console.log(err, data);
// })

// for(var i=0; i < 1024*1024*10; i++){
//   ws.write("a");
// }
// console.log("写完了");

// 复制文件比较
// const fs = require("fs");
// const path = require("path");
// async function copy1() {
//   const from = path.resolve(__dirname, "./myFiles/a.txt");
//   const to = path.resolve(__dirname, "./myFiles/a.copy1.txt");
//   console.time("copy 1");
//   const content = await fs.promises.readFile(from);
//   await fs.promises.writeFile(to, content);
//   console.timeEnd("copy 1");
//   console.log("copy 1 done");
// }

// async function copy2() {
//   const from = path.resolve(__dirname, "./myFiles/a.txt");
//   const to = path.resolve(__dirname, "./myFiles/a.copy2.txt");
//   console.time("copy 2");
//   const rs = fs.createReadStream(from);
//   const ws = fs.createWriteStream(to);
//   rs.on("data", (chunk) => {
//     const flag = ws.write(chunk);
//     if (flag) {
//       rs.pause();
//     }
//   });
//   rs.on("drain", () => {
//     rs.read();
//   });
//   rs.on("close", () => {
//     console.timeEnd("copy 2");
//     console.log("copy 2 done");
//   });
// }

// async function copy3() {
//   const from = path.resolve(__dirname, "./myFiles/a.txt");
//   const to = path.resolve(__dirname, "./myFiles/a.copy3.txt");
//   console.time("copy 3");
//   const rs = fs.createReadStream(from);
//   const ws = fs.createWriteStream(to);
//   // rs.on("data", chunk => {
//   //   const flag = ws.write(chunk);
//   //   if(flag){
//   //     rs.pause();
//   //   }
//   // })
//   // rs.on("drain", () => {
//   //   rs.read();
//   // });
//   rs.on("close", () => {
//     console.timeEnd("copy 3");
//     console.log("copy 3 done");
//   });
//   rs.pipe(ws);
// }

// async function main() {
//   await copy1();
//   //116.798ms

//   await copy2();
//   // 34.863ms

//   await copy3();
//   // 44.695ms
// }

// main();

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


