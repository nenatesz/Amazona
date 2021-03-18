export default {
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/amazona",
    JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
    PORT: process.env.PORT || 5000
}