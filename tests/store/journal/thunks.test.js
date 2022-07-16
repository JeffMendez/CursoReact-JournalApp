import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, creatingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe('Testing in Journal thunks', () => { 
    
    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('startNewNote show create a new note', async() => { 
        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: {uid: uid}})

        await startNewNote()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(creatingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            title: 'Sin título',
            body: '',
            imageUrls: [],
            id: expect.any(String),
            date: expect.any(Number),
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            title: 'Sin título',
            body: '',
            imageUrls: [],
            id: expect.any(String),
            date: expect.any(Number),
        }));

        // Borrar de firebase
        const deletePromises = [];
        const collectionRef = collection(FirebaseDB, `TEST-UID/journal/notes`);
        const docs = await getDocs(collectionRef);
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)))
        await Promise.all(deletePromises);
    })
})