const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
module.exports.insertVisitCharges = async function (req, res) {
    try {
        req = req.body


        const filePath = './visitCharges.json';

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // File doesn't exist, create it
                    const jsonData = { visitCharges: req.visitCharges };
                    const jsonContent = JSON.stringify(jsonData, null, 2);

                    fs.writeFile(filePath, jsonContent, 'utf8', (err) => {
                        if (err) {
                            console.error('An error occurred while creating the JSON file:', err);
                            res.send({ status: false, code: 500, message: "An error occurred while creating the JSON file" })
                        }
                        res.send({ status: true, code: 200, message: "JSON file created successfully." })
                        console.log('JSON file created successfully.');

                    });
                } else {
                    console.error('An error occurred while reading the JSON file:', err);
                    res.send({ status: false, code: 500, message: "An error occurred while reading the JSON file" })
                }
                return;
            }

            let jsonData;
            try {
                jsonData = JSON.parse(data); // Parse the JSON data
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                res.send({ status: false, code: 500, message: "Error parsing JSON data:" })
            }

            // Insert the visitCharges entry
            jsonData.visitCharges = req.visitCharges;

            // Convert the updated data back to JSON string
            const updatedJson = JSON.stringify(jsonData, null, 2);

            fs.writeFile(filePath, updatedJson, 'utf8', (err) => {
                if (err) {
                    console.error('An error occurred while writing the JSON file:', err);
                    res.send({ status: false, code: 500, message: "An error occurred while creating the JSON file" })
                }

                console.log('JSON file updated successfully.');
                res.send({ status: true, code: 200, message: "JSON file updated successfully" })
            });
        });


    } catch (error) {
        console.log("hello", error)
        res.send({ status: false, code: 500, message: "FAILED" })
    }
}



module.exports.getVisitCharges = function (req, res) {
    try {
        const filePath = './visitCharges.json';

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('An error occurred while reading the JSON file:', err);
                res.send({ status: false, code: 500, message: "An error occurred while reading the JSON file" })
            }

            let jsonData;
            try {
                jsonData = JSON.parse(data); // Parse the JSON data
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                res.send({ status: false, code: 500, message: "Error parsing JSON data:" })
            }
            const records = jsonData; // Replace 'records' with your key
            console.log('Records:', records);
            res.send({ status: true, code: 200, data: records })
        });


    } catch (error) {
        res.send({ status: false, code: 500, message: "Failed" });
    }
};
