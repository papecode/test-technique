<?php

// Inclure les fichiers nécessaires
require_once 'classes/contact.class.php';

// Vérifier si une action est spécifiée dans la requête
if (isset($_POST['action'])) {
    $action = $_POST['action'];

    // Créer une instance de la classe Contact
    $contact = new Contact();

    // Exécuter l'action appropriée
    switch ($action) {
        case 'getContacts':
            echo json_encode($contact->getContacts());
            break;
        
        case 'getCategories':
            echo json_encode($contact->getCategories());
            break;
        
        case 'getContactDetails':
            $contactId = intval($_POST['contactId']);
            echo json_encode($contact->getContactById($contactId));
            break;

        case 'addContact':
            $firstName = $_POST['firstName'];
            $lastName = $_POST['lastName'];
            $category = intval($_POST['category']);

            echo json_encode($contact->addContact($firstName, $lastName, $category));
            break;

        case 'editContact':
            $contactId = intval($_POST['contactId']);
            $firstName = $_POST['firstName'];
            $lastName = $_POST['lastName'];
            $category = intval($_POST['category']);

            echo json_encode($contact->editContact($contactId, $firstName, $lastName, $category));
            break;

        case 'deleteContact':
            $contactId = intval($_POST['contactId']);

            echo json_encode($contact->deleteContact($contactId));
            break;

        default:
            echo json_encode(['error' => 'Action non reconnue']);
            break;
    }
} else {
    echo json_encode(['error' => 'Aucune action spécifiée']);
}
