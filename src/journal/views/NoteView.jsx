import { SaveOutlined, UploadOutlined, DeleteOutlined } from "@mui/icons-material"
import { IconButton, Button, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "../../hooks"
import { setActiveNote, startSaveNote, startDeletingNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)
    const { body, title, date, onInputChange, formState} = useForm(note)

    const dateString = useMemo(() => {
        return new Date(date).toUTCString()
    }, [date])

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire(
                '¡Nota actualizada!',
                messageSaved,
                'success'
            )
        }
    }, [messageSaved])
    
    const onClickSaveNote = () => {
        dispatch(startSaveNote()) 
    }

    const onDeleteClick = () => {
        dispatch(startDeletingNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files))
    }

    return (
        <Grid container  direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={35} fontWeight='light'>{dateString}</Typography>
            </Grid>
            <Grid item>

                <input 
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

                <Button 
                    color="primary" 
                    sx={{ padding: 2 }}
                    onClick={onClickSaveNote}
                    disabled={isSaving}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingresa el titulo"
                    label="Titulo"
                    name="title"
                    value={title}
                    onChange={onInputChange}
                    sx={{ border: 'none', mb: 1 }}
                />
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que sucedio hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                    sx={{ border: 'none', mb: 1 }}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDeleteClick}
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutlined />
                    Borrar
                </Button>
            </Grid>

            <Grid container>  
                <ImageGallery images={note.imageUrls}  />
            </Grid>
        </Grid>
    )
}
