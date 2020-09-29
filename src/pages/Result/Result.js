import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';

import successPayment from '../../assets/animations/10447-payment-success.json';
import failedPayment from '../../assets/animations/10448-payment-failed-error.json';
import { Button, Grid, Typography } from '@material-ui/core';

const Result = () => {
    const location = useLocation()
    const history = useHistory()
    const [success, setSuccess] = React.useState(undefined)
    React.useEffect(() => {
        if (location.state) {
            if (location.state.success !== undefined) {
                setSuccess(location.state.success)
            }
        }
    }, [])
    return (
        <React.Fragment>
            {
                success !== undefined ?
                    <div>
                        <Lottie
                            options={{
                                animationData: success ? successPayment : failedPayment,
                                loop: false
                            }}
                            width={300}
                            height={300}
                        />
                        <Typography
                            variant="h4"
                            align="center"
                        >
                            {success ? "Pago realizado!" : "No se pudo realizar el pago..."}
                        </Typography>
                        {
                            !success ?
                                <Grid
                                    container
                                    justify="center"
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        classes={{
                                            root: 'mt-5'
                                        }}
                                        onClick={() => history.goBack()}
                                    >
                                        {"Intentar de nuevo"}
                                    </Button>
                                </Grid>
                                : undefined
                        }
                    </div>
                    :
                    undefined
            }
        </React.Fragment>
    );
};

export default Result;