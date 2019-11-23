package 도서대출프로그램;
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
		//	System.out.println("송공");
		//}
		
		
		// 저장 테스트
		String idtest = "idtest1";
		//createCustomersBookTable(idtest);
		
		// 불러오기 테스트
		//getCustomersBookBorrowList(idtest);
	}
	/*
	public static boolean CheckId() { // ID  유효성 검사 메서드
		try {
			Connection con = getConnection();
			PreparedStatement st = con.prepareStatement("select * from studentinfo where stdid = '"+ id +"' and stdpw ='"+ pw +"'");
			ResultSet rs = st.executeQuery();

			if(rs.next()) {
				return true;
			}
			
		}
		catch (Exception e) {
			System.out.println("검색오류"+e.getMessage());
		}
		return false;	
	}
	public static char[] CheckPw() {  // Password 유효성 검사 메서드
		try {
			Connection con = getConnection();
			PreparedStatement st = con.prepareStatement("select * from studentinfo where stdpw = '"+ Pw +"'");
			ResultSet rs = st.executeQuery();

			if(rs.next()) {
				return Pw;
			}
			
		}
		catch (Exception e) {
			System.out.println("검색오류"+e.getMessage());
		}
		return Pw;	
	}*/
	
	
	
	
	public static String[][] getCustomersBookBorrowList(String id){// 불러오기
		try {
			Connection con = getConnection();
			PreparedStatement statement = con.prepareStatement("select isbn, bookname, author, publisher, deadline from "+id+"_bookinformation");
			ResultSet result = statement.executeQuery(); // st의 명령어의 결과 값을 result에 저장
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
	public static String[][] nullBookBorrowList(){// 불러오기
		try {
			Connection con = getConnection();
			PreparedStatement statement = con.prepareStatement("select isbn, bookname, author, publisher, bookAvailible from userName1684031");
			ResultSet result = statement.executeQuery(); // st의 명령어의 결과 값을 result에 저장
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

	
	public static String[][] getCustomer(){// 불러오기
		try {
			Connection con = getConnection();
			PreparedStatement statement = con.prepareStatement("select isbn, bookname, author, publisher, bookavailible from bookinformation");
			ResultSet result = statement.executeQuery(); // st의 명령어의 결과 값을 result에 저장
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
	
	// someone's bookTable generator 로그인 시에 테이블로 연결시켜줌
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
	
	public static void BorrowedUpdate(String isbn, String loginedId, String BookName) { // 대출 버튼을 누를 시에 액션
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
	
	public static void returnedUpdate(String isbn, String loginedId, String BookName) { // 대출 버튼을 누를 시에 액션
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
			
			// ('studentId','name','gender','borrowState') 쿼리문 
			
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
			PreparedStatement createSomeOnesTable = con.prepareStatement( //필요 없을듯 어차피 개인 정보는 studentinfo에서 대규모로 저장하면됨
					"CREATE TABLE IF NOT EXISTS "
					+ "userName1684031(serialNumber int not null auto_increment,"
					+ "stdId varChar(9),"
					+ "name varChar(50),"
					+ "gender varChar(20),"
					+ "stdPw varChar(50),"
					+ "restDate varChar(10),"
					+ "primary key(serialNumber))");  // 회원 정보를 저장하는 쿼리문 
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
	
	public static Connection getConnection() {// 연결 메서드
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
