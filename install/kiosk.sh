#--window-size=1024,768 \
#--kiosk \
#--start-fullscreen \

chromium \
--incognito \
--disable-infobars \
--noerrdialogs \
--disable-crash-report \
--start-maximized \
--window-position=0,0 \
--ignore-certificate-errors \
--test-type \
--disable-web-security \
--unsafely-treat-insecure-origin-as-secure=http://photo-booth.local \
http://photo-booth.local/