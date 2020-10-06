# ~/.config/autostart/youtube.desktop
# [Desktop Entry]
# Type=Application
# Exec=/home/pi/start-play.sh

export DISPLAY=:0
sh -c 'chromium-browser --incognito --app=https://youtubo.xyz?uid=1Vpsm4Yy --kiosk' &
cec-client | $HOME/cec-remote.sh
