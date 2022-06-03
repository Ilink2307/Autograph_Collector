package group.sgbd_java_apis;

import classes.Database;
import org.springframework.web.bind.annotation.*;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

@RestController
@RequestMapping("/api")
public class GetAutographsController {

    @PostMapping("/autographs/{id_user}")
    public String getAutographs(@PathVariable Integer id_user){

        try{
            Connection connection = Database.getConnection();
            System.out.println("id provided: " + id_user);

            String output = "";
            CallableStatement stmt = connection.prepareCall("{call autograph_methods.get_user_autographs(?, ?)}");
            stmt.setInt(1, id_user);
            stmt.registerOutParameter(2, Types.LONGNVARCHAR);

            stmt.execute();

            output = stmt.getString(2);
            System.out.println("This users autographs are: \n\n" + output);

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