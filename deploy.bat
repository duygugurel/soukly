@echo off
cd /d "%~dp0"
echo.
echo ============================================
echo   SouklyClub - Deploy to Vercel
echo ============================================
echo.
git add .
git commit -m "Update %date% %time%"
git push
echo.
echo ============================================
echo   Done! Vercel will deploy in ~1 minute.
echo   Check: https://soukly-ecru.vercel.app/
echo ============================================
echo.
pause
