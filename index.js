var es = require('event-stream')
var fs = require('fs')
const filename ='log.txt';
const mysqlLib = require('./mysql');
class TokenGenerator {
   async randomTokenGenerator(length, chars,chars2) {
        return new Promise( async (resolve, reject)  => { // promise that handle all async operation and error handling
            var totlaTokens=10000000;  // total number of tokens 10 millions 
            var uniqueRandomToken=""; // this variable use for store random token
            var tempFile = fs.createWriteStream(filename);  // this module store the random token line by line in text file with stream algorithm
                    tempFile.on('open', async function(fd) {
                        console.log("GenertingToken ....");
                        for(var token=0;token<totlaTokens;token++){
                        for (var i = length; i > 0; --i) 
                        uniqueRandomToken += chars[Math.floor(Math.random() * chars.length)]; // Random Token Generator algorithm from (a-z) seven letter as given in question.
                        tempFile.write(uniqueRandomToken+"\n"); // store token on seperate line.
                        uniqueRandomToken="";
                        }
                        tempFile.end();// this indicate the program that write operation in performed successfully and program goes in on finish
                        
                    }).on('error', error => reject(error)).on('end',() => { // if there is any error in writing the file, this will automatically tigger.
                        console.log(41,":End line");
                    })
                    .on('finish', () => {
                        resolve(); // this is function of promise that shows that task completed successfully. 
                        console.log("Token file created successfully ");
                    });
    });
    }
async tokenReader(filename){ // this function read all the tokens that are generated previously.
     console.log("Reading Token and adding in db ...") // message will print on console.
    const tokenValues=[];
    var sql = 'insert into tokendata (tokenString) values ?'; // sql query for insert the data.
    var tokenCount=0;
    let tokens=[]; // store tokens 
    let tokens2=[]; // store tokens
    var temp=[]; // store bluck tokens than insert in db
    var duplicateTokenFrequency=[]; // save frequency of duplicate tokens.
    var readStream=fs.createReadStream(filename, {flags: 'r'})//option is fs.createReadStream(),
    // which streams the data in (and out) similar to other languages like Python and Java.
    .pipe(es.split())
    .pipe(es.map(function (line, cb) {
        tokenCount++;
             if(tokens[line]){
                    duplicateTokenFrequency[line]=(duplicateTokenFrequency[line]+1) || 2 ;  // store duplicate tokens frequency
            } 
            else if(tokens2[line]){
                    duplicateTokenFrequency[line]=(duplicateTokenFrequency[line]+1) || 2 ;  // store duplicate tokens frequency
            }
            else{
                temp.push([line]);
                // user two array becuase it will make program more faster and no memory issue
                if(tokenCount%2==0){ // even number tokens are save in one array and odd numbers token save in two array
                    tokens2[line]=line;  
                }else {
                tokens[line]=line;  
                }
                if(tokenCount%50000==0){ // 50000 token store in one time in db.
                    readStream.pause(); // pause the stream so that data easly store in db
                    mysqlLib.executeQuery(sql,temp);
                    temp=[]; // empty the bluck tokens
                    tokenCount=0;   
                    readStream.resume(); //  resume the stream
                }
            }   
        cb(null, line)
    })).on('error',function (error){ // error handling if any error occuar reading file.
        console.log(error);
    }).on('end',function (){
        mysqlLib.executeQuery(sql,temp); // last insert in db if there are records less tha 50000
        console.log("Top three token and  frequency"); 
        let sortedArrayDESC=getSortedKeys(duplicateTokenFrequency) // this function is used to sort the object array
        for(var i=0;i<3;i++){
            console.log(sortedArrayDESC[i]+":"+duplicateTokenFrequency[sortedArrayDESC[i]]); // print three most frequent tokens.
        }
        console.log("Token added successfully in db");
        duplicateTokenFrequency=[];
        temp=[];
        tokens=[];
        tokens2=[];
        sortedArrayDESC=[];
    });
    }
}
function getSortedKeys(obj) {
    var keys = keys = Object.keys(obj);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}
const tokenGenerator=new TokenGenerator();
const charset = 'abcdefghijklmnopqrstuvwxyz';
const charSetLenght=7;
var rToken =  tokenGenerator.randomTokenGenerator(charSetLenght, charset).then((value)=>{
    tokenGenerator.tokenReader(filename);
});
return 0;
