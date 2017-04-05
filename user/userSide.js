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
		$chat.append('<br/><div class="well"><strong>'+data.user+'</strong>:<br/>'+data.msg+'</div>');
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




});
