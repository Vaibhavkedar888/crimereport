package com.crime.backend.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Override
    protected String getDatabaseName() {
        // We can extract the DB name from the URI if needed, but "crime_db" is our default
        String uri = getConnectionString();
        if (uri.contains("/")) {
            String path = uri.substring(uri.lastIndexOf("/") + 1);
            if (path.contains("?")) {
                path = path.substring(0, path.indexOf("?"));
            }
            if (!path.isEmpty()) return path;
        }
        return "smart_crime_db";
    }

    private String getConnectionString() {
        String envUri = System.getenv("SPRING_DATA_MONGODB_URI");
        if (envUri == null || envUri.isEmpty()) {
            envUri = System.getProperty("spring.data.mongodb.uri");
        }
        return (envUri != null && !envUri.isEmpty()) ? envUri : "mongodb://localhost:27017/smart_crime_db";
    }

    @Override
    public MongoClient mongoClient() {
        String connectionString = getConnectionString();
        System.out.println(">>> MONGO-CONFIG: Using Connection URI: " + 
            (connectionString.contains("@") ? "REDACTED-ATLAS-LINK" : connectionString));
            
        MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
            .applyConnectionString(new ConnectionString(connectionString))
            .build();

        return MongoClients.create(mongoClientSettings);
    }
}
