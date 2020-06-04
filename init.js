import app from './app.js';
import './db.js';

// Models
import './models/User.js'

app.listen(3389, () => console.log(`✅  Listening on: http://49.50.175.145:33989`));
