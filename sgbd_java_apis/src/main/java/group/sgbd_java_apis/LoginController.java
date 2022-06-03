package group.sgbd_java_apis;

import classes.Database;
import org.springframework.web.bind.annotation.*;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

@RestController
@RequestMapping("/api")
public class LoginController {

    @PostMapping("/login/{email}/{password}")
    public String login(@PathVariable String email,
                            @PathVariable String password) {

        try{
            Connection connection = Database.getConnection();
            System.out.println("email: " + email + ", password: " + password);

            int return_code = -1;
            CallableStatement stmt = connection.prepareCall("{call user_package.login(?,?,?,?)}");
            stmt.setString(1, email);
            stmt.setString(2, password);
            stmt.registerOutParameter(3, Types.INTEGER);
            stmt.registerOutParameter(4, Types.INTEGER);

            stmt.execute();

            return_code = stmt.getInt(3);
            Integer user_id = stmt.getInt(4);

            String message = "";

            if(return_code == 0) {
                message = "Logged in with success! Your id is: " + user_id;
            }
            else {
                message = "There was a problem logging in!";
            }
            System.out.println(message);

            connection.commit();
            stmt.close();
            //connection.close();
        }
        catch (SQLException e) {
            e.printStackTrace();
            return "failed";
        }
        return "success";
    }
}