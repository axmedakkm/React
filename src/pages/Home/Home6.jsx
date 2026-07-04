import { Button } from '@mui/material'
import { NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'
export default function Home6() {
  const { t } = useTranslation();
  return (
    <>
      <div className='max-w-[1200px] m-auto flex justify-center p-[10px]'>
        <NavLink to="/catalog">
          <Button sx={{ backgroundColor: "#287FE8", marginTop: '10px', width: '200px' }} variant="contained">{t("home.showMore")}</Button>
        </NavLink>
      </div>
    </>
  )
}
