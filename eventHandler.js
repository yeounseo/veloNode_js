// events 모듈 사용 
var events = require('events');

// EventEmitter 객체 생성
var eventEmitter = new events.EventEmitter();

// Event Handler 함수 생성 
var connectHandler = function connected() {
    console.log("Connection Successful");

    //data_recevied 이벤트를 발생
    eventEmitter.emit("data_received");
}
// event 와 EventHandler 를 연동(bind)
// eventName 은 임의로 설정 가능하다.
// eventEmitter.on('eventName', eventHandler);
eventEmitter.on('connection', connectHandler);

//data_received 이벤트와 익명 함수와 연동
// 함수를 변수안에 담는 대신에 , .on() 메소드의 인자로 직접 함수를 전달
eventEmitter.on('data_received', function () {
    console.log("Data Received");
});

//프로그램 안에서 이벤트를 발생시킬땐 다음 코드를 사용
// eventEmitter.emit('eventName');
// eventEmitter 의 상세내용 https://nodejs.org/api/events.html#events_class_eventemitter 를 참조

// connection 이벤트 발생 시키기
eventEmitter.emit('connection');

console.log("Program has ended");


