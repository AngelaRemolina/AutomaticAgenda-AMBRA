// import dotenv from 'dotenv'; __x__
// dotenv.config({ path: '.env.example'}); __x__
// import connect from './database'; __x__
import app from './app';

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
  // connect(); __x__
});