package group.sgbd_java_apis;

import classes.Database;
import org.springframework.web.bind.annotation.*;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

@RestController
@RequestMapping("/api")
public class RegisterController {

    @PostMapping("/register/{email}/{username}/{password}")
    public String register(@PathVariable String email,
                            @PathVariable String username,
                            @PathVariable String password) {

        try{
            Connection connection = Database.getConnection();
            System.out.println("email: " + email + ", username: " + username + ", password: " + password);

            int return_code = -1;
            CallableStatement stmt = connection.prepareCall("{call user_package.register_user(?,?,?,?)}");
            stmt.setString(1, email);
            stmt.setString(2, username);
            stmt.setString(3, password);
            stmt.registerOutParameter(4, Types.INTEGER);

            stmt.execute();

            return_code = stmt.getInt(4);

            String message = "";

            if(return_code == 0) {
                message = "Registered with success!";
            }
            else if(return_code == 8){
                message = "Already registered!";
            }
            else {
                message = "Unexpected problem during register process!";
            }
            System.out.println(message);

            connection.commit();
            stmt.close();
            //connection.close();
        }
        catch (SQLException e) {
            e.printStackTrace();
            return "failed2";
        }
        return "success";
    }
}