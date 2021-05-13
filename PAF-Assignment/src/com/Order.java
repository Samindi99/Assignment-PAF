package com;
import java.sql.*;
public class Order
{ 
	private Connection connect() 
	{ 
		Connection con = null; 
		
		try
		{ 
			Class.forName("com.mysql.jdbc.Driver"); 
			con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3307/paf_assignment", "root", "");
		} 
		catch (Exception e) 
		{ 
			e.printStackTrace(); 
		}
		return con; 
	} 
	
	public String readOrder() 
	{ 
		String output = ""; 
		
		try
		{ 
			Connection con = connect(); 
 
			if (con == null) 
			{ 
				return "Error while connecting to the database for reading."; 
			} 
 
			// Prepare the html table to be displayed
			output = "<table border='1'><tr><th>Order Description</th> <th>Order Value</th><th>Order Quantity</th> <th>Update</th><th>Remove</th></tr>"; 
 
			String query = "select * from paf_assignment.assignment_order"; 
			Statement stmt = con.createStatement(); 
			ResultSet rs = stmt.executeQuery(query); 
 
			// iterate through the rows in the result set
			while (rs.next()) 
			{ 
				String orderID = Integer.toString(rs.getInt("orderID")); 
				String orderDescription = rs.getString("orderDescription");
				String orderValue = Double.toString(rs.getDouble("orderValue"));
				String orderQuantity = rs.getString("orderQuantity");
				 
				// Add into the html table
				output += "<tr><td><input id='hidOrderIDUpdate' name='hidOrderIDUpdate' type='hidden' value='" + orderID
				 + "'>" + orderDescription + "</td>"; 
				 output += "<td>" + orderValue + "</td>"; 
				 output += "<td>" + orderQuantity + "</td>"; 
				 
				 // buttons
				 output += "<td><input name='btnUpdate' type='button' value='Update' class='btnUpdate btn btn-secondary' data-orderid='" + orderID +"'></td> "
				 		+ "<td><input name='btnRemove' type='button' value='Remove' class='btnRemove btn btn-danger' data-orderid='" + orderID + "'></td></tr>";
			} 
			
			con.close(); 
				 
			// Complete the html table
			output += "</table>"; 
				 
		} 
		catch (Exception e) 
		{ 
			output = "Error while reading the orders."; 
			System.err.println(e.getMessage()); 
		} 
		return output; 
	}
}				 
