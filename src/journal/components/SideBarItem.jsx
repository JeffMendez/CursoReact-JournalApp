
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import NoteIcon from "@mui/icons-material/Note";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ note, title, body, handleDrawerToggle }) => {

    const newTitle = useMemo(() => {
        return title.length > 15
            ? title.substring(0, 15) + '...'
            : title
    },[title])

    const newBody = useMemo(() => {
        return body.length > 18
            ? body.substring(0, 18) + '...'
            : body
    },[body])


    const dispatch = useDispatch();
    const onClickNote = () => {
        handleDrawerToggle();
        dispatch(setActiveNote(note));
    }

    return (
        <ListItem 
            disablePadding
            onClick={onClickNote}
            >
            <ListItemButton>
                <ListItemIcon>
                    <NoteIcon />
                </ListItemIcon>          
                <ListItemText primary={newTitle} />
            </ListItemButton>
        </ListItem>      
    )
}
