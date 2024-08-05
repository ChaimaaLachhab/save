FROM openjdk:21
EXPOSE 8080
ADD target/events.jar events.jar
ENTRYPOINT ["java", "-jar", "/events.jar"]