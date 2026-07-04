import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Politic() {
  const { t } = useTranslation();
  const sections = t("politic.sections", { returnObjects: true });
  return (
    <Box className="max-w-[1200px] mx-auto px-4 py-10 md:py-16 text-[#333]">
      <Typography variant="h4" sx={{marginBottom:"50px"}} className="font-bold text-[26px] md:text-[30px]">
        {t("politic.title")}
      </Typography>

      <Box className="flex flex-col gap-8">
        {sections.map((item, index) => (
          <section key={index}>
            <Typography variant="h6" style={{fontWeight:"700"}} className="font-bold mb-3 text-[16px] md:text-[18px]">
              {item.title}
            </Typography>
            <Typography variant="body1" className="leading-relaxed text-[14px] md:text-[16px] text-gray-700 whitespace-pre-line">
              {item.content}
            </Typography>
          </section>
        ))}
      </Box>
    </Box>
  );
}