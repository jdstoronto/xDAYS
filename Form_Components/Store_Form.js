import SQLite from 'react-native-sqlite-storage';
import { Alert} from 'react-native';

const db = SQLite.openDatabase({ name: 'xDayEntries.db', location: 'default' });

function formatThanks(tx,mainId,newArray, prevArray){
  tx.executeSql(`CREATE TABLE IF NOT EXISTS appreciation_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    main_table_id INTEGER,
    status TEXT,
    name TEXT,
    thanks TEXT,
    updateTime INTEGER,
    viewed_incompleted INTEGER DEFAULT 0,
    viewed_completed INTEGER DEFAULT 0,
    FOREIGN KEY (main_table_id) REFERENCES entries(id) ON DELETE CASCADE
    )`,[],() => {
      //console.log('Appreciations Table created or already exists');
      newArray.filter(item => item.name != "").forEach(item => {
        tx.executeSql(
          'INSERT INTO appreciation_table (main_table_id, status, name, thanks, updateTime) VALUES (?, ?, ?, ?, ?)',
          [mainId, item.status, item.name, item.thanks, item.updateTime],
          (tx, results) => {
            //console.log(`Added Thanks from ${item.name}`);
          },
          error => {
            //console.log('Error inserting item entry:', error);
          }
        );
        //console.log('Adding:', item);
      });
    },error => {
        //console.log('Error creating table:', error);
      }
    ); 
    updateStatus(tx,'appreciation', prevArray)
}

function formatTasks(tx,mainId,newArray,prevArray,futureArray){
  const tableName = 'task';
  tx.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName}_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    main_table_id INTEGER,
    status TEXT,
    task TEXT,
    updateTime INTEGER,
    viewed_incompleted INTEGER DEFAULT 0,
    viewed_completed INTEGER DEFAULT 0,
    FOREIGN KEY (main_table_id) REFERENCES entries(id) ON DELETE CASCADE
    )`,[],() => {
      //console.log(`${tableName} Table created or already exists`);
      //console.log(`Processing${newArray}`);
      newArray.filter(item => item.task != "").forEach(item => {
        //console.log(`Processing ${item}`);
        tx.executeSql(
          `INSERT INTO ${tableName}_table (main_table_id, status, task, updateTime) VALUES (?, ?, ?, ?)`,
          [mainId, item.status, item.task, item.updateTime],
          (tx, results) => {
            //console.log(`Added Thanks from ${item.task}`);
          },
          error => {
            //console.log('Error inserting item entry:', error);
          }
        );
        //console.log('Adding:', item);
      });
    },error => {
        //console.log('Error creating table:', error);
      }
    ); 
    updateStatus(tx,tableName, prevArray)
    updateStatus(tx,tableName, futureArray)
}

function updateThanks(tx,prevArray){
  updateStatus(tx,'appreciation', prevArray)
}

function updateTasks(tx,prevArray,futureArray){
  const tableName = 'task';
  updateStatus(tx,tableName, prevArray)
  updateStatus(tx,tableName, futureArray)
}

function updateStatus(tx,tableName, array){
  array.forEach(item => {
    tx.executeSql(
      `UPDATE ${tableName}_table SET status = ? WHERE id == ?`,
      [item.status, item.id],
      ()=>{ 
        //console.log(`updating ${tableName} for id ${item.id} to status ${item.status}`)
      },
      error => {
        //console.log('Error inserting form entry:', error);
      }
    );
  });
}

function handleMaxEntries(){

}

function getPrevByStatus(tx, tableName, status, amount){
    // First query for not completed appreciations
    let found = []
    const listpromise = new Promise((resolveQuery, rejectQuery) => {
      tx.executeSql(
        `SELECT * FROM ${tableName}_table WHERE status = ? ORDER BY updateTime DESC LIMIT ?`,
        [status, amount],
        (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              found.push(results.rows.item(i));
            }
            //console.log(`Found ${status}: ${found}`);
          } else {
            //console.log(`No ${tableName}s Found ${status}`);
          }
          resolveQuery(found); // Resolve this query's promise
        },
        error => {
          //console.log('Error executing not completed query', error);
          rejectQuery(error); // Reject this query's promise on error
        }
      );
    });

  return listpromise;
}

function getPrevByMainId(tableName, mainId){
  // First query for not completed appreciations
  let found = []
  const listpromise = new Promise((resolveQuery, rejectQuery) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName}_table WHERE main_table_id = ? ORDER BY updateTime DESC`,
        [mainId],
        (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              found.push(results.rows.item(i));
            }
            //console.log(`Found Previous ${tableName}s:${mainId}: ${found}`);
          } else {
            //console.log(`No Previous ${tableName}s:${mainId}: None`);
          }
          resolveQuery(found); // Resolve this query's promise
        },
        error => {
          console.log('Error executing not completed query', error);
          rejectQuery(error); // Reject this query's promise on error
        }
      );
    });
  });

return listpromise;
}

function getThanks(notCompletedAmount, completedAmount) {
  const tableName = 'appreciation';
  return new Promise((resolve, reject) => {

    //console.log(`Looking for Old ${tableName}s`);

    db.transaction(tx => {
      // First query for not completed appreciations
      const notCompletedPromise = getPrevByStatus(tx, tableName, "", notCompletedAmount)

      // Second query for completed appreciations
      const completedPromise = getPrevByStatus(tx, tableName, 'Completed', completedAmount)

      // Wait for both queries to complete before resolving the main promise
      Promise.all([notCompletedPromise, completedPromise])
        .then((value) => {
          const found = value[0].concat(value[1]);
          resolve(found);  // Resolve the main promise after both queries are done
        })
        .catch(error => {
          reject(error);  // Reject the main promise if either query failed
        });
    });
  });
}

function getTasks(notCompletedAmount, completedAmount, futureAmount) {
  const tableName = 'task';
  return new Promise((resolve, reject) => {

    //console.log(`Looking for Old ${tableName}s`);

    db.transaction(tx => {
      // First query for not completed appreciations
      const notCompletedPromise = getPrevByStatus(tx, tableName, "", notCompletedAmount);

      // Second query for completed appreciations
      const completedPromise = getPrevByStatus(tx, tableName, 'Completed', completedAmount);

      // Second query for completed appreciations
      const futurePromise = getPrevByStatus(tx, tableName, 'Future', futureAmount);

      // Wait for both queries to complete before resolving the main promise
      Promise.all([notCompletedPromise, completedPromise, futurePromise])
        .then((value) => {
          const tasksfound = value[0].concat(value[1]);
          resolve([tasksfound, value[2]]);  // Resolve the main promise after both queries are done
        })
        .catch(error => {
          reject(error);  // Reject the main promise if either query failed
        });
    });
  });
}

function createDateFromString(dateString){
  // Split the string into day, month, year parts
  const [year, month, day] = dateString.split('-');

  // Parse the values, and handle the year (add 2000 if it's less than 100)
  const parsedDay = parseInt(day, 10);
  const parsedMonth = parseInt(month, 10) - 1; // Months are zero-based in JavaScript
  const parsedYear = parseInt(year, 10) + (year < 100 ? 2000 : 0); // Adjust year if it's 2 digits

  // Create a new Date object
  const date = new Date(parsedYear, parsedMonth, parsedDay);

  return date;
}

function getPrevDayCount (currentDateInput, selectedDateInput){
  currentDate = createDateFromString(currentDateInput);
  selectedDate= createDateFromString(selectedDateInput);

  timeDifference = currentDate-selectedDate;
  
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
  return dayDifference;

}

function getPrevDays(currentDate, numDaysPrevious) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM entries 
            WHERE date !=?
            LIMIT ${numDaysPrevious}`,
          [currentDate],
          (tx, results) => {
              entries = []
              for (let i = 0; i < results.rows.length; i++) {
                const entry = results.rows.item(i);
                const mainId = entry.id;
                entry.prevDayCount = getPrevDayCount(currentDate, entry.date);
                entries.push(entry)
              }
              resolve(entries);      // Resolve with the full array of entries
          },
          error => {
            console.log('Error Getting Previous Day Level 1:', error);
          });
    });
  }).then(async (entries) => {
    try {
      // Process the async work AFTER the transaction is complete
      for (let entry of entries) {
        const mainId = entry.id;

        // Fetch tasks and thanks asynchronously
        const prevTasks = await getPrevTasks(mainId);
        const prevThanks = await getPrevThanks(mainId);

        entry.appreciations = prevThanks;
        entry.tasks = prevTasks;
      }

      return entries;  // Return the final result with tasks and thanks

    } catch (error) {
      console.error('Error during asynchronous fetching of tasks/thanks:', error);
      throw error;
    }
  });
}

async function getPrevThanks(mainId){
  const tableName = 'appreciation';
  const completedPromise = await getPrevByMainId(tableName, mainId);
  return completedPromise 
}

async function getPrevTasks(mainId){
  const tableName = 'task';
  const completedPromise  = await getPrevByMainId(tableName, mainId);
  return completedPromise 
}

function resetStorage(){
  db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS entries');
  });
  db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS appreciation_table');
  });
  db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS task_table');
  });
}

function storeForm(entry){
  //resetStorage();
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
            //console.log('Entries Table created or already exists');
            tx.executeSql(
            'SELECT id FROM entries WHERE date == ?',
            [entry.date],
            (tx, results) => {
            if (results.rows.length > 0) {
              id = results.rows.item(0).id
              tx.executeSql(
                `UPDATE entries 
                SET day = ?, heal = ?, mathAdd = ?, mathSubtract = ?, mathMultiply = ?, mathDivide = ?, selectedMath = ?, why = ?, whynot = ?
                WHERE id==?`,
                [ 
                  entry.day, 
                  entry.heal, 
                  entry.lifeMath['+'],  // Addition value
                  entry.lifeMath['-'],  // Subtraction value
                  entry.lifeMath['*'],  // Multiplication value
                  entry.lifeMath['÷'],  // Division value
                  entry.selectedMath, 
                  entry.explore.why, 
                  entry.explore.whynot,
                  id
                ],
                (tx, results) => {
                  const mainId = results.insertId;
                  formatThanks(tx,mainId,entry.appreciations,entry.previousAppreciations);
                  formatTasks(tx,mainId,entry.tasks,entry.previousTasks,entry.futureTasks);
                },
                error => {
                  console.log('Error updating form entry:', error);
                }
              );
                //writeOverBool = false
                //If write over true delete these dates
                console.log(`Entry with the same date: ${entry.date} already exists with ID ${id}`);
            }
            else{
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
                //console.log('Form entry added');
                const mainId = results.insertId;
                formatThanks(tx,mainId,entry.appreciations,entry.previousAppreciations);
                formatTasks(tx,mainId,entry.tasks,entry.previousTasks,entry.futureTasks);
                handleMaxEntries(); // Assuming this is a function you've defined
              },
              error => {
                //console.log('Error inserting form entry:', error);
              }
            );
          }
        },
        error => {
          //console.log('Error checking for existing entry:', error);
        }
      );
    },
    error => {
      //console.log('Error creating table:', error);
    });  
  });
}

function updateForm(entry){
  db.transaction(tx => {
    updateThanks(tx,entry.previousAppreciations);
    updateTasks(tx,entry.previousTasks,entry.futureTasks);
    
    Alert.alert('Success', `Updated Form`);
    },
    error => {
      console.log('Error updating form', error);
    }
  );
}

export {storeForm, updateForm, getThanks, getTasks, resetStorage, getPrevDays};