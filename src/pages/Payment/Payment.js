import React from 'react';
import { Paper, Typography, TextField, MenuItem, Grid, InputAdornment, Button, Grow } from '@material-ui/core';
import CreditCardInput from 'react-credit-card-input';
import { cyan } from '@material-ui/core/colors';
import { useValues } from '../../hooks';

import { BANKS_OPTIONS, IDENTIFICATION_OPTIONS, IDENTIFICATION_TYPES } from '../../lib'
import { isNumeric, isValidAmount } from '../../lib/util/validations/number';
import Loading from '../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';

const axios = require('axios').default;

const Payment = () => {
    const { values, updateValues, resetValues } = useValues()
    const history = useHistory()
    const [loading, setLoading] = React.useState(false)
    const handleChange = (key, value) => updateValues(key, value)
    const handleSumbit = async () => {
        console.log(values)
        setLoading(true)
        try {
            const options = {
                method: 'post',
                headers: { 'content-type': 'application/json', 'apikey': 'VGSjENY6TtHJiC5httlxBL6zbQajkllR' },
                data: values,
                url: 'https://benavidesjoseinf-eval-test.apigee.net/tarjetasoap/pagotarjeta',
            };
            const response = await axios(options);
            console.log(response.data.pagoTarjetaResponse.return);
            resetValues()
            history.push({
                pathname: "result",
                state: { success: response.data.pagoTarjetaResponse.return }
            })
        } catch (error) {
            resetValues()
            history.push({
                pathname: "result",
                state: { success: false }
            })
        }
    }
    const handleAmout = (value) => { if (isValidAmount(value)) handleChange("amount", value) }
    const handleReset = () => resetValues()
    React.useEffect(() => {
        if (values.identification && values.identificationType && values.identification.length > 10) {
            updateValues("identification", values.identification.substring(0, 10))
        }
    }, [values])
    return (
        <Grid
            xs={10}
            md={6}
            lg={4}
        >
            <div
                style={{
                    position: 'absolute',
                    height: '35vh',
                    width: '100vw',
                    bottom: 0,
                    backgroundColor: cyan[700],
                    left: 0,
                    zIndex: -1
                }}
            />
            <Typography
                variant="h4"
                color="primary"
                align="center"
            >
                {"Información de pago"}
            </Typography>
            <Grow
                in={true}
                {...({ timeout: 1500 })}
            >
                <Paper
                    elevation={4}
                    classes={{
                        root: 'p-4 mt-5'
                    }}
                >
                    <Grid
                        direction="column"
                        spacing={2}
                        item
                        container
                    >
                        <Grid item>
                            <TextField
                                id="identificationType"
                                select
                                label="Tipo identificación"
                                fullWidth
                                required
                                size="small"
                                variant="outlined"
                                value={values.identificationType !== undefined ? values.identificationType : ""}
                            >
                                {IDENTIFICATION_OPTIONS.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                        onClick={() => {
                                            handleChange("identificationType", option.value)
                                        }}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="identification"
                                label="Identificación"
                                placeholder={values.identificationType !== undefined ? values.identificationType === IDENTIFICATION_TYPES.idCard ? "17XXXXXXXX" : "17XXXXXXXX001" : undefined}
                                fullWidth
                                InputProps={{
                                    inputProps: {
                                        maxLength: values.identificationType === IDENTIFICATION_TYPES.idCard ? 10 : 13,
                                    }
                                }}
                                disabled={values.identificationType === undefined}
                                required
                                size="small"
                                variant="outlined"
                                value={values.identification ? values.identification : ""}
                                onChange={(event) => {
                                    if (isNumeric(event.target.value)) {
                                        handleChange("identification", event.target.value)
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="bank"
                                select
                                label="Banco"
                                fullWidth
                                required
                                value={values.bank !== undefined ? values.bank : ""}
                                size="small"
                                variant="outlined"
                            >
                                {BANKS_OPTIONS.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                        onClick={() => {
                                            handleChange("bank", option.value)
                                        }}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item>
                            <CreditCardInput
                                customTextLabels={{
                                    invalidCardNumber: 'El número de la tarjeta es inválido',
                                    cardNumberPlaceholder: 'Número de tarjeta',
                                }}
                                containerClassName="payment__cardContainer"
                                cardNumberInputProps={{ value: values.cardNumber ? values.cardNumber : "", onChange: (e) => handleChange("cardNumber", e.target.value) }}
                                cardExpiryInputRenderer={() => <div/>}
                                cardCVCInputRenderer={() => <div/>}
                                dangerTextClassName="display-none"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="amount"
                                label="Monto"
                                fullWidth
                                required
                                size="small"
                                variant="outlined"
                                value={values.amount ? values.amount : ""}
                                placeholder={"00.00"}
                                InputProps={{
                                    endAdornment: <InputAdornment>USD $</InputAdornment>,
                                }}
                                onChange={(event) => handleAmout(event.target.value)}
                            />
                        </Grid>
                        <Grid
                            item
                            container
                            justify="center"
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleReset}
                            >
                                {"Cancelar"}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                classes={{
                                    root: 'ml-4'
                                }}
                                onClick={handleSumbit}
                            >
                                {"Pagar"}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grow>
            <Loading
                loading={loading}
            />
        </Grid>
    );
};

export default Payment;