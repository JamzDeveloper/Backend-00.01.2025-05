/* Consultas sql */
-- 1. Listar todos los productos.
select * from products;

-- 2. Mostrar el nombre y el precio de todos los productos.
select productname "Nombre", price "Precio" from products;

-- 3. Listar todos los clientes ordenados alfabéticamente.
select * from customers order by contactname;

-- 4. Mostrar los pedidos realizados por un cliente específico (CustomerID = 89).
select orders.orderid "Id Orden", customers.contactname "Cliente", 
employees.firstname || ' ' || employees.lastname "Empleado", 
orders.orderdate "Fecha Orden", shippers.shippername "Expedidor"
from orders
inner join customers on orders.customerid = customers.customerid
inner join employees on orders.employeeid = employees.employeeid
inner join shippers on orders.shipperid = shippers.shipperid
where customers.customerid = 89;

-- 5. Mostrar los empleados ordenados por fecha de cumpleaños.
select * from employees order by birthdate;

-- 6. Listar todos los proveedores con su país.
select suppliername "Proveedor", country "País" from suppliers;

-- 7. Mostrar los nombres de productos con precio (price > 48).
select productname "Producto", price "Precio" from products where price > 48;

-- 8. Contar el total de clientes por país.
select country "País", count(customerid) "Total clientes" from customers group by country;

-- 9. Obtener todos los pedidos realizados en el año 1997.
select * from orders where extract(year from orderdate) = 1997;

-- 10. Ver detalles de productos con precio mayor a $50.
select orderdetails.orderdetailid "Id Detalle", orders.orderdate "Fecha Orden", 
products.productname "Producto", products.price "Precio"
from orderdetails
inner join orders
on orderdetails.orderid = orders.orderid
inner join products
on orderdetails.productid = products.productid
where products.price > 50;

-- 11. Mostrar los clientes cuyo nombre comienza con "A".
select * from customers where contactname like 'A%';

-- 12. Mostrar todos los productos en la categoría "Beverages".
select products.productid "Id Producto", products.productname "Producto", suppliers.suppliername "Proveedor", 
categories.categoryname "Categoría", products.unit "Unidades", products.price "Precio"
from products
inner join suppliers
on products.supplierid = suppliers.supplierid
inner join categories
on products.categoryid = categories.categoryid
where categories.categoryname = 'Beverages';

-- 13. Obtener todos los empleados que reportan al empleado con EmployeeID = 2.
alter table employees add reportsto int;
update employees set reportsto = 2 where employeeid in (1, 3, 5);

select * from employees where reportsto = 2;

-- 14. Mostrar el total de productos en cada categoría.
select categories.categoryname "Categoría", count(products.productid) "Total Productos"
from products
inner join categories
on products.categoryid = categories.categoryid 
group by categories.categoryname;

-- 15. Mostrar los 10 productos más caros.
select * from products order by price desc limit 10;

-- 16. Listar el número de pedidos por cliente.
select count(orders.orderid) "Cantidad de Ordenes", customers.contactname "Cliente"
from orders
inner join customers
on orders.customerid = customers.customerid
group by customers.contactname;

-- 17. Obtener el total de ventas (precio * cantidad) por producto.
select products.productname "Producto", sum(products.price * orderdetails.quantity) "Total Ventas"
from orderdetails
inner join products
on orderdetails.productid = products.productid
group by products.productname;

-- 18. Mostrar los productos que no se han vendido nunca.
select * from products where productid not in (select distinct productid from orderdetails);

-- 19. Obtener las categorías y cuántos productos tiene cada una.
select categories.categoryname "Categoría", count(products.productid) "Total Productos"
from products
inner join categories
on products.categoryid = categories.categoryid 
group by categories.categoryname;

-- 20. Mostrar el promedio de unidades en stock por categoría.
/* Suponiendo que el stock total inicial sea 1000 para cada producto antes de las ventas */
select
    categoria "Categoría", 
	round(avg(stock), 2) "Stock Promedio"
from (
	select 
		(1000 - sum(orderdetails.quantity)) as stock, 
		categories.categoryname as categoria, 
		products.productname as producto
	from orderdetails
	inner join products on orderdetails.productid = products.productid
	inner join categories on products.categoryid = categories.categoryid 
	group by products.productname, categories.categoryname
) as sub 
group by categoria;

-- 21. Obtener todos los clientes que han realizado más de 5 pedidos.
select customers.contactname "Cliente", count(orders.orderid) "Cantidad Pedidos" from orders
inner join customers on orders.customerid = customers.customerid
group by customers.contactname having count(orders.orderid) > 5
order by "Cantidad Pedidos";

-- 22. Mostrar el pedido más reciente de cada cliente.
select customers.contactname "Cliente", max(orders.orderdate) "Último Pedido" from orders
inner join customers on orders.customerid = customers.customerid
group by customers.contactname
order by customers.contactname;

-- 23. Obtener la cantidad total de pedidos por año.
select extract(year from orders.orderdate) "Año", count(orders.orderid) "Total Pedidos" from orders
inner join customers on orders.customerid = customers.customerid
group by "Año"
order by "Año";

-- 24. Calcular el total de ventas por empleado.
select 
employees.firstname || ' ' || employees.lastname "Empleado", 
round(sum(products.price * orderdetails.quantity),2) "Total Ventas"
from orders
inner join orderdetails on orderdetails.orderid = orders.orderid
inner join employees on orders.employeeid = employees.employeeid
inner join products on orderdetails.productid = products.productid
group by "Empleado"
order by "Empleado";

-- 25. Obtener el top 5 de clientes con mayor volumen de compra.
select customers.contactname "Cliente", sum(orderdetails.quantity) "Volumen de Compra" from orders
inner join orderdetails on orderdetails.orderid = orders.orderid
inner join customers on customers.customerid = orders.customerid
group by customers.contactname
order by "Volumen de Compra" desc
limit 5;

-- 26. Mostrar pedidos con más de 5 productos diferentes.
select orders.orderid "Id Order", orders.orderdate "Fecha", count(orderdetails.productid) "Cantidad de Productos" from orders
inner join orderdetails on orderdetails.orderid = orders.orderid
group by orders.orderid
having count(orderdetails.productid) >= 5;

-- 27. Ver productos que han sido reordenados (ReorderLevel > 0).
select products.productname, count(orderdetails.productid) "ReorderLevel" from orderdetails
inner join products on products.productid = orderdetails.productid
group by products.productname
having count(orderdetails.productid) > 1
order by "ReorderLevel" desc;

-- 28. Listar los productos que tienen más unidades vendidas.
select products.productname "Producto", sum(orderdetails.quantity) "Unidades Vendidas" from products
inner join orderdetails on orderdetails.productid = products.productid
group by products.productname
order by "Unidades Vendidas" desc;

-- 29. Obtener el país con más clientes.
select country "País", count(*) "Total Clientes" from customers 
group by country 
order by "Total Clientes" 
desc limit 1;

-- 30. Mostrar el nombre completo de los empleados concatenado (Nombre + Apellido).
select employees.firstname || ' ' || employees.lastname "Nombre Completo" from employees
order by "Nombre Completo";

-- 31. Obtener el cliente con el mayor número de pedidos.
select customers.contactname "Cliente", count(*) "Total Pedidos" from orders
inner join customers on orders.customerid = customers.customerid
group by customers.customerid 
order by "Total Pedidos" 
desc limit 1;

-- 32. Mostrar los productos más vendidos por categoría.
select 
	categoria "Categoría", 
	producto "Producto", 
	total "Más Vendido"
from (
    select 
        categories.categoryname as categoria,
        products.productname as producto,
        round(sum(products.price * orderdetails.quantity), 2) as total
    from orderdetails
    inner join products on orderdetails.productid = products.productid
    inner join categories on products.categoryid = categories.categoryid
    group by categories.categoryname, products.productname
) as sub
where (categoria, total) in (
    select categoria, max(total)
    from (
        select 
            categories.categoryname as categoria,
            products.productname as producto,
            round(sum(products.price * orderdetails.quantity), 2) as total
        from orderdetails
        inner join products on orderdetails.productid = products.productid
        inner join categories on products.categoryid = categories.categoryid
        group by categories.categoryname, products.productname
    ) as ventas
    group by categoria
);

-- 33. Calcular la duración promedio de entrega por empleado.
/* No se puede */

-- 34. Mostrar productos junto con el nombre del proveedor y la categoría.
select products.productid, products.productname, suppliers.suppliername, 
categories.categoryname, products.unit, products.price
from products
inner join suppliers on products.supplierid = suppliers.supplierid
inner join categories on products.categoryid = categories.categoryid;

-- 35. Listar los pedidos con retrasos (usando RequiredDate y ShippedDate).
/* No se puede */

-- 36. Calcular el total de ventas por mes y año.
select 
extract(month from orders.orderdate) "Mes", 
extract(year from orders.orderdate) "Año", 
round(sum(products.price * orderdetails.quantity),2) "Total Ventas"
from orderdetails
inner join orders on orderdetails.orderid = orders.orderid
inner join products on orderdetails.productid = products.productid
group by "Mes", "Año"
order by "Mes", "Año";

-- 37. Ver empleados que no han gestionado ningún pedido.
select * from employees where employeeid not in (select distinct employeeid from orders);

-- 38. Obtener pedidos con un monto total mayor a $10,000.
select orderdetails.orderid, round(sum(products.price * orderdetails.quantity),2) as "Total Ventas"
from orderdetails
inner join products on orderdetails.productid = products.productid
group by orderdetails.orderid
having sum(products.price * orderdetails.quantity) > 10000;

-- 39. Obtener la fecha del primer y último pedido por cliente.
select customers.contactname,min(orders.orderdate) "Primer Pedido", max(orders.orderdate) "Último Pedido" from orders 
inner join customers on orders.customerid = customers.customerid
group by customers.contactname 
order by customers.contactname 

-- 40. Mostrar las 3 categorías más rentables (basado en ventas).
select categories.categoryname "Categoría", round(sum(products.price * orderdetails.quantity),2) "Total Ventas"
from orderdetails
inner join products on orderdetails.productid = products.productid
inner join categories on products.categoryid = categories.categoryid 
group by categories.categoryname 
order by "Total Ventas" desc 
limit 3;