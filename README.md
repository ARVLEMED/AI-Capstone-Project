# 🌟 Daily Mood Tracker

A minimalistic Spring Boot application that helps you track your daily mood and gain insights into your emotional well-being over time.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green)
![H2 Database](https://img.shields.io/badge/Database-H2-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **Daily Mood Logging**: Rate your mood on a 1-10 scale with optional notes
- **Mood Statistics**: View your average rating and count of good days
- **Mood History**: Track your emotional journey over the past week
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: See your stats update immediately after logging
- **Clean REST API**: Well-structured endpoints for potential integrations

## 🚀 Getting Started

### Prerequisites

- **Java 17** or higher
- **Maven 3.6+** (or use the included Maven wrapper)
- **VS Code** with Java Extension Pack (recommended)

### Installation

1. **Clone or download the project**
   ```bash
   git clone git@github.com:ARVLEMED/AI-Capstone-Project.git
   cd daily-mood-tracker
   ```

2. **Verify Java installation**
   ```bash
   java -version
   # Should show Java 17 or higher
   ```

3. **Run the application**
   ```bash
   # Using Maven wrapper (recommended)
   ./mvnw spring-boot:run
   
   # Or using global Maven
   mvn spring-boot:run
   ```

4. **Access the application**
   - Web Interface: http://localhost:8080
   - H2 Database Console: http://localhost:8080/h2-console
   - API Base URL: http://localhost:8080/api

### VS Code Setup

1. Install the **Extension Pack for Java**
2. Install the **Spring Boot Extension Pack**
3. Open the project folder in VS Code
4. Click the "Run" button above the main method in `MyFirstAppApplication.java`

## 📱 Usage

### Web Interface

1. **Log Your Mood**: Select a rating from 1-10 and optionally add a note
2. **View Stats**: See your average mood and good days count
3. **Check History**: View your mood entries from the past week
4. **Update Today's Mood**: Modify your current day's entry anytime

### Mood Scale Reference

- **1-2**: Very low mood 😢
- **3-4**: Low mood 😞
- **5-6**: Neutral mood 😐
- **7-8**: Good mood 🙂
- **9-10**: Excellent mood 😊

## 🔌 API Endpoints

### Mood Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/mood` | Log today's mood |
| `GET` | `/api/mood/today` | Get today's mood entry |
| `GET` | `/api/mood/history?days=7` | Get mood history |
| `GET` | `/api/mood/stats` | Get mood statistics |

### API Examples

**Log a mood:**
```bash
curl -X POST http://localhost:8080/api/mood \
  -H "Content-Type: application/json" \
  -d '{"rating": 8, "note": "Had a great day coding!"}'
```

**Get mood statistics:**
```bash
curl http://localhost:8080/api/mood/stats
```

**Response example:**
```json
{
  "averageRating": 7.5,
  "goodDaysCount": 15,
  "period": "Last 30 days"
}
```

## 🏗️ Project Structure

```
src/
├── main/
│   ├── java/com/example/myfirstapp/
│   │   ├── MyFirstAppApplication.java     # Main Spring Boot class
│   │   ├── controller/
│   │   │   └── MoodController.java        # REST API endpoints
│   │   ├── service/
│   │   │   └── MoodService.java           # Business logic
│   │   ├── repository/
│   │   │   └── MoodRepository.java        # Data access layer
│   │   └── model/
│   │       └── Mood.java                  # Entity class
│   └── resources/
│       ├── application.properties         # Configuration
│       └── static/                        # Web assets
│           ├── index.html                 # Main page
│           ├── css/style.css             # Styles
│           └── js/app.js                 # JavaScript logic
└── test/                                 # Unit tests
```

## ⚙️ Configuration

### Database Configuration

The app uses H2 in-memory database by default. Configuration in `application.properties`:

```properties
# H2 Database
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=password
spring.h2.console.enabled=true

# JPA Settings
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
```

### Custom Port

To run on a different port:

```properties
server.port=8081
```

### Production Database

For production, replace H2 with PostgreSQL or MySQL:

```properties
# PostgreSQL example
spring.datasource.url=jdbc:postgresql://localhost:5432/moodtracker
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## 🧪 Testing

### Manual Testing

1. Start the application
2. Visit http://localhost:8080
3. Test mood logging functionality
4. Verify API endpoints work correctly

### Database Inspection

Access H2 console at http://localhost:8080/h2-console:
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (leave empty)

## 🔧 Development

### Hot Reload

Thanks to Spring Boot DevTools, the application automatically restarts when you make changes to:
- Java source code
- Configuration files
- Static resources

### Adding New Features

The project follows standard Spring Boot patterns:

1. **Add Entity**: Create new models in `model/` package
2. **Create Repository**: Add data access interfaces in `repository/`
3. **Implement Service**: Add business logic in `service/`
4. **Create Controller**: Add REST endpoints in `controller/`

### Code Style

- Follow Java naming conventions
- Use meaningful variable and method names
- Add comments for complex business logic
- Keep controllers thin, services thick

## 📊 Key Learning Concepts

This project demonstrates essential Spring Boot concepts:

- **Dependency Injection**: Automatic bean wiring with `@Autowired`
- **JPA/Hibernate**: Database operations with Spring Data JPA
- **REST APIs**: RESTful web services with `@RestController`
- **Auto-configuration**: Spring Boot's opinionated defaults
- **Static Resources**: Serving HTML, CSS, and JavaScript files
- **Application Properties**: External configuration management

## 🚧 Troubleshooting

### Common Issues

**Port 8080 already in use:**
```bash
# Check what's using the port
sudo lsof -i :8080

# Change port in application.properties
server.port=8081
```

**Maven wrapper not executable:**
```bash
chmod +x mvnw
```

**Java version issues:**
```bash
# Check Java version
java -version

# Set JAVA_HOME if needed
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
```

**Dependencies not downloading:**
```bash
# Clean and reinstall
./mvnw clean install
```

### Logs and Debugging

- Check console output for error messages
- Enable debug logging: `logging.level.com.example.capstoneproject=DEBUG`
- Use VS Code debugger with breakpoints
- Monitor H2 console for database issues

## 🔮 Future Enhancements

Potential features to add:

- **User Authentication**: Multiple user support with login/signup
- **Data Export**: Export mood data to CSV or JSON
- **Mood Patterns**: Advanced analytics and trend detection
- **Reminders**: Daily mood logging notifications
- **Mood Categories**: Tag moods with activities or events
- **Data Visualization**: Charts and graphs for mood trends
- **REST API Documentation**: Swagger/OpenAPI integration
- **Mobile App**: React Native or Flutter companion app

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have questions or run into issues:

1. Check the troubleshooting section above
2. Review Spring Boot documentation: https://spring.io/projects/spring-boot
3. Search existing issues or create a new one
4. Join Spring Boot community forums

---

**Happy mood tracking! 🌈**

Built with using Spring Boot, Java, and modern web technologies.