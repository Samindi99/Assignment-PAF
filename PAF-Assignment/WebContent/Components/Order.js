$(document).ready(function()
{ 
if ($("#alertSuccess").text().trim() == "")
	{
	 	$("#alertSuccess").hide(); 
	}
 	$("#alertError").hide(); 
}); 

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) 
{ 
	// Clear alerts---------------------
	 $("#alertSuccess").text(""); 
	 $("#alertSuccess").hide(); 
	 $("#alertError").text(""); 
	 $("#alertError").hide(); 

	// Form validation-------------------
	var status = validateOrderForm(); 
	if (status != true) 
 	{ 
 		$("#alertError").text(status); 
 		$("#alertError").show(); 
 		return; 
 	} 

	// If valid------------------------
 	var type = ($("#hidOrderIDSave").val() == "") ? "POST" : "PUT"; 
 	
	$.ajax( 
 	{ 
 		url : "OrderAPI", 
 		type : type, 
 		data : $("#formOrder").serialize(), 
 		dataType : "text", 
 		complete : function(response, status) 
 		{ 
 			onOrderSaveComplete(response.responseText, status); 
 		} 
 	}); 
}); 

function onOrderSaveComplete(response, status)
{ 
	if (status == "success") 
 	{ 
 		var resultSet = JSON.parse(response); 
 
		if (resultSet.status.trim() == "success") 
 		{ 
			 $("#alertSuccess").text("Successfully saved."); 
			 $("#alertSuccess").show(); 
			 $("#divOrdersGrid").html(resultSet.data); 
 		} else if (resultSet.status.trim() == "error") 
 		{ 
 			$("#alertError").text(resultSet.data); 
 			$("#alertError").show(); 
 		} 
 	} else if (status == "error") 
	{ 
 		$("#alertError").text("Error while saving."); 
 		$("#alertError").show(); 
 	} else
 	{ 
 		$("#alertError").text("Unknown error while saving.."); 
		$("#alertError").show(); 
 	} 
	$("#hidOrderIDSave").val(""); 
 	$("#formOrder")[0].reset(); 
}
