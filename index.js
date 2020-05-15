const readline = require("readline");
const fs = require("fs");

// Start methods implementation
const search = (readStream, query) => {
    let lCount = 0;
    let matches = [];

    return new Promise((resolve, reject) => {
        readStream.on("line", line => {
            lCount++;
            let index = searchForQuery(line, query);
            if (index != -1) matches.push(index);
        });

        readStream.on("close", () => resolve({
            "String Found At Index": matches
        }));
    });
};
const searchForQuery = (line, query) => line.indexOf(query);

const establishLineReadInterface = filePath => {
    const readStream = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });
    return readStream;
}
// End methods implementation


// Start main search function
const searchInFile = "./longString.txt";
const searchString = "surender";
let readStream = establishLineReadInterface(searchInFile);
search(readStream, searchString)
    .then(result => {
        console.log(result)
    })
// End of main search function