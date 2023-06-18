# Start with a base image.
FROM openjdk:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy the jar file to the container
COPY build/libs/*.jar /app/

# Expose the port the app will run on
EXPOSE 8080

# Set any environment variables needed by the app
ENV SPRING_PROFILES_ACTIVE=production

# Start the app
CMD ["java", "-jar", "/app/app.jar"]