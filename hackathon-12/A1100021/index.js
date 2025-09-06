import http from "node:http";
import url from "node:url";
const server = http.createServer();

let listSales = [];

server.on("request", (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  console.log("path", path);

  console.log(req.method);

  if (req.method == "GET" && path == "/") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(
      JSON.stringify({
        message: "Api available!",
      })
    );
  }

  if (req.method == "GET" && path == "/api/sales") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(
      JSON.stringify({
        message: "Operation successful",
        data: listSales,
      })
    );
  }

  if (req.method == "GET" && path == "/api/sales/pending") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(
      JSON.stringify({
        message: "Operation successful",
        data: listSales.filter(sale => sale.status === "pending"),
      })
    );
  }

  if (req.method == "GET" && path == "/api/sales/completed") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(
      JSON.stringify({
        message: "Operation successful",
        data: listSales.filter(sale => sale.status === "completed"),
      })
    );
  } 
  
  if (req.method == "POST" && path == "/api/sales") {
    console.log("creating a new sale");
    console.log("===================");
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    return req.on("end", () => {
      try {
        const { client, products } = JSON.parse(body);
        if (!client || !products) {
          res.writeHead(400, { "content-type": "application/json" });
          return res.end(
            JSON.stringify({
              message:
                "The fields [client, products] is required",
            })
          );
        }
        
        let total = 0;
        products.forEach(product => { 
          product.total = product.quantity * product.price;
          total += product.total;
        });

        listSales.push({
          client,
          total: total ?? 0,
          date: new Date(),
          isComplete: false,
          status: "pending",
          products,
        });
        res.writeHead(201, { "content-type": "application/json" });
        return res.end(
          JSON.stringify({
            message: "Operation successful",
          })
        );
      } catch (err) {
        console.log(err.message);
      }
    });
  }

  if (req.method == "POST" && path == "/api/sales/finish") {
    console.log("completing a sale");
    console.log("=================");
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    return req.on("end", () => {
      try {
        const { client } = JSON.parse(body);
        if (!client) {
          res.writeHead(400, { "content-type": "application/json" });
          return res.end(
            JSON.stringify({
              message:
                "The fields [client] is required",
            })
          );
        }
        
        const existClient = listSales.some(sale => sale.client === client); 

        if (!existClient) {
          res.writeHead(400, { "content-type": "application/json" });
          return res.end(
            JSON.stringify({
              message:
                "Client does not exist",
            })
          );
        }
        listSales.forEach(sale => { 
          if(sale.client === client){
            sale.isComplete = true;
            sale.status = "completed";
          }
        });

        res.writeHead(201, { "content-type": "application/json" });
        return res.end(
          JSON.stringify({
            message: "Completion successful",
            data: listSales.filter(sale => sale.client === client),
          })
        );
      } catch (err) {
        console.log(err.message);
      }
    });
  }
  if (req.method == "GET" && path == "/web/home") {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello Word!!</h1>
</body>
</html>`;

    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(html);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "route not found",
    })
  );
});

server.listen(8000, () => {
  console.log("server in running on port 8000");
});
