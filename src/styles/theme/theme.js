import { createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, cyan } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: cyan[800],
        },
        secondary: {
            main: lightBlue[600],
        },
    },
    typography: {
        fontFamily: 'Montserrat',
    },
});

export default theme