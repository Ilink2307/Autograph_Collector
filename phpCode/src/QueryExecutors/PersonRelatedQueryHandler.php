<?php
namespace Src\QueryExecutors;

use PDO;
use PDOException;

class PersonRelatedQueryHandler {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll()
    {
        $statement = "SELECT ID_USER, EMAIL, USERNAME FROM ACCOUNTS;";

        try {
            $statement = $this->db->query($statement);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function find($id)
    {
        $statement = "SELECT ID_USER, EMAIL, USERNAME FROM ACCOUNTS WHERE ID_USER = ?;";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($id));
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function insert(Array $input)
    {
        $statement = "
            INSERT INTO ACCOUNTS 
            VALUES
                (:id_user, :email, :username, :pass);
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'id_user' => $input['id_user'],
                'email'  => $input['email'],
                'username' => isset($input['username']) ? $input['username'] : null,
                'pass' => isset($input['pass']) ? $input['pass'] : null,
            ));
            return $statement->rowCount();
        } catch (PDOException $e) {
            exit($e->getMessage());
        }
    }
}