$(document).ready(function(){
	
	$('#button').click(function(){
		var toAdd = $("input[name=ListItem]").val();
		$('#tasksUL').append('<li><input type="checkbox"/><span>' + toAdd +'</span></li>');
		$("input[name=ListItem]").val("");	
	});

	$('#clearButton').click(function(){
		$('li').toggleClass('strike').fadeOut(630);
		
		var y = new Date();
		while(y.getMilliseconds()<631){
			y = new Date();
			//console.log(y.getMilliseconds());
		}

		if(y.getMilliseconds == 630){
			$('#tasksUL').html("");
		}
		
	});

	$(document).on('click','input[type=checkbox]', function(){
    	$(this).parent().toggleClass('strike').fadeOut('slow'); 
     });

     $('input[name=ListItem]').focus(function(){
    	$(this).val('');
    });
    
    $('#tasksUL').sortable();  
      
	
	$("input[name=ListItem]").keyup(function(e){
		e.preventDefault();
		if(e.keyCode == 13){
			var toAdd = $("input[name=ListItem]").val();
			$('#tasksUL').append('<li><input type="checkbox"/><span>' + toAdd +'</span></li>');
			$("input[name=ListItem]").val("");	
		}
	});
	
	$('#changeLogIn').click(function(){
		$('#toDoContainer').hide();
		$("#container").show();
		$("#loginContainer").show();
	});
	$('#changeChat').click(function(){
		$('#toDoContainer').hide();
		$("#container").show();
		$("#chatWindow").show();
	});
});
