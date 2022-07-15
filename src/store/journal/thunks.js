import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { addNewEmptyNote, creatingNewNote, setActiveNote, setNotes, setSaving, noteUpdated, setPhotosToActiveNote, deleteNoteByID } from "./journalSlice";

export const startNewNote = () => {
    return async(dispatch, getState) => {
        dispatch(creatingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc(collection(FirebaseDB, `${ uid }/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;

        const notes = [];
        const collectionRef = collection(FirebaseDB, `${ uid }/journal/notes`);
        const docs = await getDocs(collectionRef);
        docs.forEach(doc => { notes.push( {id: doc.id, ...doc.data()} ) })

        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving())

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFirestore = { ...note }
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(noteUpdated(note))
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await deleteDoc(docRef);

        dispatch(deleteNoteByID(note.id))
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async(dispatch) => {
        dispatch(setSaving())

        const filePromises = [];
        for (const file of files) {
            filePromises.push(fileUpload(file));
        }

        const imagesURLs = await Promise.all(filePromises);
        dispatch(setPhotosToActiveNote(imagesURLs))
    }
}