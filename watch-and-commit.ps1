# ファイル変更を監視して自動コミット・プッシュを行うPowerShellスクリプト

# 監視対象のディレクトリ
$directoryToWatch = "."
# 監視間隔（秒）
$watchInterval = 60

Write-Host "ファイル変更の監視を開始します..."
Write-Host "監視対象: $directoryToWatch"
Write-Host "監視間隔: ${watchInterval}秒ごと"
Write-Host "終了するには Ctrl+C を押してください"
Write-Host "-----------------------------------"

while ($true) {
    # auto-commit.ps1を実行
    & "$PSScriptRoot\auto-commit.ps1"
    
    # 指定した間隔だけ待機
    Start-Sleep -Seconds $watchInterval
} 