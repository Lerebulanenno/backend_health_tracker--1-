import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { WebSocketServer } from "ws";
import { typeDefs } from "./type/index.js";
import { resolvers } from "./resolver/index.js";
import db from "./db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

db.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal: ", err);
  } else {
    console.log("✅ Terhubung ke database");
  }
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");
    let user = null;

    if (token) {
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.warn("Token tidak valid:", err.message);
      }
    }

    return { user };
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`🚀 GraphQL Server ready at ${url}`);

// 🔸 WebSocket Server
const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
  console.log("🔌 Client WebSocket connected");

  const interval = setInterval(() => {
    const reminder = {
      type: "reminder",
      message: "💧 Waktunya minum air!",
      timestamp: new Date().toISOString(),
    };
    ws.send(JSON.stringify(reminder));
  }, 3600000); // 1 jam

  ws.on("close", () => {
    console.log("❌ Client WebSocket disconnected");
    clearInterval(interval);
  });
});

console.log(`📡 WebSocket Server running at ws://localhost:3001`);
