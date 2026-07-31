# 🔧 Auto Body Shop — Planning Manager

> Application web complète de gestion du planning et des absences pour garage automobile.

![Auto Body Shop](https://img.shields.io/badge/Auto%20Body%20Shop-Planning%20Manager-orange?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xNS4xMiAxMy41M2MtMS4wMS40Ni0yLjEzLjcyLTMuMzIuNzJhNy43IDcuNyAwIDAgMS0zLjE2LS42N2wtMy4xNiAxLjkzTDQgMTJsMS40Mi0yLjEyQTcuNjggNy42OCAwIDAgMSA1IDcuNzVDNSA2LjIzIDYuMjMgNSA3Ljc1IDVoOC41QzE3Ljc3IDUgMTkgNi4yMyAxOSA3Ljc1YzAgMS4xNS0uNDEgMi4yLS45IDMuMTFsMiAyLjI0TTE3IDEzaDJhMiAyIDAgMCAxIDIgMnY2YTIgMiAwIDAgMS0yIDJIN2EyIDIgMCAwIDEtMi0ydi02YTIgMiAwIDAgMSAyLTJoMiIvPjwvc3ZnPg==)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 📅 **Planning Calendrier** | Vue mensuelle et hebdomadaire avec navigation fluide |
| 👷 **Gestion du Personnel** | Créer, modifier, supprimer les employés avec couleur unique |
| 🏷️ **Types d'absences** | Congés, Maladie, Formation, Week-end, Jour Férié, Mission externe |
| 🔍 **Filtres dynamiques** | Filtrer par employé et/ou par type d'absence |
| 👥 **Compteur de présence** | Indicateur en temps réel des employés disponibles aujourd'hui |
| 📝 **Bloc-notes Atelier** | Zone de consignes synchronisée avec Firestore |
| 🔥 **Firebase Temps réel** | Synchronisation instantanée via Firestore onSnapshot |
| 🎭 **Mode Démo** | Données locales pour tester sans Firebase |

---

## 🗂️ Structure du Projet

```
auto-body-shop-planning/
│
├── 📄 index.html                    # Point d'entrée HTML
├── 📄 README.md                     # Ce fichier
├── 📄 package.json                  # Dépendances npm
├── 📄 tsconfig.json                 # Configuration TypeScript
├── 📄 vite.config.ts                # Configuration Vite
│
├── 📁 public/
│   ├── 🖼️  logo.png                 # Logo du garage
│   └── 📄 app.js                   # Version JS standalone (référence)
│
└── 📁 src/
    ├── 📄 App.tsx                   # Composant racine
    ├── 📄 main.tsx                  # Point d'entrée React
    ├── 📄 index.css                 # Styles globaux (Tailwind)
    │
    ├── 📁 types/
    │   └── 📄 index.ts              # Types TypeScript (Employee, Event, etc.)
    │
    ├── 📁 firebase/
    │   ├── 📄 config.ts             # ⚙️ Configuration Firebase (à personnaliser)
    │   └── 📄 firestore.ts          # Services CRUD Firestore
    │
    ├── 📁 hooks/
    │   ├── 📄 useFirestore.ts       # Hook connexion Firebase temps réel
    │   └── 📄 useDemoData.ts        # Hook données de démonstration locale
    │
    └── 📁 components/
        ├── 📄 Header.tsx            # En-tête + compteur de présence
        ├── 📄 Sidebar.tsx           # Navigation latérale
        ├── 📄 EmployeeManager.tsx   # Gestion du personnel
        ├── 📄 WorkshopNotes.tsx     # Bloc-notes atelier
        ├── 📄 FirebaseBanner.tsx    # Bannière de configuration Firebase
        │
        ├── 📁 planning/
        │   ├── 📄 PlanningView.tsx  # Vue planning + filtres
        │   ├── 📄 CalendarMonth.tsx # Grille mensuelle
        │   ├── 📄 CalendarWeek.tsx  # Grille hebdomadaire
        │   └── 📄 EventModal.tsx    # Formulaire ajout/édition absence
        │
        └── 📁 ui/
            ├── 📄 Modal.tsx         # Fenêtre modale réutilisable
            └── 📄 Badge.tsx         # Badges & couleurs
```

---

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+
- npm ou yarn
- Un compte Firebase (gratuit)

### 1. Cloner le dépôt

```bash
git clone https://github.com/VOTRE_USERNAME/auto-body-shop-planning.git
cd auto-body-shop-planning
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Démarrer en mode démo (sans Firebase)

```bash
npm run dev
```

L'application démarre avec des données locales de démonstration — aucune configuration requise.

---

## 🔥 Configuration Firebase

### Étape 1 — Créer un projet Firebase

1. Rendez-vous sur [console.firebase.google.com](https://console.firebase.google.com)
2. Cliquez sur **"Ajouter un projet"**
3. Nommez votre projet (ex: `auto-body-shop-planning`)
4. Désactivez Google Analytics (optionnel) → Créer

### Étape 2 — Activer Firestore Database

1. Dans la Console Firebase → **Firestore Database**
2. Cliquez **"Créer une base de données"**
3. Sélectionnez **"Mode test"** (pour commencer)
4. Choisissez votre région (ex: `europe-west3`) → Terminé

### Étape 3 — Récupérer votre configuration

1. **Paramètres du projet** (icône ⚙️) → **Général**
2. Descendez jusqu'à **"Vos applications"**
3. Cliquez sur **"Ajouter une application"** → Web (`</>`)
4. Nommez votre app → **"Enregistrer l'application"**
5. Copiez l'objet `firebaseConfig`

### Étape 4 — Configurer l'application

Ouvrez `src/firebase/config.ts` et remplacez les valeurs :

```typescript
export const firebaseConfig = {
  apiKey:            "AIzaSy...",        // ← Votre valeur
  authDomain:        "monprojet.firebaseapp.com",
  projectId:         "monprojet",
  storageBucket:     "monprojet.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123",
};
```

### Étape 5 — Activer Firebase dans l'app

Ouvrez `src/App.tsx` et modifiez ces lignes :

```typescript
// ❌ AVANT (mode démo)
import { useDemoData } from './hooks/useDemoData';
const data = useDemoData();

// ✅ APRÈS (Firebase)
import { useFirestore } from './hooks/useFirestore';
const data = useFirestore();
```

Et changez :
```typescript
const [isDemoMode] = useState(true);   // ❌
const [isDemoMode] = useState(false);  // ✅
```

### Étape 6 — Règles de sécurité Firestore

Dans la Console Firebase → **Firestore** → **Règles** :

```javascript
// ⚠️ Règles de développement (accès public — à restreindre en production)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> **En production**, limitez les accès avec une authentification Firebase Auth.

---

## 🏗️ Collections Firestore

L'application utilise 3 collections :

### `employees` — Employés
```json
{
  "firstName": "Marc",
  "lastName": "Dupont",
  "role": "Chef d'atelier",
  "color": "#F97316",
  "createdAt": 1709000000000
}
```

### `planningEvents` — Absences
```json
{
  "employeeId": "abc123",
  "employeeName": "Marc Dupont",
  "employeeColor": "#F97316",
  "type": "Congés / Vacances",
  "title": "Congés / Vacances – Marc Dupont",
  "startDate": "2025-07-14",
  "endDate": "2025-07-25",
  "notes": "Congés d'été",
  "createdAt": 1709000000000
}
```

### `workshopNotes` — Bloc-notes (document unique `daily-note`)
```json
{
  "content": "📦 Livraison pièces vendredi matin...",
  "updatedAt": 1709000000000
}
```

---

## 📦 Build & Déploiement

### Build de production

```bash
npm run build
```

Les fichiers optimisés sont générés dans `/dist`.

### Déployer sur GitHub Pages

```bash
# Installer gh-pages
npm install -D gh-pages

# Ajouter dans package.json > scripts :
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy
```

### Déployer sur Vercel

```bash
# Via CLI
npm install -g vercel
vercel

# Ou connectez votre dépôt GitHub directement sur vercel.com
```

### Déployer sur Netlify

Glissez-déposez le dossier `/dist` sur [netlify.com/drop](https://netlify.com/drop).

---

## 🎨 Personnalisation

### Ajouter un rôle d'employé

Dans `src/types/index.ts` :
```typescript
export type EmployeeRole =
  | 'Mécanicien'
  | 'Carrossier'
  // Ajoutez votre rôle ici :
  | 'Responsable Qualité';
```

### Ajouter un type d'absence

```typescript
export type AbsenceType =
  | 'Congés / Vacances'
  // Ajoutez votre type :
  | 'Astreinte Weekend';

// Et dans ABSENCE_COLORS :
export const ABSENCE_COLORS = {
  'Astreinte Weekend': { bg: 'bg-indigo-500/20', text: 'text-indigo-300', border: 'border-indigo-500/50', badge: 'bg-indigo-500' },
};
```

---

## 🛠️ Stack Technique

| Outil | Version | Usage |
|---|---|---|
| **React** | 19 | Framework UI |
| **TypeScript** | 5.x | Typage statique |
| **Tailwind CSS** | 4.x | Styles utilitaires |
| **Vite** | 7.x | Build & Dev server |
| **Firebase SDK** | 10.x | Firestore temps réel |
| **date-fns** | 4.x | Manipulation de dates |
| **lucide-react** | latest | Icônes SVG |

---

## 📋 Roadmap

- [ ] Authentification Firebase Auth (connexion par email)
- [ ] Export PDF du planning mensuel
- [ ] Notifications push pour les nouvelles absences
- [ ] Application mobile PWA
- [ ] Intégration Google Calendar
- [ ] Dashboard statistiques annuelles

---

## 📄 Licence

MIT — Libre d'utilisation et de modification.

---

> **Auto Body Shop Planning Manager** — Développé avec ❤️ pour les garages automobiles.
