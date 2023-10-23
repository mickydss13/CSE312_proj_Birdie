FROM python:3.8

ENV  HOME /root

WORKDIR /root
ENV FLASK_APP server.py
ENV FLASK_ENV development
COPY . .
RUN apt update
RUN apt upgrade
RUN pip install -r requirements.txt
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD python3 -u server.py
