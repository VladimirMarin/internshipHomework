//var http = require('http');
var express = require('express');
var app  = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server); 
users=[];
connections=[];

//Donnie Darko reference https://www.youtube.com/watch?v=rPeGaos7DB4
server.listen(28642);
console.log('server running.');

//link my files
app.use(express.static(__dirname ));

//create route
app.get('/', (req, res)=>{
	res.sendFile(__dirname+'/index.html');

});


io.sockets.on('connection', (socket)=>{

	//I'm adding my user to the connection array
	connections.push(socket);
	console.log(`Connected: ${connections.length} users.`);

	//I'm removing the user from the array when he's disconnected
	socket.on('disconnect' , (data)=>{

		users.splice(users.indexOf(socket.username), 1);
		updateUsers();

		connections.splice(connections.indexOf(socket), 1);
		console.log(`One user disconnected. Connected: ${connections.length} users.`);
	});


	socket.on('send task', function(data){
		//console.log(data);
		//console.log(socket.username);
		socket.tasks.push(data);
		//console.log(socket.tasks.indexOf(data));


	});

	socket.on( 'get tasks', function(callback){
		//console.log("!!!!");
		callback(socket.tasks);
		
	});
	

	
	//I'm adding the new message recived from my socket 
	socket.on('send message', function(data){
		//console.log(data);
		io.sockets.emit('new message', {msg: data, user: socket.username});
	});
	
	//new user
	socket.on('new username', function(data, callback){
		//console.log(data);
		callback(true);
		socket.username  = data;
		socket.tasks = [];
		users.push(socket.username);
		updateUsers();
	});

	function updateUsers(){
		io.sockets.emit('update users', users);
	}
});
