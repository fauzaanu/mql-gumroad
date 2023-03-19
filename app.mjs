import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const { product_id, license_key } = req.query;
  if (product_id && license_key) {
    console.log(product_id, license_key);
    axios
      .post("https://api.gumroad.com/v2/licenses/verify", {
        product_id: product_id,
        license_key: license_key,
      })
      .then((response) => {
        if (response.data.success) {
          res.end("true");
        } else {
          res.end("false");
        }
      })
      .catch((error) => {
        res.end("false");
      });
  }
});

app.listen(port, () => {
  console.log(`MQ4 RESPONSE listening at http://localhost:${port}`);
});
