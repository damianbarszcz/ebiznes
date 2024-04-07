FROM ubuntu:latest

ENV TZ=Europe/Warsaw
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y \
    software-properties-common \
    wget \
    curl \
    zip \
    unzip \
    && apt-get clean

# Instalacja Pythona 3.8
RUN add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && \
    apt-get install -y python3.8

# Instalacja OpenJDK 8
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk

# Instalacja Kotlina
RUN apt-get install -y kotlin
# Utwórz plik build.txt z wersją Kotlina
RUN echo "1.5.31" > /usr/share/kotlin/kotlinc/build.txt

# Instalacja Gradle
RUN wget https://services.gradle.org/distributions/gradle-7.3.3-bin.zip -P /tmp && \
    unzip -d /opt/gradle /tmp/gradle-*.zip && \
    rm -f /tmp/gradle-*.zip

# Utwórz projekt Gradle
RUN mkdir -p /home/dbarszcz/ebiznes
WORKDIR /home/dbarszcz/ebiznes
RUN /opt/gradle/gradle-*/bin/gradle init --type java-application

# Dodaj paczkę JDBC SQLite do pliku build.gradle
RUN echo 'implementation "org.xerial:sqlite-jdbc:3.34.0"' >> build.gradle

RUN useradd -ms /bin/bash/ dbarszcz
RUN adduser dbarszcz sudo 

USER dbarszcz
WORKDIR /home/dbarszcz/ebiznes

CMD bash -c "python3 --version && java -version && cd / && kotlin -version && /opt/gradle/gradle-*/bin/gradle --version && cat build.gradle"
