# Usar una imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Configurar el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo JAR al contenedor
COPY target/*.jar app.jar

# Exponer el puerto en el que se ejecutará la aplicación (por defecto Spring usa 8080)
EXPOSE 8080

# Copiar los archivos del proyecto al contenedor
COPY . .

# Compilar el proyecto y generar el archivo .jar
RUN ./mvnw clean package -DskipTests

# Exponer el puerto 8080
EXPOSE 8080

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "target/capx-0.0.1-SNAPSHOT.jar"]
