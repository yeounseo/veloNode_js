// var http = require("http");

// http.createServer(function (request, response) {
//     /*
//         HTTP 헤더 전송
//         HTTP Status: 200 : OK
//         Content Type : text/plain
//     */
//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     /*
//         Response Body를 "Hello World!" 로 설정
//     */
//     response.end("Hello World!\n");

// }).listen(8081);

// console.log("Server running at http://127.0.0.1:8081");

// 아래 코드는 Callback 함수가 사용되지 않는, Blocking Code 예제이다. 말 그대로 어떤 작업을 실행하고 기다리면서 코드가 "막히게" 된다.

// var fs = require("fs");

// var data = fs.readFileSync('npm.txt');

// console.log(data.toString());
// console.log("Program had ended");


// Non-Blocking Code 
// Callback 함수가 사용된 예제 위의 예제와는 다르게 함수가 끝날떄 까지 기다리지 않고 바로 그 아래에 있는 코드들을 실행하게 된다. 그 다음에 함수에 있던 작업이 다 끝나면 콜백함수를 호출한다.
// 하단에 추가한 console.log()내용이 먼저 출력되고 , 작업이 끝난 함수를 호출하는걸 볼 수 있다.

var fs = require("fs");

fs.readFile('npm.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log(data.toString());
});

console.log("Program has ended");
