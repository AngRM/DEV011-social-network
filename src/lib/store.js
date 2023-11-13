// Importa los módulos necesarios de Firebase
import {
  db, collection, addDoc, getDocs, query, orderBy, onSnapshot,
} from './firebase';
// Conéctate a la base de datos de Firestore

// Función para agregar un nuevo post a Firestore
export function addNewPost(author, content) {
  const timestamp = new Date();
  addDoc(collection(db, 'posts'), { author, content, timestamp });
}
// opcional si se quiere actualizar la página para ver las nuevas publicaciones
export const querySnapshot = getDocs(collection(db, 'posts'));

// Función para obtener la lista de posts ordenados por timestamp
export function listenForPosts(callback) {
  const postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
  return onSnapshot(postsQuery, callback);
}

/*
   const posts = [];
    snapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    callback(posts);
*/
