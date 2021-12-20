const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution1:Sending data normally
  //   fs.readFile("test_file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  // Solution2:Sending data using streams
  //   const readable = fs.createReadStream("test_file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not Found");
  //   });
  // Solution3:Sending data using streams and pipe operators to fix backpressure issue
  const readable = fs.createReadStream("test_file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to 8000......");
});
