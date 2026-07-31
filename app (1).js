/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║       AUTO BODY SHOP — app.js (Firebase Module)           ║
 * ║       Gestion Planning & Absences — Garage RP             ║
 * ║       Firebase SDK v10 — Firestore                        ║
 * ╚═══════════════════════════════════════════════════════════╝
 *
 * Ce fichier est fourni comme référence structurelle.
 * La logique complète est intégrée dans index.html via <script type="module">.
 * Vous pouvez utiliser ce fichier dans une architecture modulaire (Vite, etc.)
 */

// ─────────────────────────────────────────────────────────────
// 1. IMPORTS FIREBASE SDK v10
// ─────────────────────────────────────────────────────────────
import { initializeApp }            from "firebase/app";
import { getAnalytics }             from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  getDoc
} from "firebase/firestore";


// ─────────────────────────────────────────────────────────────
// 2. CONFIGURATION FIREBASE
//    !! REMPLACEZ LES VALEURS CI-DESSOUS PAR VOTRE CONFIG !!
//    Disponible dans : Firebase Console > Paramètres du projet
// ─────────────────────────────────────────────────────────────
export const firebaseConfig = {
  apiKey:            "AIzaSyBR2VZtENM-AojtNalKBvpsZzdVRWOg7M8",
  authDomain:        "auto-body-shop-d2252.firebaseapp.com",
  databaseURL:       "https://auto-body-shop-d2252-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "auto-body-shop-d2252",
  storageBucket:     "auto-body-shop-d2252.firebasestorage.app",
  messagingSenderId: "45691832034",
  appId:             "1:45691832034:web:09efc5e25d319c365f80bb",
  measurementId:     "G-EGX46S1PGK"
};


// ─────────────────────────────────────────────────────────────
// 3. INITIALISATION
// ─────────────────────────────────────────────────────────────
const app       = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);   // Google Analytics ✓
const db        = getFirestore(app);


// ─────────────────────────────────────────────────────────────
// 4. CONSTANTES — NOM DES COLLECTIONS FIRESTORE
// ─────────────────────────────────────────────────────────────
export const COLLECTIONS = {
  EMPLOYEES: "employees",   // Collection des employés
  EVENTS:    "events",      // Collection des événements / absences
  NOTEPAD:   "notepad"      // Collection du bloc-notes d'atelier
};


// ─────────────────────────────────────────────────────────────
// 5. STRUCTURE DES DOCUMENTS FIRESTORE
// ─────────────────────────────────────────────────────────────

/**
 * EMPLOYEE DOCUMENT (Collection: "employees")
 * -------------------------------------------
 * {
 *   firstName: string,       // Prénom
 *   lastName:  string,       // Nom
 *   role:      string,       // Rôle (Mécanicien, Carrossier, etc.)
 *   color:     string,       // Couleur HEX (#e63946)
 *   initials:  string,       // Initiales auto-générées (ex: "JD")
 * }
 */

/**
 * EVENT DOCUMENT (Collection: "events")
 * --------------------------------------
 * {
 *   employeeId:    string,   // ID de l'employé (référence)
 *   employeeName:  string,   // Nom complet (dénormalisé pour perf)
 *   employeeColor: string,   // Couleur de l'employé
 *   startDate:     string,   // Date ISO "YYYY-MM-DD"
 *   endDate:       string,   // Date ISO "YYYY-MM-DD"
 *   type:          string,   // "conges"|"weekend"|"absence"|"ems"|"autre"
 *   note:          string,   // Commentaire optionnel
 *   createdAt:     string,   // ISO timestamp de création
 * }
 */

/**
 * NOTEPAD DOCUMENT (Collection: "notepad", doc id: "main" ou "priority")
 * -----------------------------------------------------------------------
 * {
 *   content:   string,       // Contenu du bloc-notes
 *   date:      string,       // Date "YYYY-MM-DD"
 *   updatedAt: string,       // ISO timestamp de mise à jour
 * }
 */


// ─────────────────────────────────────────────────────────────
// 6. FONCTIONS EMPLOYEES
// ─────────────────────────────────────────────────────────────

/**
 * Ajouter un employé
 * @param {Object} empData - Données de l'employé
 * @returns {Promise<DocumentReference>}
 */
export async function addEmployee(empData) {
  return await addDoc(collection(db, COLLECTIONS.EMPLOYEES), {
    firstName: empData.firstName,
    lastName:  empData.lastName,
    role:      empData.role,
    color:     empData.color,
    initials:  (empData.firstName[0] + empData.lastName[0]).toUpperCase()
  });
}

/**
 * Modifier un employé
 * @param {string} id - ID du document Firestore
 * @param {Object} empData - Données mises à jour
 * @returns {Promise<void>}
 */
export async function updateEmployee(id, empData) {
  return await updateDoc(doc(db, COLLECTIONS.EMPLOYEES, id), empData);
}

/**
 * Supprimer un employé
 * @param {string} id - ID du document Firestore
 * @returns {Promise<void>}
 */
export async function deleteEmployee(id) {
  return await deleteDoc(doc(db, COLLECTIONS.EMPLOYEES, id));
}

/**
 * Écouter en temps réel tous les employés (tri par nom)
 * @param {Function} callback - Fonction appelée à chaque changement
 * @returns {Function} - Unsubscribe function
 */
export function listenEmployees(callback) {
  const q = query(
    collection(db, COLLECTIONS.EMPLOYEES),
    orderBy("lastName")
  );
  return onSnapshot(q, (snapshot) => {
    const employees = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(employees);
  });
}


// ─────────────────────────────────────────────────────────────
// 7. FONCTIONS EVENTS (Absences / Planning)
// ─────────────────────────────────────────────────────────────

/**
 * Ajouter un événement / absence
 * @param {Object} eventData - Données de l'événement
 * @returns {Promise<DocumentReference>}
 */
export async function addEvent(eventData) {
  return await addDoc(collection(db, COLLECTIONS.EVENTS), {
    employeeId:    eventData.employeeId,
    employeeName:  eventData.employeeName,
    employeeColor: eventData.employeeColor,
    startDate:     eventData.startDate,
    endDate:       eventData.endDate,
    type:          eventData.type,
    note:          eventData.note || "",
    createdAt:     new Date().toISOString()
  });
}

/**
 * Modifier un événement
 * @param {string} id - ID du document Firestore
 * @param {Object} eventData - Données mises à jour
 * @returns {Promise<void>}
 */
export async function updateEvent(id, eventData) {
  return await updateDoc(doc(db, COLLECTIONS.EVENTS, id), eventData);
}

/**
 * Supprimer un événement
 * @param {string} id - ID du document Firestore
 * @returns {Promise<void>}
 */
export async function deleteEvent(id) {
  return await deleteDoc(doc(db, COLLECTIONS.EVENTS, id));
}

/**
 * Écouter en temps réel tous les événements (tri par date de début)
 * @param {Function} callback - Fonction appelée à chaque changement
 * @returns {Function} - Unsubscribe function
 */
export function listenEvents(callback) {
  const q = query(
    collection(db, COLLECTIONS.EVENTS),
    orderBy("startDate")
  );
  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(events);
  });
}

/**
 * Récupérer les événements d'un employé spécifique
 * @param {string} employeeId
 * @param {Function} callback
 * @returns {Function} - Unsubscribe function
 */
export function listenEmployeeEvents(employeeId, callback) {
  const q = query(
    collection(db, COLLECTIONS.EVENTS),
    orderBy("startDate")
  );
  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(e => e.employeeId === employeeId);
    callback(events);
  });
}


// ─────────────────────────────────────────────────────────────
// 8. FONCTIONS NOTEPAD (Bloc-notes d'atelier)
// ─────────────────────────────────────────────────────────────

/**
 * Sauvegarder la note principale
 * @param {string} content - Contenu du bloc-notes
 * @returns {Promise<void>}
 */
export async function saveMainNote(content) {
  return await setDoc(doc(db, COLLECTIONS.NOTEPAD, "main"), {
    content,
    date:      getTodayStr(),
    updatedAt: new Date().toISOString()
  });
}

/**
 * Sauvegarder la note prioritaire
 * @param {string} content - Contenu des consignes prioritaires
 * @returns {Promise<void>}
 */
export async function savePriorityNote(content) {
  return await setDoc(doc(db, COLLECTIONS.NOTEPAD, "priority"), {
    content,
    date:      getTodayStr(),
    updatedAt: new Date().toISOString()
  });
}

/**
 * Lire la note principale
 * @returns {Promise<string>}
 */
export async function getMainNote() {
  const snapshot = await getDoc(doc(db, COLLECTIONS.NOTEPAD, "main"));
  return snapshot.exists() ? snapshot.data().content : "";
}

/**
 * Lire la note prioritaire
 * @returns {Promise<string>}
 */
export async function getPriorityNote() {
  const snapshot = await getDoc(doc(db, COLLECTIONS.NOTEPAD, "priority"));
  return snapshot.exists() ? snapshot.data().content : "";
}

/**
 * Écouter les notes en temps réel
 * @param {Function} callback
 * @returns {Function} - Unsubscribe function
 */
export function listenNotepad(callback) {
  return onSnapshot(collection(db, COLLECTIONS.NOTEPAD), (snapshot) => {
    const notes = {};
    snapshot.docs.forEach(d => { notes[d.id] = d.data(); });
    callback(notes);
  });
}


// ─────────────────────────────────────────────────────────────
// 9. UTILITAIRES
// ─────────────────────────────────────────────────────────────

/**
 * Retourne la date du jour au format YYYY-MM-DD
 * @returns {string}
 */
export function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

/**
 * Convertit un objet Date en string YYYY-MM-DD
 * @param {Date} d
 * @returns {string}
 */
export function dateToStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

/**
 * Retourne le lundi de la semaine d'une date donnée
 * @param {Date} d
 * @returns {Date}
 */
export function getWeekStart(d) {
  const day  = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  const mon  = new Date(d);
  mon.setDate(d.getDate() + diff);
  return mon;
}

/**
 * Constantes des types d'événements
 */
export const EVENT_TYPES = {
  conges:  { label: "Congés / Vacances",  color: "#43aa8b" },
  weekend: { label: "Week-end",            color: "#6c757d" },
  absence: { label: "Absence / Maladie",   color: "#e63946" },
  ems:     { label: "Garde EMS",           color: "#f9c74f" },
  autre:   { label: "Autre",              color: "#4361ee" }
};

/**
 * Palette de couleurs pour les employés
 */
export const COLOR_PALETTE = [
  "#e63946","#f4a261","#f9c74f","#43aa8b","#4361ee",
  "#7209b7","#3a86ff","#06d6a0","#fb5607","#8338ec",
  "#ff006e","#00b4d8","#52b788","#e9c46a","#e76f51"
];

// ─────────────────────────────────────────────────────────────
// 10. EXPORT INSTANCES
// ─────────────────────────────────────────────────────────────
export { db, analytics };
