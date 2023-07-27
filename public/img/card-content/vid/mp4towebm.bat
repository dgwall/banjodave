@echo off
for %%a in ("*.mp4" "*.mov" "*.mkv") do (
    ffmpeg -i "%%a" -c:v libvpx -c:a libvorbis "%%~na.webm"
)
pause
