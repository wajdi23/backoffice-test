## Configuration requise

- Docker et Docker Compose installés sur votre machine
- Node.js (version 18 ou supérieure)

## Variables d'environnement

1. Dans le fichier `.env.docker` à la racine du projet modifiez les variables suivantes :

```bash
SENDGRID_API_KEY=<envoyée par mail>
SENDGRID_FROM_EMAIL=<envoyé par mail>
```

La clé API SendGrid n'est pas incluse pour des raisons de sécurité.

## URLs des services

- Frontend : `http://localhost:3001`
- Backend API : `http://localhost:3000`
- Base de données PostgreSQL : `postgresql://user:password@db:5432/onepointdb`
- PgAdmin : `http://localhost:5050`
  - Email : admin@admin.com
  - Mot de passe : admin

## Lancement du projet

```bash
docker-compose up --build
```

## Note sur la base de données

Les migrations et le seeding de la base de données sont automatiquement exécutés au démarrage.

Un User est crée par défaut:

```bash
admin@admin.com
mot de passe "admin"
```
