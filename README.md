
# 📦 Next.db
Next.db is a safe, simple, reliable, powerful and fast database based on better-sqlite3. It can be used by any user due to its simplicity and usability.

## 🪧 Features

- Simplicity for any user.
- Speed and performance
- Regular updates
- Cross platform
- Persistent data. Data is not erased on reboot.
- No need to build large and complex servers. The information is saved in the same project.
  
## 📚 Usage

```javascript
const nextdb = require('next.db');
 
// Setting an object in the database:
nextdb.set('userInfo', { difficulty: 'Easy' });
// -> { difficulty: 'Easy' }
 
// Pushing an element to an array (that doesn't exist yet) in an object:
nextdb.push('userInfo.items', 'Sword');
// -> { difficulty: 'Easy', items: ['Sword'] }
 
// Adding to a number (that doesn't exist yet) in an object:
nextdb.add('userInfo.balance', 500);
// -> { difficulty: 'Easy', items: ['Sword'], balance: 500 }
 
// Repeating previous examples:
nextdb.push('userInfo.items', 'Watch');
// -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 500 }
nextdb.add('userInfo.balance', 500);
// -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 1000 }
 
// Fetching individual properties
nextdb.get('userInfo.balance'); // -> 1000
nextdb.get('userInfo.items'); // ['Sword', 'Watch']
```

  
## 🔖 Installation

If you're having troubles installing, please follow [this troubleshooting guide](https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/troubleshooting.md).

- Windows & Linux
```bash
  npm install next.db
```

- MacOS
    - Install: XCode
    - Run: `npm i -g node-gyp in terminal`
    - Run: `node-gyp --python /path/to/python2.7` (skip this step if you didn't install python 3.x)
    - Run: `npm i next.db`
    
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

  