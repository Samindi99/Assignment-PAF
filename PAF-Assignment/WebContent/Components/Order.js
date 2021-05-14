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
