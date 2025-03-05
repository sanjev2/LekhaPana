export class PUBLIC_DATA {
  static port = process.env.PORT || 4000

  // Option 1: Using connection string
  static postgres_uri = process.env.POSTGRES_URI || "postgresql://postgres:pipupapa@localhost:5432/inventory"

  // Option 2: Using separate configuration
  static DB_HOST = process.env.DB_HOST || "localhost"
  static DB_PORT = process.env.DB_PORT || 5432
  static DB_USER = process.env.DB_USER || "postgres"
  static DB_PASSWORD = process.env.DB_PASSWORD || "123"
  static DB_NAME = process.env.DB_NAME || "inventory"

  static jwt_auth = process.env.JWT_AUTH || "@#$%^&*(@#$%^&*($%^))#$%^&"
}

