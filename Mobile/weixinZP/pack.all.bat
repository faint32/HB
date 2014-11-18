for /f %%i in (pack.list.txt) do type %%i >> js\pack.all.js

java -jar F:\tools\yuicompressor-2.4.6\build\yuicompressor-2.4.6.jar --type js --charset utf-8 js\pack.all.js -o js\pack.all.min.js

pause & exit