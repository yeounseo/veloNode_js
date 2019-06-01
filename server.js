// var http = require('http');
// var fs = require('fs');
// var url = require('url');

// // 서버 생성
// http.createServer(function (request, response) {
//     // URL 뒤에 있는 디렉토리 / 파일이름 파싱
//     var pathname = url.parse(request.url).pathname;

//     console.log("Request for " + pathname + " received");

//     // 파일 이름이 비어 있다면 index.html로 설정
//     if (pathname == "/") {
//         pathname = "index.html";
//     }

//     // 파일 읽기
//     fs.readFile(pathname.substr(1), function (err, data) {
//         if (err) {
//             console.log(err);
//             // 페이지 찾을 수 없음
//             // HTTP Status : 404 : NOT FOUND
//             // Content Type: text/plain
//             response.writeHead(404, { 'Content-Type': 'text/html' });
//         } else {
//             //  페이지 찾음
//             //  HTTP Status : 200 : OK
//             //  Content Type : text/plain
//             response.writeHead(200, { 'Content-Type': 'text/html' });

//             // 파일을 읽어와서 responseBody에 작성 
//             response.write(data.toString());
//         }
//         //  responseBody 전송
//         response.end();
//     });
// }).listen(8081);


// console.log('Server running at http://127.0.0.1:8081/');


// Router 를 아직 정의하지 않아, Cannot GET/ 이라는 텍스트가 나타난다.

//  라우터 코드와 서버코드는 다른 파일에 작성하는 것이 좋은 코딩 습관!
// router 라는 폴더를 만들고 그 안에 main.js 를 생성해주자.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
// 라울터 모듈인 main.js 를 불러와서 app에 전달해준다.
// var router = require('./router/main')(app);

// 서버가 읽을 수 있도록 HTML 의 위치를 정의해줍니다.
app.set('views', __dirname + '/views');
// 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하돌고 설정합니다.
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function () {
    console.log("Express server has started on port");
});

// 정적 파일이란 ? HTML 에서 사용되는 .js 파일 , css 파일 , image 파일 등을 가르킵니다.
// 서버에서 정적파일을 다루기 위해선, express.static() 메소드를 사용하면 된다.
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

var router = require('./router/main')(app, fs);

// Express 이전 버전에서는 cookie-parser 모듈도 불러와야했지만 , 이젠 express-session 모듈이 직접 쿠키에 접근하므로 cookie-parser를 더이상 사용 할 필요가 없다.

// 추가적으로 , Node.js 에 내장되어있는 js 모듈도 불러왔는데, 이는 나중에 파일을 열기 위함이다. 

