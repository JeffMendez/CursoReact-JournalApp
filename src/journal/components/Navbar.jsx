import { AppBar, IconButton, Toolbar, Typography, Grid } from "@mui/material"
import { MenuOutlined, LogoutOutlined } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";

export const Navbar = ({drawerWidth, handleDrawerToggle}) => {

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(startLogout());        
    }

    return (
        <AppBar
            position="fixed"
            sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'>Journal App</Typography>
                    <IconButton
                        color='error'
                        onClick={handleLogout}
                        >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
