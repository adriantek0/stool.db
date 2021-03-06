
# 📦 stool.db
stool.db is a safe, simple, reliable, powerful and fast database based on better-sqlite3. It can be used by any user due to its simplicity and usability.

## 📋 Features

- Simplicity for any user.
- Speed and performance
- Regular updates
- Cross platform
- Persistent data. Data is not erased on reboot.
- No need to build large and complex servers. The information is saved in the same project.
  
## 📚 Usage

```javascript
const db = require('stool.db');
 
// Setting an object in the database:
db.set('userInfo', { difficulty: 'Easy' });
// -> { difficulty: 'Easy' }
 
// Pushing an element to an array (that doesn't exist yet) in an object:
db.push('userInfo.items', 'Sword');
// -> { difficulty: 'Easy', items: ['Sword'] }
 
// Adding to a number (that doesn't exist yet) in an object:
db.add('userInfo.balance', 500);
// -> { difficulty: 'Easy', items: ['Sword'], balance: 500 }
 
// Repeating previous examples:
db.push('userInfo.items', 'Watch');
// -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 500 }
db.add('userInfo.balance', 500);
// -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 1000 }
 
// Fetching individual properties
db.get('userInfo.balance'); // -> 1000
db.get('userInfo.items'); // ['Sword', 'Watch']
```

## 🔒 Methods

- new db.table(name)
- .add(key, number, [options]) -> updatedRow
- .all() -> array
- .delete(key, [options]) -> boolean
- .get(key, [options]) -> row
- .has(key, [options]) -> boolean
- .push(key, element, [options]) -> updatedRow
- .set(key, data, [options]) -> updatedRow
- .subtract(key, number, [options]) -> updatedRow

  
## 🔖 Installation

If you're having troubles installing, please follow [this troubleshooting guide](https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/troubleshooting.md).

- Windows & Linux
```bash
  npm install stool.db
```

- MacOS
    - Install: XCode
    - Run: `npm i -g node-gyp in terminal`
    - Run: `node-gyp --python /path/to/python2.7` (skip this step if you didn't install python 3.x)
    - Run: `npm i stool.db`