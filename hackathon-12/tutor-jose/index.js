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

  if (req.method == "POST" && path == "/api/sales") {
    console.log("creating a new sale");
    console.log("===============");
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    return req.on("end", () => {
      try {
        console.log("listening end");

        const { client, total, date, isComplete, products } = JSON.parse(body);
        if (!client || !date || !isComplete || !products) {
          res.writeHead(400, { "content-type": "application/json" });
          return res.end(
            JSON.stringify({
              message:
                "The fields [client,date,isComplete,products] is required",
            })
          );
        }

        // for para calcular el total
        listSales.push({
          client,
          total: total ?? 0,
          date,
          isComplete,
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
