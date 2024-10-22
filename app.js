import dotenv from 'dotenv';
import server from './src/utils/server.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
