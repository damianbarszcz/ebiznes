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
    build-essential \
    libssl-dev \
    libffi-dev \
    zlib1g-dev \
    && apt-get clean

# Instalacja Pythona 3.8
RUN cd /usr/src && \
    wget https://www.python.org/ftp/python/3.8.10/Python-3.8.10.tgz && \
    tar xzf Python-3.8.10.tgz && \
    cd Python-3.8.10 && \
    ./configure --enable-optimizations && \
    make altinstall

# Instalacja OpenJDK 8
RUN apt-get install -y openjdk-8-jdk

# Instalacja Kotlin
RUN wget -O kotlin-compiler.zip https://github.com/JetBrains/kotlin/releases/download/v1.5.31/kotlin-compiler-1.5.31.zip && \
    unzip kotlin-compiler.zip -d /opt && \
    rm kotlin-compiler.zip

RUN useradd -ms /bin/bash dbarszcz
RUN adduser dbarszcz sudo

USER dbarszcz
WORKDIR /home/dbarszcz/ebiznes

CMD bash -c "python3.8 --version && java -version && /opt/kotlinc/bin/kotlinc -version"