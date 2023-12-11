<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap">
    <link rel="stylesheet" href="css/styles.css">
    <title>Carnet de contacts</title>
</head>
<body>
    <?php include_once('./parts/header.php'); ?>

    <div id="contacts_list"></div>

    <!-- Boîte modale pour l'ajout de contact -->
    <div id="addContactModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal('addContactModal')">&times;</span>
            <h2>Ajouter un contact</h2>

            <form id="addContactForm">
                <label for="firstName">Prénom:</label>
                <input type="text" id="firstName" name="firstName" required>

                <label for="lastName">Nom:</label>
                <input type="text" id="lastName" name="lastName" required>

                <label for="category">Catégorie:</label>
                <select class="category" name="category" required></select>

                <button type="submit">Ajouter</button>
            </form>
        </div>
    </div>

    <!-- Boîte modale pour l'édition de contact -->
    <div id="editContactModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal('editContactModal')">&times;</span>
            <h2>Éditer le contact</h2>
            <form id="editContactForm">
                <input type="hidden" name="contactId" id="id">
                <label for="firstName">Prénom:</label>
                <input type="text" id="firstName" name="firstName" required>

                <label for="lastName">Nom:</label>
                <input type="text" id="lastName" name="lastName" required>

                <label for="category">Catégorie:</label>
                <select class="category" id="category" name="category" required></select>

                <button type="submit">Modifier</button>
            </form>
        </div>
    </div>

    <!-- Boîte modale pour l'affichage de contact -->
    <div id="viewContactModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal('viewContactModal')">&times;</span>
            <h2>Détails du contact</h2>
            <div id="contactDetailsContainer">
                <p><strong>Prénom:</strong> <span id="viewFirstName"></span></p>
                <p><strong>Nom:</strong> <span id="viewLastName"></span></p>
                <p><strong>Catégorie:</strong> <span id="viewCategory"></span></p>
            </div>
        </div>
    </div>

    <?php include_once('./parts/footer.php'); ?>
    <script src="js/main.js"></script>
</body>
</html>
