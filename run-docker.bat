@echo off

docker build -t sensors-web .
docker run -p 127.0.0.1:80:80 sensors-web
