@echo off
echo.
echo ============================================
echo   GitHub'a giris yapiliyor...
echo ============================================
echo.
echo Asagidaki sorulara su cevaplari ver (ok tuslari + Enter):
echo   1) GitHub.com
echo   2) HTTPS
echo   3) Yes (Y)
echo   4) Login with a web browser
echo.
echo Sonra ekranda 8 haneli kod cikacak.
echo Kopyala, Enter'a bas, tarayicida yapistir, Authorize de.
echo.
pause
gh auth login
echo.
echo ============================================
echo   Bitti! Bu pencereyi kapatabilirsin.
echo ============================================
pause
