# Etapa 1: build con JDK 21
FROM eclipse-temurin:21-jdk-jammy AS builder
WORKDIR /app

# Copiar wrapper y pom
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copiar código y empaquetar
COPY src src
RUN ./mvnw package -DskipTests

# Etapa 2: runtime con JRE 21
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copiar el JAR generado
COPY --from=builder /app/target/*.jar app.jar

# Exponer puerto (ajusta según microservicio)
# countries => 8080, states => 8081, user => 8082
EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]