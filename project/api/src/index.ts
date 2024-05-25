import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import app from './app';


app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});