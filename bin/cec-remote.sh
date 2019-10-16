#!/bin/bash
# Inspired by https://ubuntu-mate.community/t/controlling-raspberry-pi-with-tv-remote-using-hdmi-cec/4250
# Tested on Philips TV connected to Raspaberry Pi.
# Running `cec-client | ./cec-remote.sh` with the chromium browser visiting https://solna.xyz
# in full screen mode, you will get full STB experience.

while read oneline
do
    keyline=$(echo $oneline | grep " key released")
    #echo $keyline --- debugAllLines
    if [ -n "$keyline" ]; then
        strpressed=$(echo $keyline | cut -d':' -f3 | cut -d' ' -f2)
        echo "$keyline <--> $strpressed" # --- debug
        case "$strpressed" in
            "up")
                xdotool key Up
                ;;
            "down")
                xdotool key Down
                ;;
            "left")
                xdotool key Left
                ;;
            "right")
                xdotool key Right
                ;;
            "select")
                xdotool key Return
                ;;
            "exit")
                xdotool key Escape
                ;;
            "F2")
                sudo shutdown --poweroff now
                ;;
            "F1")
                sudo reboot
                ;;
            *)
                echo "Unrecognized Key Pressed: $strkey ; CEC Line: $keyline"
                ;;
        esac
    fi
done
