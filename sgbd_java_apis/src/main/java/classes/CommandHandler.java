package classes;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.Scanner;

public class CommandHandler {
    private String registerPostUrl = "http://localhost:8081/api/register";
    private String loginPostUrl = "http://localhost:8081/api/login";
    private String autographNewUrl = "http://localhost:8081/api/new";
    private boolean stop = false;
    private String autographGetUrl = "http://localhost:8081/api/autographs";

    public void getInput() {
        Scanner scanner = new Scanner(System.in);
        String command = scanner.nextLine();
        System.out.println("Your command was: " + command);

        String firstWord = command.split(" ")[0];

        switch (firstWord) {
            case "register":
                executeRegister(command.split(" ")[1], command.split(" ")[2], command.split(" ")[3]);
                break;
            case "login":
                executeLogin(command.split(" ")[1], command.split(" ")[2]);
                break;
            case "stop":
                stop = true;
                break;
            case "get":
                executeGetAutographs(command.split(" ")[1]);
                break;
            case "new":
                executeNewAutograph(command.split(" ")[1], command.split(" ")[2],
                        command.split(" ")[3], command.split(" ")[4],
                        command.split(" ")[5], command.split(" ")[6]);
                break;
            default:
                break;
        }
    }

    private void executeNewAutograph(String s, String s1, String s2, String s3, String s4, String s5) {
        String url = autographNewUrl + '/' + s + '/' + s1 + '/' + s2 + '/' + s3 + '/' + s4 + '/' + s5;
        HttpPost httppost = new HttpPost(url);

        System.out.println(url);

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(httppost)) {

            System.out.println(EntityUtils.toString(response.getEntity()));
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void executeGetAutographs(String id_user) {
        String url = autographGetUrl + '/' + id_user;
        HttpPost httppost = new HttpPost(url);

        System.out.println(url);

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(httppost)) {

            System.out.println(EntityUtils.toString(response.getEntity()));
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void executeLogin(String email, String password) {
        String url = loginPostUrl + '/' + email + '/' + password;
        HttpPost httppost = new HttpPost(url);

        System.out.println(url);

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(httppost)) {

            System.out.println(EntityUtils.toString(response.getEntity()));
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void executeRegister(String email, String user, String password) {
        String url = registerPostUrl + '/' + email + '/' + user + '/' + password;
        HttpPost httppost = new HttpPost(url);

        System.out.println(url);

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(httppost)) {

            System.out.println(EntityUtils.toString(response.getEntity()));
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void run (){
        while(!stop) {
            getInput();
        }
    }
}
