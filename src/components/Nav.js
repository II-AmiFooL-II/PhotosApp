import {AppBar, Toolbar, IconButton,Typography} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const darkTheme = createTheme({
     palette: {
       mode: 'light',
     },
   });






const Nav = () => {
    return(
     <ThemeProvider theme={darkTheme}>
        <AppBar position='static' style={{ background: 'red' }} >
          <Toolbar>
               <Typography fontFamily='cursive' variant='h6' component='div' >
                    Image Gallery
               </Typography>
               
               
          </Toolbar>
        </AppBar>
     </ThemeProvider>
        
     );
}

export default Nav;