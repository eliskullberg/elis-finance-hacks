import wbskid from "./../assets/wsbkid1.gif";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const TextBox = styled('div')({
  padding: 8,
  borderRadius: 4,
  alignItems: "center"
});


function Header(){
    return (
        <Grid container spacing={2} display={"flex"}>
            <Grid item>
                <img src={wbskid} width="100" alt="wbslogo" />
            </Grid>
            <Grid item>
                <TextBox>
                <Typography variant="h4">
                    Finance hacks
                </Typography>
                </TextBox>
            </Grid>
        </Grid>

    )

}

export default Header