import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

async function check() {
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();

  const dbs = await client.db().admin().listDatabases();
  console.log("=== Databases on this cluster ===");

  for (const d of dbs.databases) {
    if (["admin", "local", "config"].includes(d.name)) continue;
    const db = client.db(d.name);
    const collections = await db.listCollections().toArray();
    console.log(`\n📦 ${d.name}`);
    for (const c of collections) {
      const count = await db.collection(c.name).countDocuments();
      console.log(`   - ${c.name}: ${count} documents`);
    }
  }

  console.log("\n=== Config being used ===");
  console.log("AUTH_DB_NAME:", process.env.AUTH_DB_NAME ?? "(NOT SET → falls back)");
  console.log("URI db name:", process.env.MONGODB_URI!.split("/").pop()!.split("?")[0] || "(NONE → defaults to test)");

  await client.close();
}

check();