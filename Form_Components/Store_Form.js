import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'xDayEntries.db', location: 'default' });

function formatThanks(tx,mainId,newArray, prevArray){
  tx.executeSql(`CREATE TABLE IF NOT EXISTS appreciation_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    main_table_id INTEGER,
    status TEXT,
    name TEXT,
    thanks TEXT,
    FOREIGN KEY (main_table_id) REFERENCES entries(id) ON DELETE CASCADE
    )`,[],() => {
      console.log('Appreciations Table created or already exists');
      newArray.filter(item => item.name != "").forEach(item => {
        tx.executeSql(
          'INSERT INTO appreciation_table (main_table_id, status, name, thanks) VALUES (?, ?, ?, ?)',
          [mainId, item.status, item.name, item.thanks]
        );
      });
    },error => {
        console.log('Error creating table:', error);
      }
    );
}

function formatTasks(tx,newArray,prevArray,futureArray){

}

function handleMaxEntries(){

}

function getThanks(amount) {
  return new Promise((resolve, reject) => {
    let found = [];
    console.log(`Looking for Old Appreciations`);

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM appreciation_table',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            console.log(`Found ${results.rows.length} Appreciations`);
            for (let i = 0; i < results.rows.length; i++) {
              found.push(results.rows.item(i));
            }
            console.log(`Output found: ${found}`);
            resolve(found);  // Resolve the Promise with the found data
          } else {
            console.log(`WARNING: Found No Old Appreciations`);
            resolve(found);  // Resolve with an empty array
          }
        },
        error => {
          console.log('Error executing SQL', error);
          reject(error);  // Reject the Promise if there's an error
        }
      );
    });
  });
}

function storeForm(entry){
    //for debuggin purpposes
    /*
    db.transaction(tx => {
        tx.executeSql('DROP TABLE IF EXISTS entries');
      });
    db.transaction(tx => {
        tx.executeSql('DROP TABLE IF EXISTS appreciation_table');
      });
    */
    const writeOverBool = true;
    db.transaction(tx => {
        // Step 1: Create the table (if it doesn't already exist)
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT, 
            day TEXT, 
            heal TEXT, 
            mathAdd TEXT, 
            mathSubtract TEXT, 
            mathMultiply TEXT, 
            mathDivide TEXT, 
            selectedMath TEXT, 
            why TEXT, 
            whynot TEXT
          )`,
          [], // No values needed for table creation
          () => {
            console.log('Entries Table created or already exists');
            tx.executeSql(
            'SELECT * FROM entries WHERE date = ?',
            [entry.date],
            (tx, results) => {
            if (results.rows.length > 0) {
                //writeOverBool = false
                //If write over true delete these dates
                console.log('Entry with the same date already exists');
            }
            if(writeOverBool) {
            tx.executeSql(
              `INSERT INTO entries (date, day, heal, mathAdd, mathSubtract, mathMultiply, mathDivide, selectedMath, why, whynot) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                entry.date, 
                entry.day, 
                entry.heal, 
                entry.lifeMath['+'],  // Addition value
                entry.lifeMath['-'],  // Subtraction value
                entry.lifeMath['*'],  // Multiplication value
                entry.lifeMath['÷'],  // Division value
                entry.selectedMath, 
                entry.explore.why, 
                entry.explore.whynot
              ],
              (tx, results) => {
                console.log('Form entry added');
                const mainId = results.insertId;
                formatThanks(tx,mainId,entry.appreciations,entry.previousAppreciations);
                formatTasks(tx,mainId,entry.tasks,entry.previousTasks,entry.futureTasks);
                handleMaxEntries(); // Assuming this is a function you've defined
              },
              error => {
                console.log('Error inserting form entry:', error);
              }
            );

            
            
          }
        },
        error => {
          console.log('Error checking for existing entry:', error);
        }
      );
    },
    error => {
      console.log('Error creating table:', error);
    }
  );
    
    });
}

export {storeForm, getThanks};