import dotenv from 'dotenv';
dotenv.config({ path: '.env.example' });
import app from './app';
// import { } from "./shared/custom/global.d";

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});