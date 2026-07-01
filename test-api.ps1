$r = Invoke-RestMethod 'http://localhost:3001/api/metal-rates'
Write-Host "gold22: $($r.gold22)"
Write-Host "gold24: $($r.gold24)"
Write-Host "gold18: $($r.gold18)"
Write-Host "silver: $($r.silver)"
Write-Host "timestamp: $($r.timestamp)"
