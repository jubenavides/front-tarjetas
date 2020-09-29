import React from 'react';
import { Backdrop, CircularProgress, Typography } from '@material-ui/core';

const Loading = (props) => {
    const { loading } = props
    return (
        <Backdrop open={loading} style={{ zIndex: 1 }}>
            <div className="flex flex-row items-center loading__feedbackContainer">
                <Typography
                    variant="h5"
                    color="primary"
                >
                    {"Realizando Pago"}
                </Typography>
                <CircularProgress
                    color="primary"
                    thickness={8}
                    classes={{
                        root: 'ml-4'
                    }}
                />
            </div>
        </Backdrop>
    );
};

export default Loading;