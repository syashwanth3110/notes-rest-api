# Notebooks Backend API

A REST API service for managing notebooks built with Express.js and MongoDB.

## Project Overview

This service provides backend functionality for a notebooks application, allowing users to store and manage their notes. The application is containerized using Docker and includes both the API service and a MongoDB database.

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework for the API
- **MongoDB**: NoSQL database for data storage
- **Docker**: Containerization platform
- **Docker Compose**: Multi-container Docker application orchestration

## Setup Instructions

### Prerequisites

- Docker and Docker Compose installed on your system
- Node.js (for local development without Docker)

### Environment Setup

1. The project uses environment variables defined in the `.env` file. Make sure this file contains:

```
MONGODB_INITDB_ROOT_USERNAME=root
MONGODB_INITDB_ROOT_PASSWORD=rootpassword
NOTEBOOKS_DB_USER=notebooks
NOTEBOOKS_DB_PASSWORD=notebooks_password
NOTEBOOKS_DB_NAME=notebooks_db
```

You may want to change these values for production environments.

### Starting the Application

Using Docker Compose:

```bash
docker compose up --build
```

The application will be available at http://localhost:3000

For development with automatic reloading:

```bash
docker compose up --build --watch
```

## Project Structure

```
notebooks-backend/
├── db-config/                  # Database configuration
│   └── mongo-init.js           # MongoDB initialization script
├── src/                        # Source code directory
│   └── server.js               # Main application file
├── .env                        # Environment variables
├── compose.yaml                # Docker Compose configuration
├── Dockerfile.dev              # Development Dockerfile
├── package.json                # Node.js dependencies
└── README.md                   # This file
```

## API Endpoints

Currently implemented endpoints:

- `GET /`: Returns a welcome message

Additional endpoints will be implemented as the project evolves.

## Database

The application uses MongoDB as its database. The connection is established using the environment variables:

- `NOTEBOOKS_DB_USER`: Database username
- `NOTEBOOKS_DB_PASSWORD`: Database password
- `NOTEBOOKS_DB_NAME`: Database name

## Development Workflow

The Docker Compose configuration includes a development setup that watches for changes in the `src` directory and automatically syncs them to the running container.

## License

ISC
