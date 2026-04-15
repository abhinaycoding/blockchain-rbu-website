Add-Type -AssemblyName System.Drawing

$src = "c:\Users\admin\Desktop\Blockchain webiste\blockchain-rbu-website\src\assets\logo.jpg"
$dst = "c:\Users\admin\Desktop\Blockchain webiste\blockchain-rbu-website\src\assets\logo-icon.png"

$img = [System.Drawing.Image]::FromFile($src)
Write-Host "Original: $($img.Width) x $($img.Height)"

$cropH = [int]($img.Height * 0.60)
$srcRect = New-Object System.Drawing.Rectangle(0, 0, $img.Width, $cropH)
$bmp = New-Object System.Drawing.Bitmap($img.Width, $cropH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$dstRect = New-Object System.Drawing.Rectangle(0, 0, $img.Width, $cropH)
$g.DrawImage($img, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$img.Dispose()
$bmp.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "Saved PNG: $dst"
