# Project Title

Random Token Generator.
---
## Requirements
For development, you will only need Node.js  and npm global package.
### Node
- #### Node installation on Windows
  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Install

    $ git clone https://github.com/SunnyKumar2213/RandomTokenGenerator.git
    $ cd RandomTokenGenerator
    $ npm install
## Running the project
    $ node index.js
    
    
## Database 
    MYSQL (mysql.js FILE). 
    update database credentials in mysql.js file line number 2
    const mysqlConfig = {
        host: "localhost",
        user: "root",
        password: "",
        database: "task"
    }
    
## About Project
Read a file containing random tokens and store them in the database as quickly and efficiently as possible without storing any token twice and create a list of the three most frequent tokens.

###  NPM Modules
 ## event-stream
Streams are one of the fundamental concepts that power Node.js applications. 
They are data-handling method and are used to read or write input into output sequentially.
Streams are a way to handle reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way.
    
## Why streams
Streams basically provide two major advantages compared to other data handling methods:

Memory efficiency: you don’t need to load large amounts of data in memory before you are able to process it
Time efficiency: it takes significantly less time to start processing data as soon as you have it, rather than having to wait with processing until the entire payload has been transmitted

1) Writable: streams to which we can write data. For example, fs.createWriteStream() lets us write data to a file using streams.
2) Readable: streams from which data can be read. For example: fs.createReadStream() lets us read the contents of a file.

## Reference and learning
    https://nodejs.org/api/documentation.html
    https://nodesource.com/blog/understanding-streams-in-nodejs/
    
