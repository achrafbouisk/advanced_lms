import { app } from "./app";
import { connectDB } from "./utils/db";

// Create server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is connected in port: ${PORT}`);
  connectDB();
});
