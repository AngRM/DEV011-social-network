// Importa los módulos necesarios de Firebase
import {
  db,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
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

// Función para traer los datos del post

export const getPost = async (id) => {
  const docSnapshot = await getDoc(doc(db, 'posts', id));
  const postDataEdit = docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
  console.log('cualquiercosatrayendo', postDataEdit);
  return postDataEdit;
};

// export const getPost = (id) => {
//   getDoc(doc(db, 'posts', id));
//   console.log('cualquiercosatrayendo', getDoc(doc(db, 'posts', id)));
// };

// funcion para eliminar los posts
export const deletePost = (id) => {
  deleteDoc(doc(db, 'posts', id));
  console.log('cualquiercosa', id);
};
/*
   const posts = [];
    snapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    callback(posts);
*/
