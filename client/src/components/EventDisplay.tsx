import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import EventModelForView from '../models/EventModelForView';


const boxStyle = {
    background: 'rgba(200, 200, 200)',
    width: '60%',
    height: '900px',
    margin: '80px 20% 0px',
    borderRadius: '40px',
    padding: '15px'
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    }));



interface EventDisplayProps{
    event: EventModelForView; 
}


const EventDisplay = (props: EventDisplayProps) => {
    const thisEvent = props.event;
    
    return (<>
    {/* <div style={ boxStyle }>
    //         organizer
    //     <div style={ splitForm }>
    //         <div>
    //             intensity - type <br/>
    //             Description <br/>
    //         </div>
    //         <div>
    //             Date <br/>
    //             users <br/>
    //         </div>
    //     </div>
    // </div> */}
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid xs={12} md={12} lg={12}>
                <Item> Event Organizer is: { thisEvent.organizer.firstName } {thisEvent.organizer.lastName}</Item>
            </Grid>
        <Grid container xs={12} md={12} lg={12} spacing={4}>
            <Grid xs={6} md={6} lg={6}>
                <Item>
                <Box
                id="category-a"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                >
                    What are we doing?
                </Box>
                <Box component="ul" aria-labelledby="category-a" sx={{ pl: 2 }}>
                    
                </Box>
                </Item>
            </Grid>
            <Grid xs={6} md={6} lg={6}>
                <Item>
                <Box
                id="category-b"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                >
                    Category B
                </Box>
                <Box component="ul" aria-labelledby="category-b" sx={{ pl: 2 }}>
                    <li>Link 2.1</li>
                    <li>Link 2.2</li>
                    <li>Link 2.3</li>
                </Box>
                </Item>
            </Grid>
            <Grid xs={6} md={6} lg={6}>
                <Item>
                <Box
                id="category-c"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                >
                    Category C
                </Box>
                <Box component="ul" aria-labelledby="category-c" sx={{ pl: 2 }}>
                    <li>Link 3.1</li>
                    <li>Link 3.2</li>
                    <li>Link 3.3</li>
                </Box>
                </Item>
            </Grid>
            <Grid xs={6} md={6} lg={6}>
                <Item>
                <Box
                id="category-d"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                >
                    Category D
                </Box>
                <Box component="ul" aria-labelledby="category-d" sx={{ pl: 2 }}>
                    <li>Link 4.1</li>
                    <li>Link 4.2</li>
                    <li>Link 4.3</li>
                </Box>
                </Item>
            </Grid>
            </Grid>
        <Grid
        xs={12}
        md={12} 
        lg={12}
        container
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: 'column', sm: 'row' }}
        sx={{ fontSize: '12px' }}
        >
            <Grid sx={{ order: { xs: 2, sm: 1 } }}>
                <Item>© Copyright</Item>
            </Grid>
            <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
            <Grid>
                <Item>Link A</Item>
            </Grid>
            <Grid>
                <Item>Link B</Item>
            </Grid>
            <Grid>
                <Item>Link C</Item>
            </Grid>
            </Grid>
        </Grid>
        </Grid>
    </Box>
    </>)
}

export default EventDisplay