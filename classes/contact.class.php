<?php

class Contact
{
    private $conn;

    // Constructeur
    public function __construct()
    {
        // Initialisez la connexion à la base de données ici
        // Remplacez les valeurs par vos propres paramètres
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "test";

        $this->conn = new mysqli($servername, $username, $password, $dbname);

        // Vérifier la connexion
        if ($this->conn->connect_error) {
            die("La connexion à la base de données a échoué : " . $this->conn->connect_error);
        }
    }

    // Méthode pour récupérer la liste des contacts
    public function getContacts()
    {
        $sql = "SELECT c.id as id, c.first_name as first_name, c.last_name as last_name, c.category as category, cg.name as category_name FROM contacts c INNER JOIN categories cg ON c.category = cg.id";
        $result = $this->conn->query($sql);

        $contacts = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $contacts[] = $row;
            }
        }

        return $contacts;
    }

    // Méthode pour récupérer un contact via son id
    public function getContactById($contactId)
    {
        $sql = "SELECT c.id as id, c.first_name as first_name, c.last_name as last_name, c.category as category, cg.name as category_name FROM contacts c INNER JOIN categories cg ON c.category = cg.id WHERE c.id = $contactId";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
        }else{
            $row = false;
        }

        return $row;
    }
    
    // Méthode pour récupérer la liste des categories

    public function getCategories()
    {
        $sql = "SELECT * FROM categories";
        $result = $this->conn->query($sql);

        $cats = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $cats[] = $row;
            }
        }

        return $cats;
    }

    // Méthode pour ajouter un nouveau contact
    public function addContact($firstName, $lastName, $category)
    {
        $sql = "INSERT INTO contacts (first_name, last_name, category) VALUES ('$firstName', '$lastName', $category)";
        $result = $this->conn->query($sql);

        return ['success' => $result, 'message' => $result ? 'Contact ajouté avec succès' : 'Erreur lors de l\'ajout du contact'];
    }

    // Méthode pour éditer un contact existant
    public function editContact($contactId, $firstName, $lastName, $category)
    {
        $sql = "UPDATE contacts SET first_name='$firstName', last_name='$lastName', category='$category' WHERE id=$contactId";
        $result = $this->conn->query($sql);

        return ['success' => $result, 'message' => $result ? 'Contact modifié avec succès' : 'Erreur lors de la modification du contact'];
    }

    // Méthode pour supprimer un contact
    public function deleteContact($contactId)
    {
        $sql = "DELETE FROM contacts WHERE id=$contactId";
        $result = $this->conn->query($sql);

        return ['success' => $result, 'message' => $result ? 'Contact supprimé avec succès' : 'Erreur lors de la suppression du contact'];
    }

    // Destructeur
    public function __destruct()
    {
        // Fermer la connexion à la base de données
        $this->conn->close();
    }
}
