@echo off
chcp 65001 >nul 2>&1
echo ========================================
echo    Cattle Detection Project Server
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

echo [SUCCESS] Python found
echo [START] Starting server...
echo.

REM Run the server
python server.py

echo.
echo [STOP] Server stopped
pause