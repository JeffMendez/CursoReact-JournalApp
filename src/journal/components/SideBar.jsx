import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { InboxOutlined, MailOutline } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({drawerWidth = 240, mobileOpen, handleDrawerToggle}) => {

    const { displayName } = useSelector(state => state.auth)
    const { notes } = useSelector(state => state.journal)

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>{displayName}</Typography>
            </Toolbar>
            <Divider />
            <List>
                {
                    notes.map(note => ( <SideBarItem key={note.id} note={note} { ...note } handleDrawerToggle={handleDrawerToggle}  /> ))
                }
            </List>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
                >
                {drawer}
            </Drawer>
        </Box>
    )
}
