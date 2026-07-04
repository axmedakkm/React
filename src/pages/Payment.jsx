import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DescriptionIcon from '@mui/icons-material/Description';

const Payment = () => {
  const { t } = useTranslation();
  const icons = [
    <QrCode2Icon key="qr" fontSize="large" color="primary" />,
    <WalletIcon key="wallet" fontSize="large" color="primary" />,
    <DescriptionIcon key="description" fontSize="large" color="primary" />,
  ];
  const paymentMethods = t("payment.methods", { returnObjects: true }).map((item, index) => ({
    ...item,
    icon: icons[index],
  }));
  const requisites = t("payment.requisites", { returnObjects: true });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{t("payment.breadcrumb")}</Typography>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 6 }}>{t("payment.title")}</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 6 }}>
        <Stack spacing={4}>
          {paymentMethods.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2 }}>
              <Box>{item.icon}</Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        <Box sx={{display:"flex",flexDirection:"column",gap:"30px"}}>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {t("payment.text1")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {t("payment.text2")}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>{t("payment.requisitesTitle")}</Typography>
          <Stack spacing={1} sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
            {requisites.map((line, index) => (
              <Typography variant="body2" key={index}>{line}</Typography>
            ))}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Payment;