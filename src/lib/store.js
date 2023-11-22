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
  updateDoc,
  where,
  auth,
} from './firebase';
// Conéctate a la base de datos de Firestore
// Función para agregar un nuevo post a Firestore
export function addNewPost(author, content) {
  const timestamp = new Date();
  const uid = auth.currentUser.uid;
  addDoc(collection(db, 'posts'), {
    author, content, timestamp, uid,
  });
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
export const updatePost = (id, content, author, timestamp) => {
  updateDoc(doc(db, 'posts', id), { content, author, timestamp });
  console.log('cosa editada');
};
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
export const getUserDoc = async (userId) => {
  console.log(userId);
  const objUser = {};
  const queryUser = query(collection(db, 'users'), where('uid', '==', userId));
  const querySnapshot = await getDocs(queryUser);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, '=>', doc.data());
    objUser.name = doc.data().name;
  });
  return objUser;
};
