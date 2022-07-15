import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null, // { id: 123, title: '', body: '', date: 1234, imageUrls: [] }
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        creatingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
            state.messageSaved = '';
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        }, 
        noteUpdated: (state, {payload}) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === payload.id) return payload;
                return note;
            })

            state.messageSaved = `${ payload.title }`
        },
        setPhotosToActiveNote: (state, {payload}) => {
            state.isSaving = false;
            state.active.imageUrls = [...state.active.imageUrls, ...payload]
        },  
        deleteNoteByID: (state, {payload}) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== payload)
        },  
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        }
    },
})

export const { 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    noteUpdated,
    deleteNoteByID,
    setPhotosToActiveNote,
    creatingNewNote,
    clearNotesLogout,

} = journalSlice.actions