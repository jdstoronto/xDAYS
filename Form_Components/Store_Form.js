import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'xDayEntries.db', location: 'default' });

function formatThanks(newArray, prevArray){

}

function formatTasks(newArray,prevArray,futureArray){

}

function handleMaxEntries(){

}

function storeForm(entry){
    //for debuggin purpposes
    db.transaction(tx => {
        tx.executeSql('DROP TABLE IF EXISTS entries');
      });
    
    const writeOver = false;
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
            console.log('Table created or already exists');
            tx.executeSql(
            'SELECT * FROM entries WHERE date = ?',
            [entry.date],
            (tx, results) => {
            if (results.rows.length > 0) {
                // Entry with the same date exists, handle this case (e.g., log a message)
                console.log('Entry with the same date already exists');
            } else {
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
              () => {
                console.log('Form entry added');
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
    formatThanks(entry.appreciations,entry.previousAppreciations);
    formatTasks(entry.tasks,entry.previousTasks,entry.futureTasks);
    });
}

export {storeForm};