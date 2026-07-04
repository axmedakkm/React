import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Stm = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const rateData = t("stm.rates", { returnObjects: true });

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ mb: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                >
                    {t("common.back")}
                </Button>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                {t("stm.title")}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {rateData.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'baseline' }}>
                        <Typography variant="body1" sx={{ mr: 1 }}>{item.label}</Typography>

                        {/* Хатти нуқтагӣ */}
                        <Box sx={{ flexGrow: 1, borderBottom: '1px dotted #ccc', mx: 1, mb: 0.5 }} />

                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{item.price}</Typography>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default Stm;