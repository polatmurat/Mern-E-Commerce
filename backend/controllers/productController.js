const formidable = require("formidable");

class Product {
    async create(req, res) {
        const form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if (!err) {
                console.log("fields : ", fields);
                console.log("files : ", files);
            } else {
                console.error("Error parsing form:", err);
            }
        });
    }
}

module.exports = new Product;
