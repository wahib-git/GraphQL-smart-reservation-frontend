# Coworking Spaces - Application Angular 19

Application complète de gestion d'espaces de coworking développée avec Angular 19, Apollo GraphQL et Bootstrap.

## ✨ Fonctionnalités principales

### Authentification

- Connexion et inscription avec validation des champs
- Gestion sécurisée du JWT (stockage local)
- Guards pour la protection des routes selon le rôle (admin, membre, invité)

### Gestion des espaces

- Liste filtrable des espaces (bureaux, open space, salles de réunion, etc.)
- Détail complet d'un espace
- Création, modification et suppression d'espaces (admin uniquement)

### Réservations

- Liste des réservations (utilisateur et admin)
- Création de réservation avec vérification de disponibilité en temps réel
- Annulation et gestion des statuts (en attente, confirmée, annulée)

### Sécurité & Expérience utilisateur

- Messages d'erreur explicites et gestion des états de chargement
- Redirections automatiques selon le rôle de l'utilisateur
- Interface responsive et moderne grâce à Bootstrap

## 🏗️ Architecture

- **Services** : AuthService, SpaceService, ReservationService, UserService
- **Guards** : AuthGuard, AdminGuard, GuestGuard
- **Interceptors** : Gestion automatique du token JWT pour les requêtes GraphQL
- **Types** : Modèles TypeScript pour toutes les entités (User, Space, Reservation, etc.)
- **Composants** : Standalone components avec lazy loading pour des performances optimales

## 🔌 Configuration GraphQL

- Apollo Client configuré avec authentification JWT
- Queries et mutations pour toutes les opérations principales
- Gestion avancée du cache et des erreurs

## 🚀 Démarrage rapide

1. **Installer les dépendances**

   ```bash
   npm install
   ```

2. **Configurer l'API GraphQL**

   - Par défaut, l'URL de l'API est `http://localhost:4000/graphql` (modifiable dans `src/main.ts`).

3. **Lancer l'application**
   ```bash
   npm start
   ```
   L'application sera accessible sur [http://localhost:4200](http://localhost:4200).

## 📁 Structure du projet

- `src/app/components` : Composants Angular (auth, dashboard, admin, espaces, réservations, etc.)
- `src/app/services` : Services pour la communication avec l'API GraphQL
- `src/app/guards` : Guards pour la sécurité des routes
- `src/app/types` : Modèles TypeScript
- `src/app/graphql` : Définition des queries et mutations

## 🛡️ Sécurité

- Authentification JWT côté client
- Guards pour la protection des routes sensibles
- Vérification des rôles pour l'accès à l'administration

## 📦 Dépendances principales

- Angular 19
- Apollo Angular & GraphQL
- Bootstrap 5
- RxJS

## 🙌 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

**Développé avec ❤️ pour la gestion moderne des espaces de coworking.**
