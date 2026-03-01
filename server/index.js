app.use(
  cors({
    origin: function (origin, callback) {
      // Разрешённые домены
      const allowedOrigins = [
        process.env.CLIENT_URL,
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5174"
      ].filter(Boolean); 

  
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);