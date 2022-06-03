package group.sgbd_java_apis;

import classes.Database;
import org.springframework.web.bind.annotation.*;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

@RestController
@RequestMapping("/api")
public class NewAutographController {

    @PostMapping("/new/{id_user}/{id_autograph}/{id_author}/{id_item}/{moment}/{mentions}")
    public String login(@PathVariable Integer id_user,
                        @PathVariable Integer id_autograph,
                        @PathVariable Integer id_author,
                        @PathVariable Integer id_item,
                        @PathVariable String moment,
                        @PathVariable String mentions){

        try{
            Connection connection = Database.getConnection();
            System.out.println("Let's add your autograph!");


            CallableStatement stmt = connection.prepareCall(
                    "{call autograph_methods.new_autograph_dynamic(?,?,?,?,?,?)}");
            stmt.setInt(1, id_user);
            stmt.setInt(2, id_autograph);
            stmt.setInt(3, id_author);
            stmt.setInt(4, id_item);
            stmt.setString(5, moment);
            stmt.setString(6, mentions);

            stmt.execute();

            System.out.println("Success! Check your new autograph collection!");

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