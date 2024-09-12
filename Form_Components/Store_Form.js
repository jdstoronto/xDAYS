import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'xDayEntries.db', location: 'default' });

function formatThanks(tx,mainId,newArray, prevArray){
  tx.executeSql(`CREATE TABLE IF NOT EXISTS appreciation_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    main_table_id INTEGER,
    status TEXT,
    name TEXT,
    thanks TEXT,
    updateTime INT,
    viewed_incompleted INT DEFAULT 0,
    viewed_completed INT DEFAULT 0,
    FOREIGN KEY (main_table_id) REFERENCES entries(id) ON DELETE CASCADE
    )`,[],() => {
      console.log('Appreciations Table created or already exists');
      newArray.filter(item => item.name != "").forEach(item => {
        tx.executeSql(
          'INSERT INTO appreciation_table (main_table_id, status, name, thanks, updateTime) VALUES (?, ?, ?, ?,?)',
          [mainId, item.status, item.name, item.thanks, item.updateTime]
        );
      });
    },error => {
        console.log('Error creating table:', error);
      }
    );
    
    prevArray.forEach(item => {
      tx.executeSql(
        'UPDATE appreciation_table SET status = ? WHERE id == ?',
        [item.status, item.id]
      );
      console.log(`updating ${item.thanks} for id ${item.id} to status ${item.status}`)
    });

}

function formatTasks(tx,newArray,prevArray,futureArray){

}

function handleMaxEntries(){

}

function getThanks(notCompletedAmount, completedAmount) {
  return new Promise((resolve, reject) => {
    let foundNotComplete = [];
    let foundComplete = [];

    console.log(`Looking for Old Appreciations`);

    db.transaction(tx => {
      // First query for not completed appreciations
      const notCompletedPromise = new Promise((resolveQuery, rejectQuery) => {
        tx.executeSql(
          `SELECT * FROM appreciation_table WHERE status='' LIMIT ?`,
          [notCompletedAmount],
          (tx, results) => {
            if (results.rows.length > 0) {
              for (let i = 0; i < results.rows.length; i++) {
                foundNotComplete.push(results.rows.item(i));
              }
              console.log(`Found Not Completed: ${foundNotComplete}`);
            } else {
              console.log(`No Appreciations Found Not Completed`);
            }
            resolveQuery(); // Resolve this query's promise
          },
          error => {
            console.log('Error executing not completed query', error);
            rejectQuery(error); // Reject this query's promise on error
          }
        );
      });

      // Second query for completed appreciations
      const completedPromise = new Promise((resolveQuery, rejectQuery) => {
        tx.executeSql(
          `SELECT * FROM appreciation_table WHERE status='Completed' LIMIT ?`,
          [completedAmount],
          (tx, results) => {
            if (results.rows.length > 0) {
              for (let i = 0; i < results.rows.length; i++) {
                foundComplete.push(results.rows.item(i));
              }
              console.log(`Found Completed: ${foundComplete}`);
            } else {
              console.log(`No Appreciations Found Completed`);
            }
            resolveQuery(); // Resolve this query's promise
          },
          error => {
            console.log('Error executing completed query', error);
            rejectQuery(error); // Reject this query's promise on error
          }
        );
      });

      // Wait for both queries to complete before resolving the main promise
      Promise.all([notCompletedPromise, completedPromise])
        .then(() => {
          const found = foundNotComplete.concat(foundComplete);
          resolve(found);  // Resolve the main promise after both queries are done
        })
        .catch(error => {
          reject(error);  // Reject the main promise if either query failed
        });
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