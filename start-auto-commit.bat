@echo off
echo 自動コミット・プッシュ監視を開始します...
powershell -ExecutionPolicy Bypass -File "%~dp0watch-and-commit.ps1"
pause 