import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ThrdMap = () => {
    const { t } = useTranslation();
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>


            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        {t("contacts.office1.heading")}
                    </Typography>

                    <Stack spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <PhoneIcon color="primary" />
                            <Typography>+7 (3952) 648-139</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <EmailIcon color="primary" />
                            <Typography>{t("contacts.office1.email")}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <WhatsAppIcon color="success" />
                            <Typography>+7(924) 626-33-40</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <LocationOnIcon color="primary" />
                            <Typography>{t("contacts.office1.address")}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <AccessTimeIcon color="primary" />
                            <Typography>{t("contacts.hours")}</Typography>
                        </Box>
                    </Stack>
                </Box>

                <Box sx={{ flex: 1, width: '100%', height: '400px', borderRadius: 2, overflow: 'hidden' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2426.685311905391!2d104.25624797669466!3d52.26127887202302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5da83b27b3d9d3a7%3A0x6b4a2f8d8b9e6f3b!2z0YPQuy4g0KDQsNC60LjRgtC90LDRjywgNCwg0JjRgNCy0YPQutGB0LrQsNGPLCDQmNCg0LrRg9GB0LrQsNGPLdCk0LDRgdGC0LjRjw!5e0!3m2!1sru!2stj!4v1719999999999!5m2!1sru!2stj"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Maps"
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default ThrdMap;