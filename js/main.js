document.addEventListener("DOMContentLoaded", function () {

    // Charger la liste des categories
    loadCategories();

    // Charger la liste des contacts
    loadContacts();

    function loadCategories() {
        fetch('ajax.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'action=getCategories',
        })
        .then(response => response.json())
        .then(data => {
            // Gérer la réponse du serveur
            if (data.error) {
                console.error(data.error);
            } else {
                // Appeler la fonction pour remplir la liste déroulante des catégories
                fillCategoryDropdown(data);
            }
        })
        .catch(error => console.error('Erreur lors de la récupération des catégories:', error));
    }
    
    // Fonction pour remplir la liste déroulante des catégories
    function fillCategoryDropdown(categories) {
        const categoryDropdown = document.querySelectorAll('.category');
    
        categoryDropdown.forEach(dropDown =>{
            // Effacer les options actuelles
            dropDown.innerHTML = '';
                
            // Ajouter chaque catégorie comme une option
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                dropDown.appendChild(option);
            });
        })
        
    }

    // Fonction pour charger les contacts
    function loadContacts() {
        fetch('ajax.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'action=getContacts',
        })
        .then(response => response.json())
        .then(data => {
            // Gérer la réponse du serveur
            if (data.error) {
                console.error(data.error);
            } else {
                displayContacts(data);
            }
        })
        .catch(error => console.error('Erreur lors de la récupération des contacts:', error));
    }

    // Fonction pour afficher la liste des contacts
    function displayContacts(contacts) {
        const contactsListContainer = document.getElementById('contacts_list');
        contactsListContainer.innerHTML = ''; // Effacer le contenu actuel

        if(contacts.length == 0){
            contactsListContainer.innerHTML = '<h1>Aucun contact à afficher</h1>';
        }

        // Afficher chaque contact dans une carte moderne
        contacts.forEach(contact => {
            const contactCard = document.createElement('div');
            contactCard.classList.add('contact-card');

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');
            cardContent.innerHTML = `
                <p class="contact-name">${contact.first_name} ${contact.last_name}</p>
                <p class="contact-category">${contact.category_name}</p>
            `;

            const cardActions = document.createElement('div');
            cardActions.classList.add('card-actions');
            cardActions.innerHTML = `
                <button class="edit-button" data-id='${contact.id}'>Modifier</button>
                <button class="delete-button" data-id='${contact.id}'>Supprimer</button>
            `;

            contactCard.appendChild(cardContent);
            contactCard.appendChild(cardActions);
            contactCard.addEventListener('click', () => showContactDetails(contact.id));

            contactsListContainer.appendChild(contactCard);
        });
        document.querySelectorAll(".edit-button").forEach(btn => {
            btn.addEventListener("click",(e)=>{
                e.stopPropagation();
                patchEditForm(btn.dataset.id);
                showModal('editContactModal');
            });
        })
        document.querySelectorAll(".delete-button").forEach(btn => {
            btn.addEventListener("click",(e)=>{
                e.stopPropagation();
                deleteContact(btn.dataset.id);
            });
        })
    }

    // Fonction pour afficher la fiche du contact
    function showContactDetails(contactId) {
        fetch('ajax.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=getContactDetails&contactId=${contactId}`,
        })
        .then(response => response.json())
        .then(data => {
            // Gérer la réponse du serveur
            if (!data) {
                console.error("error occured");
            } else {
                showModal("viewContactModal");
                // Afficher les détails du contact dans une popup
                document.querySelector('#viewFirstName').textContent = data.first_name;
                document.querySelector('#viewLastName').textContent = data.last_name;
                document.querySelector('#viewCategory').textContent = data.category_name;
            }
        })
        .catch(error => console.error('Erreur lors de la récupération des détails du contact:', error));
    }

    // Fonction pour ajouter un nouveau contact
    function addContact(firstName,lastName,category) {

        fetch('ajax.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=addContact&firstName=${firstName}&lastName=${lastName}&category=${category}`,
        })
        .then(response => response.json())
        .then(data => {
            // Gérer la réponse du serveur
            if (!data.success) {
                console.error(data.message);
            } else {
                // Recharger la liste des contacts après l'ajout
                loadContacts();
            }
        })
        .catch(error => console.error('Erreur lors de l\'ajout du contact:', error));
    }

    // Fonction pour éditer un contact existant
    function editContact(contactId,firstName,lastName,category) {

        fetch('ajax.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=editContact&contactId=${contactId}&firstName=${firstName}&lastName=${lastName}&category=${category}`,
        })
        .then(response => response.json())
        .then(data => {
            // Gérer la réponse du serveur
            if (!data.success) {
                console.error(data.message);
            } else {
                // Recharger la liste des contacts après l'ajout
                loadContacts();
            }
        })
        .catch(error => console.error('Erreur lors de l\'édition du contact:', error));
    }

    // Fonction pour pré-remplir le formulaire d'édition avec les détails du contact
    function patchEditForm(contactId) {
        // Effectuer une requête AJAX pour récupérer les détails du contact
        fetch('ajax.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=getContactDetails&contactId=${contactId}`,
        })
        .then(response => response.json())
        .then(data => {
            // Gérer la réponse du serveur
            if (!data) {
                console.error("error occured");
            } else {
                // Remplir le formulaire d'édition avec les détails du contact
                document.querySelector('#editContactModal #id').value = data.id;
                document.querySelector('#editContactModal #firstName').value = data.first_name;
                document.querySelector('#editContactModal #lastName').value = data.last_name;
                document.querySelector('#editContactModal #category').value = data.category;

                // Afficher la boîte modale d'édition
                showModal('editContactModal');
            }
        })
        .catch(error => console.error('Erreur lors de la récupération des détails du contact:', error));
    }

    // Fonction pour supprimer un contact
    function deleteContact(contactId) {
        const confirmDelete = confirm("Voulez-vous vraiment supprimer ce contact ?");
        if (confirmDelete) {
            fetch('ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `action=deleteContact&contactId=${contactId}`,
            })
            .then(response => response.json())
            .then(data => {
                // Gérer la réponse du serveur
                if (!data.success) {
                    console.error(data.message);
                } else {
                    // Recharger la liste des contacts après l'ajout
                    loadContacts();
                }
            })
            .catch(error => console.error('Erreur lors de la suppression du contact:', error));
        }
    }

    // Fonction pour afficher une boîte modale
    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
    }

    // Fonction pour fermer une boîte modale
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
    }

    // Fermer la boîte modale lorsqu'on clique en dehors de son contenu
    window.onclick = function (event) {
        if (event.target.className === 'modal') {
            event.target.style.display = 'none';
        }
    };

    document.querySelector("#addButton").addEventListener("click",()=>{showModal('addContactModal')})
    
    // document.querySelector("#addButton").addEventListener("click",()=>{showModal('addContactModal')})
    document.querySelector("#addContactForm").addEventListener("submit",(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData.get("firstName"), formData.get("lastName"),formData.get("category"))
        addContact(formData.get("firstName"), formData.get("lastName"),formData.get("category"));
    });
    document.querySelector("#editContactForm").addEventListener("submit",(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        editContact(formData.get("contactId"),formData.get("firstName"), formData.get("lastName"),formData.get("category"));
    })
});
