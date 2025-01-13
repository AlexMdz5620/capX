# Usar una imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Configurar el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY . .

# Otorgar permisos de ejecución al Maven Wrapper
RUN chmod +x ./mvnw

# Descargar Maven Wrapper y compilar el proyecto
RUN ./mvnw clean package -DskipTests

# Exponer el puerto en el que se ejecutará la aplicación (por defecto Spring usa 8080)
EXPOSE 8080

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "target/capX-0.0.1-SNAPSHOT.jar"]
