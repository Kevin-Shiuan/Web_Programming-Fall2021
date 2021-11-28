All function done including bonus, with modified UX flow and customized UI
Remember to type in your database_URL in .env.defaults.

# How to Use
There's 3 main part, which is ActionBar, Console, and Table.

## ActionBar
The content of ActionBar change whenever Tab is swapped, the function is as usual as default.

## Console
The console will log what is done and the status, show error is occur. CLEAR CONSOLE button will clear the console.

## Table
The table will show all data from database in default, in which are sorted by name. CLEAR DATABASE button will clear the database, and use a dialog to ensure this action, preventing mis-clearing. However, table will show filtered data according to the last action executed in ActionBar. If query is performed, table will show the result of query only, while add is performed, table will show all the data related to the name of the last added scoreCard. In order to show all data again, user can use RESET QUERY or SHOW ALL DATA button to reset the table to show default value. The name of the button change according to the active tab. If there's error on query, the table will not be displayed and show error. If database is empty, table will also not displayed with caption telling you data base is empty.

# Backend structure explain
server.js as the interface of backend, and routes and api are all in index.js, including mongoDB connection config. PORT:4000 is used as PORT:5000 is used by OS system on auther's computer. All implement was write in one file because there occur some bug and error while seperating mongoDb connection config with api implementations.

# Frontend structure explain
Inherit the style of teacher's style, almost all code in one file. But there's still some seperated file like Dialog.js and Table.js. Material Theme is used, and tunned some components.

