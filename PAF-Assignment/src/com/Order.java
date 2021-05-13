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
	
}				 
