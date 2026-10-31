/* eslint-disable */
declare module "firebase/app" {
  export interface FirebaseApp {
    name: string;
    options: Record<string, unknown>;
  }
  export function initializeApp(options: Record<string, unknown>): FirebaseApp;
  export function getApps(): FirebaseApp[];
}

declare module "firebase/auth" {
  export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }
  export interface Auth {
    currentUser: User | null;
  }
  export class GoogleAuthProvider {
    constructor();
  }
  export function getAuth(app?: unknown): Auth;
  export function signInWithPopup(auth: Auth, provider: unknown): Promise<{ user: User }>;
  export function signOut(auth: Auth): Promise<void>;
  export function onAuthStateChanged(auth: Auth, callback: (user: User | null) => void): () => void;
}

declare module "firebase/firestore" {
  export interface Firestore {
    type: string;
  }
  export interface DocumentSnapshot<T = any> {
    id: string;
    exists(): boolean;
    data(): T;
  }
  export interface QueryDocumentSnapshot<T = any> extends DocumentSnapshot<T> {}
  export interface QuerySnapshot<T = any> {
    docs: QueryDocumentSnapshot<T>[];
    size: number;
    empty: boolean;
  }
  export interface DocumentReference<T = any> {
    id: string;
    path: string;
  }
  export interface CollectionReference<T = any> {}
  export interface Query<T = any> {}
  export function getFirestore(app?: unknown): Firestore;
  export function doc(
    firestore: Firestore,
    path: string,
    ...pathSegments: string[]
  ): DocumentReference;
  export function doc(collection: CollectionReference, path?: string): DocumentReference;
  export function collection(
    firestore: Firestore,
    path: string,
    ...pathSegments: string[]
  ): CollectionReference;
  export function getDoc(reference: DocumentReference): Promise<DocumentSnapshot>;
  export function getDocs(query: Query): Promise<QuerySnapshot>;
  export function setDoc(
    reference: DocumentReference,
    data: unknown,
    options?: unknown,
  ): Promise<void>;
  export function deleteDoc(reference: DocumentReference): Promise<void>;
  export function updateDoc(reference: DocumentReference, data: unknown): Promise<void>;
  export function arrayUnion(...elements: unknown[]): unknown;
  export function query(collection: CollectionReference, ...queryConstraints: unknown[]): Query;
  export function where(fieldPath: string, opStr: string, value: unknown): unknown;
}
