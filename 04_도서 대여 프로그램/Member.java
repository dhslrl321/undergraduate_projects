package �����������α׷�;
import java.awt.image.DataBufferUShort;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;

import javax.swing.JPasswordField;
import javax.swing.JTextField;
public class Member {
	public static void main(String[] args) {


		String a ="123";
		char[] c = "123".toCharArray();
		char[] d = {'1','2','3'};
		//createTable();
		
		//if(CheckId(a, c)) {
		//	System.out.println("�۰�");
		//}
		
		
		// ���� �׽�Ʈ
		String idtest = "idtest1";
		//createCustomersBookTable(idtest);
		
		// �ҷ����� �׽�Ʈ
		//getCustomersBookBorrowList(idtest);
	}
	/*
	public static boolean CheckId() { // ID  ��ȿ�� �˻� �޼���
		try {
			Connection con = getConnection();
			PreparedStatement st = con.prepareStatement("select * from studentinfo where stdid = '"+ id +"' and stdpw ='"+ pw +"'");
			ResultSet rs = st.executeQuery();

			if(rs.next()) {
				return true;
			}
			
		}
		catch (Exception e) {
			System.out.println("�˻�����"+e.getMessage());
		}
		return false;	
	}
	public static char[] CheckPw() {  // Password ��ȿ�� �˻� �޼���
		try {
			Connection con = getConnection();
			PreparedStatement st = con.prepareStatement("select * from studentinfo where stdpw = '"+ Pw +"'");
			ResultSet rs = st.executeQuery();

			if(rs.next()) {
				return Pw;
			}
			
		}
		catch (Exception e) {
			System.out.println("�˻�����"+e.getMessage());
		}
		return Pw;	
	}*/
	
	
	
	
	public static String[][] getCustomersBookBorrowList(String id){// �ҷ�����
		try {
			Connection con = getConnection();
			PreparedStatement statement = con.prepareStatement("select isbn, bookname, author, publisher, deadline from "+id+"_bookinformation");
			ResultSet result = statement.executeQuery(); // st�� ��ɾ��� ��� ���� result�� ����
			ArrayList<String[]> list = new ArrayList<String[]>();
			
			while(result.next()) {
				list.add(new String[] {
						result.getString("isbn"),
						result.getString("bookname"),
						result.getString("author"),
						result.getString("publisher"),
						result.getString("deadline")
				});
			}
			System.out.println("data has been fetched");
			String[][] arr = new String[list.size()][5];
			return list.toArray(arr);
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
			
		}
	public static String[][] nullBookBorrowList(){// �ҷ�����
		try {
			Connection con = getConnection();
			PreparedStatement statement = con.prepareStatement("select isbn, bookname, author, publisher, bookAvailible from userName1684031");
			ResultSet result = statement.executeQuery(); // st�� ��ɾ��� ��� ���� result�� ����
			ArrayList<String[]> list = new ArrayList<String[]>();
			
			while(result.next()) {
				list.add(new String[] {
						result.getString("isbn"),
						result.getString("bookname"),
						result.getString("author"),
						result.getString("publisher"),
						result.getString("bookAvailible")
				});
			}
			System.out.println("data has been fetched");
			String[][] arr = new String[list.size()][5];
			return list.toArray(arr);
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
			
		}

	
	public static String[][] getCustomer(){// �ҷ�����
		try {
			Connection con = getConnection();
			PreparedStatement statement = con.prepareStatement("select isbn, bookname, author, publisher, bookavailible from bookinformation");
			ResultSet result = statement.executeQuery(); // st�� ��ɾ��� ��� ���� result�� ����
			ArrayList<String[]> list = new ArrayList<String[]>();
			
			while(result.next()) {
				list.add(new String[] {
						result.getString("isbn"),
						result.getString("bookname"),
						result.getString("author"),
						result.getString("publisher"),
						result.getString("bookavailible")
				});
				
				/*list.add("stdId: "+ result.getString("stdId")
						+"name: "+ result.getString("name")
						+"gender: "+result.getString("gender")
						+"stdPw: "+result.getString("stdPw")
						+"restDate: "+result.getString("restDate"));*/
			}
			System.out.println("data has been fetched");
			String[][] arr = new String[list.size()][5];
			return list.toArray(arr);
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
			
		}
	
	// someone's bookTable generator �α��� �ÿ� ���̺�� ���������
	public static void createCustomersBookTable(String id) {
		try {
			Connection con = getConnection();		
			PreparedStatement createCustomersBookTable = con.prepareStatement(
					"create table if not exists "
					+ id
					+ "_Book_Storage"
					+ "(ISBN int not null auto_increment,"
					+ "bookname varchar(20),"
					+ "author varchar(20),"
					+ "publisher varchar(20),"
					+ "deaeline datetime,"
					+ "primary key(ISBN))");
					
			
			createCustomersBookTable.execute();
			
			
		}catch (Exception e) {
			System.out.println(e.getMessage());
		}finally {
			System.out.println("created successfully");
		}
	}
	
	public static void BorrowedUpdate(String isbn, String loginedId, String BookName) { // ���� ��ư�� ���� �ÿ� �׼�
		try {
			Connection con = getConnection();
			PreparedStatement insert = con.prepareStatement(""
					+"insert into userName1684031"
					+"(ISBN,bookName)"
					+"values"
					+"('"+isbn+"','"+BookName+"')");
			
			
			insert.executeUpdate();
			
			System.out.println("data saved");
			
		}catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
	public static void returnedUpdate(String isbn, String loginedId, String BookName) { // ���� ��ư�� ���� �ÿ� �׼�
		try {
			Connection con = getConnection();
			
			PreparedStatement insert = con.prepareStatement(""
					+"delete from userName1684031 where ? "
					+"(ISBN,bookName)"
					//+"values"
					+"('"+isbn+"','"+BookName+"')");
			
			
			insert.executeUpdate();
			
			System.out.println("data saved");
			
		}catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
	public static void createCustomer(String stdId, String name, String gender, String stdPw) {
		try {
			Connection con = getConnection();
			PreparedStatement insert = con.prepareStatement(""
					+"insert into StudentInfo"
					+"(stdId,name,gender,stdPw)"
					+"values"
					+"('"+stdId+"','"+name+"','"+gender+"','"+stdPw+"')");
			
			// ('studentId','name','gender','borrowState') ������ 
			
			insert.executeUpdate();
			System.out.println("data saved");
			
		}catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	public static void createTable() {
		try {
			Connection con = getConnection();
			/*
			PreparedStatement createSomeOnesTable = con.prepareStatement( //�ʿ� ������ ������ ���� ������ studentinfo���� ��Ը�� �����ϸ��
					"CREATE TABLE IF NOT EXISTS "
					+ "userName1684031(serialNumber int not null auto_increment,"
					+ "stdId varChar(9),"
					+ "name varChar(50),"
					+ "gender varChar(20),"
					+ "stdPw varChar(50),"
					+ "restDate varChar(10),"
					+ "primary key(serialNumber))");  // ȸ�� ������ �����ϴ� ������ 
			*/
			PreparedStatement createBookTable = con.prepareStatement(
					"create table if not exists "
					+ "userName1684031(ISBN int not null auto_increment,"
					+ "bookname varchar(20),"
					+ "author varchar(20),"
					+ "publisher varchar(20),"
					+ "bookavailible boolean,"
					+ "primary key(ISBN))");
					
//			createSomeOnesTable.execute();
			createBookTable.execute();
			
			
		}catch (Exception e) {
			System.out.println(e.getMessage());
		}finally {
			System.out.println("created successfully");
		}
	}
	
	public static Connection getConnection() {// ���� �޼���
		try {
			String driver = "com.mysql.jdbc.Driver";
			String DBurl = "jdbc:mysql://localhost:3307/studentmember";
			String DBid = "root";
			String DBpw = "akdldptmzbdpf123!@#";
			Class.forName(driver);
			
			Connection con = DriverManager.getConnection(DBurl,DBid,DBpw);
			
			System.out.println("good");
			return con;
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
}
