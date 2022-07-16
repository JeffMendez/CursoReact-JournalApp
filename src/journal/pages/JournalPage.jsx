import { AddOutlined } from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage = () => {

    const dispatch = useDispatch();
    const { active, isSaving } = useSelector(state => state.journal);
    
    const handleNewNote = () => {
        dispatch( startNewNote() );
    }

    return (
        <JournalLayout>

            {
                (active === null) 
                ? <NothingSelectedView />
                : <NoteView />
            }

            <Tooltip title="Agregar nota" arrow>
                <IconButton
                    size='large'
                    sx={{ 
                        color: 'white', 
                        backgroundColor: 'error.main',
                        ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                        position: 'fixed',
                        right: 50,
                        bottom: 50
                    }}
                    onClick={handleNewNote}
                    disabled={isSaving}
                >
                    <AddOutlined sx={{ fontSize: 30 }} />
                </IconButton>
            </Tooltip>

        </JournalLayout>
    )
}
