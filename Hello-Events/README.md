# Hello Events

## 1. Introduction

Ce projet constitue le backend de l'application Hello Events, permettant la gestion des événements, des utilisateurs, des réservations et des contacts.

## Table des Matières

- [Fonctionnalités](#2-fonctionnalités)
- [Structure du Projet](#3-structure-du-projet)
- [Classes de l'Application Hello Events](#4-les-classes-de-lapplication-hello-events)
- [Énumérations de l'Application Hello Events](#5-les-énumérations-de-lapplication-hello-events)
- [Responsabilités des Méthodes de l'Application Hello Events](#6-les-responsabilités-des-méthodes-de-lapplication-hello-events)
- [Instructions d'Utilisation](#7-instructions-dutilisation)
- [Utilisation](#8-utilisation)
- [Technologies Utilisées](#9-technologies-utilisées)
- [Prérequis](#10-prérequis)
- [Installation et Configuration](#11-installation-et-configuration)
- [Auteur](#12-auteur)

## 2. Fonctionnalités

L'application Hello Events permet la gestion des événements et des réservations. Voici ses principales fonctionnalités :

- Gestion des utilisateurs, des événements et des réservations.
- Création, mise à jour et suppression des événements.
- Gestion des utilisateurs, y compris l'inscription, la connexion et la mise à jour des profils.
- Réalisation de recherches d'événements en fonction de divers critères (date, lieu, catégorie, etc.).
- Gestion des contacts, y compris la réception et la réponse aux demandes de contact.
- Gestion des rôles des utilisateurs (clients et administrateurs).
- Dockerisation de l'application pour faciliter le déploiement.

## 3. Structure du Projet

Le projet est structuré comme suit :

- `src/main/java/hello`: Contient les classes principales de l'application.
- `src/test/java/hello`: Contient les tests unitaires.
- `resources`: Contient les fichiers de configuration de l'application.
- `Dockerfile`: Fichier Docker pour containeriser l'application.
- `pom.xml`: Fichier de configuration Maven.

## 4. Les Classes de l'Application Hello Events

### 4.1. Event

**Objectif** : Représente un événement créé par un utilisateur.

**Attributs** :

- `id` (type `Long`) : Identifiant unique de l'événement (généré automatiquement).
- `name` (type `String`) : Nom de l'événement.
- `description` (type `String`) : Description de l'événement.
- `date` (type `LocalDateTime`) : Date de l'événement.
- `location` (type `String`) : Lieu de l'événement.
- `category` (type `EventCategory`) : Catégorie de l'événement (Enum).
- `availableTickets` (type `int`) : Nombre de tickets disponibles pour l'événement.
- `reservations` (type `List<Reservation>`) : Liste des réservations pour cet événement.

### 4.2. User

**Objectif** : Représente un utilisateur de l'application Hello Events.

**Attributs** :

- `id` (type `Long`) : Identifiant unique de l'utilisateur (généré automatiquement).
- `fullName` (type `String`) : Nom complet de l'utilisateur.
- `username` (type `String`) : Nom d'utilisateur unique.
- `password` (type `String`) : Mot de passe de l'utilisateur.
- `email` (type `String`) : Adresse email unique de l'utilisateur.
- `role` (type `Role`) : Rôle de l'utilisateur (Enum).
- `reservations` (type `List<Reservation>`) : Liste des réservations faites par l'utilisateur.
- `contact` (type `Contact`) : Informations de contact de l'utilisateur.

### 4.3. Reservation

**Objectif** : Représente une réservation faite par un utilisateur pour un événement.

**Attributs** :

- `id` (type `Long`) : Identifiant unique de la réservation (généré automatiquement).
- `event` (type `Event`) : Événement réservé.
- `user` (type `User`) : Utilisateur ayant fait la réservation.
- `purchaseDate` (type `LocalDateTime`) : Date de l'achat de la réservation.

### 4.4. LoginResponse

**Objectif** : Représente la réponse après une tentative de connexion réussie.

**Attributs** :

- `token` (type `String`) : Jeton JWT pour l'authentification.
- `expiresIn` (type `long`) : Durée de validité du jeton en secondes.

### 4.5. Contact

**Objectif** : Représente les informations de contact associées à un utilisateur.

**Attributs** :

- `id` (type `Long`) : Identifiant unique de la fiche contact (généré automatiquement).
- `message` (type `String`) : Message de contact.
- `status` (type `ContactStatus`) : Statut du contact (Enum).
- `user` (type `User`) : Utilisateur associé au contact.

## 5. Les Énumérations de l'Application Hello Events

### 5.1. EventCategory

**Objectif** : Représente les différentes catégories d'événements.

**Valeurs** :
- `CONFERENCE` : Conférence.
- `WORKSHOP` : Atelier.
- `MEETUP` : Rencontre.
- `CONCERT` : Concert.
- `FESTIVAL` : Festival.
- `WEBINAR` : Webinaire.
- `SEMINAR` : Séminaire.
- `PARTY` : Fête.
- `EXHIBITION` : Exposition.
- `SPORT_EVENT` : Événement sportif.

### 5.2. Role

**Objectif** : Représente les rôles des utilisateurs.

**Valeurs** :
- `USER` : Utilisateur.
- `ADMIN` : Administrateur.

### 5.3. ContactStatus

**Objectif** : Représente l'état des demandes de contact.

**Valeurs** :
- `PENDING` : En attente.
- `IN_PROGRESS` : En cours.
- `RESOLVED` : Résolu.

## 6. Les Responsabilités des Méthodes de l'Application Hello Events

### 6.1. AuthenticationService

**Classe**: `AuthenticationService`

**Responsabilités**:

- Gère l'inscription, l'authentification et la gestion des utilisateurs.

**Méthodes**:

1. `signup(RegisterUserDto input)`

    - **Description**: Inscrit un nouvel utilisateur.
    - **Paramètres**:
        - `input` (type `RegisterUserDto`): Objet contenant les informations d'inscription de l'utilisateur.
    - **Valeur de retour**: L'utilisateur inscrit.

2. `authenticate(LoginUserDto input)`

    - **Description**: Authentifie un utilisateur existant.
    - **Paramètres**:
        - `input` (type `LoginUserDto`): Objet contenant les informations de connexion de l'utilisateur.
    - **Valeur de retour**: L'utilisateur authentifié.

    
### 6.2. EventService

**Classe**: `EventService`

**Responsabilités**:

- Gère la logique métier des événements, y compris la création, la récupération, la mise à jour et la suppression des événements.

**Méthodes**:

1. `getAllEvents()`

    - **Description**: Récupère tous les événements.
    - **Paramètres**: Aucun.
    - **Valeur de retour**: Liste de `Event` contenant tous les événements.

2. `searchEvents(LocalDateTime date, String location, String category)`

    - **Description**: Effectue une recherche d'événements selon la date, le lieu et la catégorie.
    - **Paramètres**:
        - `date` (type `LocalDateTime`): Date de l'événement.
        - `location` (type `String`): Lieu de l'événement.
        - `category` (type `String`): Catégorie de l'événement.
    - **Valeur de retour**: Liste de `Event` correspondant aux critères de recherche.

3. `getEventById(Long id)`

    - **Description**: Récupère un événement par son identifiant unique.
    - **Paramètres**:
        - `id` (type `Long`): Identifiant unique de l'événement.
    - **Valeur de retour**: L'événement correspondant à l'ID spécifié.

4. `createEvent(Event event)`

    - **Description**: Crée un nouvel événement.
    - **Paramètres**:
        - `event` (type `Event`): Objet contenant les détails de l'événement à créer.
    - **Valeur de retour**: L'événement créé.

5. `updateEvent(Long id, Event eventDetails)`

    - **Description**: Met à jour les informations d'un événement existant.
    - **Paramètres**:
        - `id` (type `Long`): Identifiant unique de l'événement à mettre à jour.
        - `eventDetails` (type `Event`): Objet contenant les nouvelles informations de l'événement.
    - **Valeur de retour**: L'événement mis à jour.

6. `deleteEvent(Long id)`

    - **Description**: Supprime un événement spécifique.
    - **Paramètres**:
        - `id` (type `Long`): Identifiant unique de l'événement à supprimer.
    - **Valeur de retour**: Aucun (void).

### 6.3. ReservationService

**Classe**: `ReservationService`

**Responsabilités**:

- Gère la logique métier liée aux réservations d'événements, y compris l'achat de billets et la récupération des réservations.

**Méthodes**:

1. `purchaseTicket(Long eventId, User user)`

    - **Description**: Effectue l'achat d'un billet pour un événement.
    - **Paramètres**:
        - `eventId` (type `Long`): Identifiant unique de l'événement.
        - `user` (type `User`): Utilisateur effectuant l'achat.
    - **Valeur de retour**: La réservation effectuée.

2. `getTicketsByUser(User user)`

    - **Description**: Récupère toutes les réservations faites par un utilisateur spécifique.
    - **Paramètres**:
        - `user` (type `User`): Utilisateur pour lequel récupérer les réservations.
    - **Valeur de retour**: Liste de `Reservation` contenant les réservations de l'utilisateur.

3. `getAllPurchases(User user)`

    - **Description**: Récupère toutes les réservations effectuées.
    - **Paramètres**: Aucun.
    - **Valeur de retour**: Liste de `Reservation` contenant toutes les réservations.


### 6.4. ContactService

**Classe**: `ContactService`

**Responsabilités**:

- Gère la logique métier liée aux contacts, y compris la création, la récupération et la mise à jour des demandes de contact.

**Méthodes**:

1. `createContact(Contact contact, User user)`

    - **Description**: Crée une nouvelle demande de contact.
    - **Paramètres**:
        - `contact` (type `Contact`): Objet contenant les détails de la demande de contact.
        - `user` (type `User`): Utilisateur créant la demande de contact.
    - **Valeur de retour**: La demande de contact créée.

2. `getAllContacts()`

    - **Description**: Récupère toutes les demandes de contact.
    - **Paramètres**: Aucun.
    - **Valeur de retour**: Liste de `Contact` contenant toutes les demandes de contact.

3. `getContactById(Long id)`

    - **Description**: Récupère une demande de contact par son identifiant unique.
    - **Paramètres**:
        - `id` (type `Long`): Identifiant unique de la demande de contact.
    - **Valeur de retour**: La demande de contact correspondant à l'ID spécifié.

4. `updateContactStatus(Long id, Contact contacts)`

    - **Description**: Met à jour le statut d'une demande de contact.
    - **Paramètres**:
        - `id` (type `Long`): Identifiant unique de la demande de contact à mettre à jour.
        - `contacts` (type `Contact`): Objet contenant le nouveau statut de la demande de contact.
    - **Valeur de retour**: La demande de contact mise à jour.

### 6.5. JwtService

**Classe**: `JwtService`

**Responsabilités**:

- Gère la génération, l'extraction et la validation des tokens JWT.

**Méthodes**:

1. `extractUsername(String token)`

    - **Description**: Extrait le nom d'utilisateur d'un token JWT.
    - **Paramètres**:
        - `token` (type `String`): Le token JWT.
    - **Valeur de retour**: Le nom d'utilisateur extrait.

2. `generateToken(UserDetails userDetails, Role role)`

    - **Description**: Génère un token JWT pour un utilisateur.
    - **Paramètres**:
        - `userDetails` (type `UserDetails`): Détails de l'utilisateur.
        - `role` (type `Role`): Rôle de l'utilisateur.
    - **Valeur de retour**: Le token JWT généré.

3. `isTokenValid(String token, UserDetails userDetails)`

    - **Description**: Vérifie si un token JWT est valide pour un utilisateur spécifique.
    - **Paramètres**:
        - `token` (type `String`): Le token JWT.
        - `userDetails` (type `UserDetails`): Détails de l'utilisateur.
    - **Valeur de retour**: `true` si le token est valide, sinon `false`.

## 7. Instructions d'Utilisation

### 7.1. Gestion des Utilisateurs

- **Récupérer tous les utilisateurs**
   - **Endpoint**: `GET /api/auth/all`
   - **Description**: Récupère tous les utilisateurs enregistrés dans le système.

- **Créer un utilisateur**
   - **Endpoint**: `POST /api/auth/signup`
   - **Description**: Enregistre un nouvel utilisateur dans le système.

- **Mettre à jour un utilisateur**
   - **Endpoint**: `PUT /api/auth/update/{id}`
   - **Description**: Met à jour les informations d'un utilisateur existant.
   - **Paramètres**:
      - `id` (type `Long`): Identifiant unique de l'utilisateur à mettre à jour.

- **Supprimer un utilisateur**
   - **Endpoint**: `DELETE /api/auth/delete/{id}`
   - **Description**: Supprime un utilisateur existant du système.
   - **Paramètres**:
      - `id` (type `Long`): Identifiant unique de l'utilisateur à supprimer.

### 7.2. Gestion des Événements

- **Récupérer tous les événements**
   - **Endpoint**: `GET /api/events`
   - **Description**: Récupère tous les événements enregistrés dans le système.

- **Créer un événement**
   - **Endpoint**: `POST /api/events/admin/create`
   - **Description**: Crée un nouvel événement.
   - **Permissions**: Administrateur uniquement.

- **Mettre à jour un événement**
   - **Endpoint**: `PUT /api/events/admin/update/{id}`
   - **Description**: Met à jour les informations d'un événement existant.
   - **Paramètres**:
      - `id` (type `Long`): Identifiant unique de l'événement à mettre à jour.
   - **Permissions**: Administrateur uniquement.

- **Supprimer un événement**
   - **Endpoint**: `DELETE /api/events/admin/delete/{id}`
   - **Description**: Supprime un événement existant du système.
   - **Paramètres**:
      - `id` (type `Long`): Identifiant unique de l'événement à supprimer.
   - **Permissions**: Administrateur uniquement.

### 7.3. Gestion des Réservations

- **Réserver un billet**
   - **Endpoint**: `POST /api/reservations/client/purchase/{eventId}`
   - **Description**: Permet à un utilisateur de réserver un billet pour un événement.
   - **Paramètres**:
      - `eventId` (type `Long`): Identifiant unique de l'événement.

- **Récupérer toutes les réservations d'un utilisateur**
   - **Endpoint**: `GET /api/reservations/client/all`
   - **Description**: Récupère toutes les réservations faites par un utilisateur.

- **Récupérer toutes les réservations**
   - **Endpoint**: `GET /api/reservations/admin/purchases`
   - **Description**: Récupère toutes les réservations enregistrées dans le système.
   - **Permissions**: Administrateur uniquement.

### 7.4. Gestion des Contacts

- **Créer un contact**
   - **Endpoint**: `POST /api/contacts/client/create`
   - **Description**: Permet à un utilisateur de créer un contact.

- **Récupérer tous les contacts**
   - **Endpoint**: `GET /api/contacts/admin/all`
   - **Description**: Récupère tous les contacts enregistrés dans le système.
   - **Permissions**: Administrateur uniquement.

- **Récupérer un contact par ID**
   - **Endpoint**: `GET /api/contacts/admin/find/{id}`
   - **Description**: Récupère les détails d'un contact spécifique par son identifiant.
   - **Paramètres**:
      - `id` (type `Long`): Identifiant unique du contact.
   - **Permissions**: Administrateur uniquement.

- **Mettre à jour le statut d'un contact**
   - **Endpoint**: `PUT /api/contacts/admin/update/{id}`
   - **Description**: Met à jour le statut d'un contact spécifique.
   - **Paramètres**:
      - `id` (type `Long`): Identifiant unique du contact.
   - **Permissions**: Administrateur uniquement.

## 8. Utilisation

Pour utiliser l'application :

1. Lancez l'application depuis votre IDE ou en ligne de commande.
2. Utilisez un outil comme Postman pour tester les API exposées.
3. Suivez les instructions d'utilisation pour gérer les comptes, effectuer des transactions, etc.

## 9. Technologies Utilisées

L'application utilise les technologies suivantes :

- Java JDK 21
- Spring Boot 2.5.4
- Spring Data JPA pour l'accès aux données
- Spring MVC pour la gestion des requêtes HTTP
- MySQL comme base de données relationnelle
- Junit & Mockito pour les tests

## 10. Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- Java JDK 21
- MySQL Server
- Un IDE compatible avec Java et Spring Boot (comme IntelliJ IDEA ou Eclipse)

## 11. Installation et Configuration

Pour installer et configurer l'application :

1. Clonez le repository GitHub : `git clone https://github.com/ChaimaaLachhab/Hello-Events.git`
2. Importez le projet dans votre IDE.
3. Configurez les paramètres de la base de données dans `application.properties`.
4. Compilez et exécutez l'application.

## 12. Auteur

Ce projet a été développé par CHAIMAA LACHHAB pour l'école ENAA Béni Mellal. Contact : [chaimaa.lachhab@outlook.com](mailto:chaimaa.lachhab@outlook.com)