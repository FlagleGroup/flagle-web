import './style.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export const Content = ({ children }) => {


  return (
    <Container maxWidth="sm">
      {/* <Box mt={2} pl={2} pr={2} className="Content"> */}
        {children}
      {/* </Box> */}
    </Container>
  )
}