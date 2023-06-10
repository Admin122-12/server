const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
module.exports.insertObject = async function (req, res) {
    try {
        req = req.body
        var currentDate = new Date();
        var providedDate = new Date(req.validTill);
        console.log("reqreq", req)
        const newObjects = [
            {
                title: req.title,
                description: req.description,
                validFrom: new Date(),
                validTill: (providedDate < currentDate) ? currentDate : providedDate
            }
        ];
        console.log("newObjectsnewObjects", newObjects)
        const filePath = './notificationList.json';

        // Read the existing JSON file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // File does not exist, create a new one with the new objects
                    createFileWithObjects();
                    res.send({ status: false, code: 500, message: "File does not exist, create a new one with the new objects" });
                }
                console.error('An error occurred while reading the JSON file:', err);
                res.send({ status: false, code: 500, message: "An error occurred while reading the JSON file" });
            }

            let existingObjects = [];
            try {
                existingObjects = JSON.parse(data); // Parse the existing JSON data into an array
                if (!Array.isArray(existingObjects)) {
                    console.error('The existing data is not an array.');
                    res.send({ status: false, code: 500, message: "The existing data is not an array" });
                }
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                res.send({ status: false, code: 500, message: "Error parsing JSON data" });
            }

            // Find the maximum ID in the existing objects
            let maxId = 0;
            existingObjects.forEach(obj => {
                if (obj.id && typeof obj.id === 'number' && obj.id > maxId) {
                    maxId = obj.id;
                }
            });

            // Generate unique IDs and append the new objects to the existing array
            const objectsWithIds = newObjects.map(obj => ({ id: ++maxId, ...obj }));
            existingObjects.push(...objectsWithIds);

            // Write the updated array back to the JSON file
            fs.writeFile(filePath, JSON.stringify(existingObjects, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('An error occurred while writing JSON to file:', err);
                    res.send({ status: false, code: 500, message: "An error occurred while writing JSON to file" });
                }
                console.log('JSON data has been appended to', filePath);
                res.send({ status: true, code: 200, message: "Notification inserted successfully" });
            });
        });

        function createFileWithObjects() {
            const objectsWithIds = newObjects.map((obj, index) => ({ id: index + 1, ...obj }));
            fs.writeFile(filePath, JSON.stringify(objectsWithIds, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('An error occurred while creating JSON file:', err);
                    res.send({ status: false, code: 500, message: "An error occurred while writing JSON to file" });
                }

                console.log('New JSON file has been created at', filePath);
                res.send({ status: true, code: 200, message: "New JSON file has been created at" });
            });
        }

    } catch (error) {
        console.log("hello", error)
        res.send({ status: false, code: 500, message: "FAILED" })
    }
}



module.exports.getObject = function (req, res) {
    try {
        const filePath = './notificationList.json';

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('An error occurred while reading the JSON file:', err);
                res.send({ status: false, code: 500, message: "Failed" });
                return;
            }

            let records = [];
            try {
                records = JSON.parse(data); // Parse the JSON data into an array
                if (!Array.isArray(records)) {
                    console.error('The data in the JSON file is not an array.');
                    res.send({ status: false, code: 500, message: "Failed" });
                    return;
                }
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                res.send({ status: false, code: 500, message: "Failed" });
                return;
            }

            const currentDate = new Date();

            // Filter the records based on the date property being greater than the current date
            const filteredRecords = records.filter(record => {
                const recordDate = new Date(record.validTill);
                return recordDate > currentDate;
            });

            console.log('Filtered records:', filteredRecords);
            res.send({ status: true, code: 200, message: "", data: filteredRecords });
        });
    } catch (error) {
        res.send({ status: false, code: 500, message: "Failed" });
    }
};
