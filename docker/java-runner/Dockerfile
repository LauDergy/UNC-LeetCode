FROM eclipse-temurin:21-jdk

WORKDIR /runner
COPY run-java.sh /runner/run-java.sh
RUN chmod +x /runner/run-java.sh

ENTRYPOINT ["/runner/run-java.sh"]
