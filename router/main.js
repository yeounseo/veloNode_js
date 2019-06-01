module.exports = function (app, fs) {
	app.get('/', function (req, res) {
		var sess = req.session;


		res.render('index', {
			title: "MY HOMEPAGE",
			length: 5,
			name: sess.name,
			username: sess.username
		})
		// 세션 변수를 EJS 템플릿 엔진에 전달하게 했다.
		// EJS 파일을 수정해야한다.
	});

	app.get('/list', function (req, res) {
		fs.readFile(__dirname + "/../data" + "user.json", 'utf8', function (err, data) {
			console.log(data);
			res.end(data);
		});
	})

	// 특정 유저 username의 디테일한 정보를 가져오는 GET API를 작성 , 파일을 읽은후 , 유저 아이디를 찾아서 출력해준다. 유저를 찾으면 유저 데이터를 출력하고 유저가 없으면 {} 을 출력하게 된다.
	// fs.readFile() 로 파일을 읽었을 시엔 텍스트 형태로 읽어지기 때문에, JSON.parse() 를 해야 한다.
	app.get('/getUser/:username', function (req, res) {
		fs.readFile(__dirname + "/../data/user.json", 'utf-8', function (err, data) {
			var users = JSON.parse(data);
			res.json(users[req.params.username]);
		});
	});

	app.post('/addUser/:username', function (req, res) {

		var result = {};
		var username = req.params.username;

		// CHECK REQ VALIDITY
		if (!req.body["password"] || !req.body["name"]) {
			result["success"] = 0;
			result["error"] = "invalid request";
			res.json(result);
			return;
		}

		// LOAD DATA & CHECK DUPLICATION
		fs.readFile(__dirname + "/../data/user.json", 'utf-8', function (err, data) {
			var users = JSON.parse(data);
			if (users[username]) {
				// DUPLICATION FOUND
				result["success"] = 0;
				result["error"] = "duplicate";
				res.json(result);
				return;
			}

			// ADD TO DATA
			users[username] = req.body;

			// SAVE DATA
			fs.writeFile(__dirname + "/../data/user.json", 'utf-8', function (err, data) {
				result = { "success": 1 };
				res.json(result);
			})
		})
	});

	app.delete('/deleteUser/:username', function (req, res) {
		var result = {};
		// LOAD DATA
		fs.readFile(__dirname + "/../data/user.json", 'utf8', function (err, data) {
			var users = JSON.parse(data);

			// IF NOT FOUND
			if (!users[req.params.username]) {
				result["success"] = 0;
				result["error"] = "not found";
				res.json(result);
				return;
			}

			delete users[req.params.username];
			fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), 'utf8', function (err, data) {
				result["success"] = 1;
				res.json(result);
				return;
			})
		})
	})

	app.get('/login/:username/:password', function (req, res) {
		var sess;
		sess = req.session;

		fs.readFile(__dirname + "/../data/user.json", "utf8", function (err, data) {
			var users = JSON.parse(data);
			var username = req.params.username;
			var password = req.params.password;
			var result = {};
			if (!users[username]) {
				// USERNAME NOT FOUND
				result["success"] = 0;
				result["error"] = "not found";
				res.json(result);
				return;
			}

			if (users[username]["password"] == password) {
				result["success"] = 1;
				sess.username = username;
				sess.name = users[username]["name"];
				res.json(result);
			} else {
				result["success"] = 0;
				result["error"] = "incorrect";
				res.json(result);
			}
		})
	});
	// 로그인에 성공햇다면 세션에 username과 name을 저장하도록 했다.
	app.get('/logout', function (req, res) {
		sess = req.session;
		if (sess.username) {
			req.session.destroy(function (err) {
				if (err) {
					console.log(err);

				} else {
					res.redirect('/');
				}
			})
		} else {
			res.redirect('/');
		}
	})
	// 로그아웃을 하고 메인페이지로 redirect 된다.

}
// __dirname 은 현재 모듈의 위치를 나타낸다.
// router 모듈은 router 폴더에 들어있으니, data 폴더에 접근하려면 /../ 를 앞부분에 붙여서ç 먼저 상위폴더로 접근해야한다.

// JSON 데이터를 render 메소드의 두번째 인자로 전달함으로서 페이지에서 데이터를 사용가능하게 된다.