$(document).ready(function(){
	//console.log('Jquery added');
	var socket = io.connect();
	var $messageForm = $('#messageForm');
	var $message = $('#message');
	var $chat = $('#chatWindow');
	var $UsernameForm = $('#UsernameForm');
	var $username = $('#username');
	


	//Jquery 4 chat app

	//it sends data from textarea 
	$messageForm.submit(function(e){
	e.preventDefault();
	//console.log($message.val());
	socket.emit('send message', $message.val());
		$message.val("");
	});

	//it adds message
	socket.on('new message', function(data){
		$('#messages').append('<br/><li><input type="submit" value="Add" class="button"><span class="well"><strong>'+data.user+'</strong>:<p class="dataMSG">'+data.msg+'</p></span></li>');
	});







	$(document).on('click','input[value=Add]', function(e){
		var $li = $($(this).parent());
		var $p = $($li.find('p'));
		var $form= $($li.find('form'));
		console.log($p.text());
		

		socket.emit('send task', $p.text());

     });










	$UsernameForm.submit(function(e){
		e.preventDefault();
		//console.log($username.val());
		socket.emit('new username', $username.val(), function(data){
			if(data){
					$('#loginContainer').hide();
					$('#mainChatWrapper').show();
					$('#mainChatWrapper').css("display" , "inline")
					}
				});
			$username.val("");
		});

		socket.on('update users', function(data){
			var userList = '';
			for( i = 0 ; i < data.length; i++){
				userList += '<li>'+data[i]+'</li>';
				console.log(data[i]);
				} 
				$('#userList').html(userList);
		});


				
		





		$('#loginContainer' ).hover(function(){
    				
    		$(this).css('opacity','0.9');
    		},function(){
        		
        	$(this).css('opacity', '0.6');
    	});


		//Jquery 4 chat app ends

		$('#inToDo').click(function(){

				$("#toDoContainer").show();
				$(this).parent().hide();

		});

		$('#inChat').click(function(){

			$("#container").show();
			$("#loginContainer").show();
			$(this).parent().hide();

		});

		$('#openToDoLabel').click(function(){
			$("#toDoContainer").show();
			$('#mainChatWrapper').hide();

			var taskList = [];
			socket.emit('get tasks', function(data){
					console.log(data);
					for( i = 0 ; i < data.length ; i++){

						$('#tasksUL').append('<li><input type="checkbox"/><span>' + data[i] +'</span></li>');
		
			
					}

			});
		});

		
		



});
