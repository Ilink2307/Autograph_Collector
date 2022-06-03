package classes;

import java.sql.SQLException;
import java.sql.Connection;
import java.sql.*;

public class Database {
    private static final String URL = "jdbc:oracle:thin:@localhost:1521:XE";
    private static final String user = "project";
    private static final String password = "PROJECT";
    private static Connection connection = null;

    private Database() {
        createConnection();
    }

    public static Connection getConnection() {
        if(connection==null){
            createConnection();
        }
        return connection;
    }

    private static void createConnection() {
        try {
            connection = DriverManager.getConnection(URL, user, password);
            connection.setAutoCommit(false);
        } catch (SQLException exception) {
            System.err.println(exception);
            exception.printStackTrace();
        }
    }

    public static void closeConnection() {

    }

    public static void printTable(String tableName) throws SQLException {
        String data = getTableData(tableName);
        System.out.println(data);
    }

    private static String getTableData(String tableName) throws SQLException {
        Connection connection = Database.getConnection();

        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("select * from " + tableName)) {
            return resultSet.next() ? resultSet.toString() : null;
        }
    }
}