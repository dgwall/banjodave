for %%f in (*.png) do "cwebp.exe" -q 80 "%%f" -o "%%~nf.webp"