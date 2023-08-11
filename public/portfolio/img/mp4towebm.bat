@echo off
for %%a in ("*.mp4" "*.mov" "*.mkv") do (
    ffmpeg -i "%%a" -c:v libvpx -b:v 1M -crf 10 -quality good -threads 4 -an "%%~na.webm"
)
pause
