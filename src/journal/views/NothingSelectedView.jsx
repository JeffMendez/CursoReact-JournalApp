import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { Grid, Typography } from "@mui/material"

export const NothingSelectedView = () => {
    return (
        <Grid
            container spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            sx={{ height: '84vh', backgroundColor: '#DCDCDC', borderRadius: 3, padding: 10 }}
        >
            <Grid item
                className="box-shadow animate__animated animate__fadeIn"
                xs={3}
                sx={{ 
                    width: {md: '60vh'},
                    backgroundColor: 'transparent', 
                    padding: 3, 
                    borderRadius: 2 
                    }}
                >
                    
                <PanToolAltIcon sx={{ fontSize: 100, color: 'dark' }} />
                <Typography variant='h5' sx={{ mb: 2 }}>Selecciona una entrada...</Typography>
                
            </Grid>
        </Grid>
    )
}
