# ファイル変更を自動コミット・プッシュするPowerShellスクリプト

$commitMessage = "自動コミット: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# ファイル変更を確認
$status = git status --porcelain

if ($status) {
    Write-Host "変更を検出しました。コミットを開始します..."
    
    # 変更をステージングエリアに追加
    git add .
    
    # コミット
    git commit -m $commitMessage
    
    # リモートリポジトリにプッシュ
    git push
    
    Write-Host "コミットとプッシュが完了しました。"
} else {
    Write-Host "変更はありません。"
} 