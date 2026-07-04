import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Prvl = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 4, color: 'text.secondary' }}
            >
                {t("common.back")}
            </Button>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 10 } }}>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>{t("prvl.rulesTitle")}</Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                        {t("prvl.rulesText")}
                    </Typography>

                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        {t("prvl.formHeading")}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 4 }}>
                        <Typography component="li" sx={{ mb: 1 }}>{t("prvl.listContact")}</Typography>
                        <Typography component="li" sx={{ mb: 1 }}>{t("prvl.listPhone")}</Typography>
                        <Typography component="li">{t("prvl.listAddress")}</Typography>
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{t("prvl.pickupTitle")}</Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                        {t("prvl.pickupText")}
                    </Typography>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        {t("prvl.cityDeliveryTitle")}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                        {t("prvl.cityDeliveryText")}
                    </Typography>

                    <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
                        {t("prvl.regionDeliveryTitle")}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                        {t("prvl.regionDeliveryText")}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Prvl;