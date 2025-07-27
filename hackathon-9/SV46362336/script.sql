## Consultas sql
1. Listar todos los productos.

select * from products

2. Mostrar el nombre y el precio de todos los productos.

select productname as producto, price as precio from products

3. Listar todos los clientes ordenados alfabéticamente.

select * from customers order by customername asc

4. Mostrar los pedidos realizados por un cliente específico (CustomerID = 89).

select orders.customerid, products.productname, orderdetails.quantity
from ((orders
inner join orderdetails ON orders.orderid = orderdetails.orderid)
inner join products ON products.productid = orderdetails.productid)
where customerid = 89

5. Mostrar los empleados ordenados por fecha de cumpleaños

select * from employees order by birthdate asc

6. Listar todos los proveedores con su país.

select suppliername as proveedor, country as país from suppliers

7. Mostrar los nombres de productos con precio (price > 48).

select productname as producto, price as precio from products
where price > 48

8. Contar el total de clientes por país.

select country, count(country) from customers
group by country

9. Obtener todos los pedidos realizados en el año 1997.

select * from orders
inner join orderdetails on orders.orderid = orderdetails.orderid
inner join products on orderdetails.productid = products.productid
where orderdate between '1997-01-01 00:00:00' and '1997-12-31 23:59:59'

10. Ver detalles de productos con precio mayor a $50.

select * from products
inner join categories on products.categoryid = categories.categoryid
where price > 50

11. Mostrar los clientes cuyo nombre comienza con "A".

select * from customers
where customername like 'A%'

12. Mostrar todos los productos en la categoría "Beverages".

select * from products
inner join categories on products.categoryid = categories.categoryid
where categoryname = 'Beverages'

13. Obtener todos los empleados que reportan al empleado con EmployeeID = 2.

alter table employees
add reportTo integer

update employees
set reportto = 2 
where employeeid in (3, 4, 5)

select * from employees
where reportto = 2

14. Mostrar el total de productos en cada categoría.

select categoryname, count(categoryname) from products
inner join categories on products.categoryid = categories.categoryid
group by categoryname

15. Mostrar los 10 productos más caros.

select * from products
order by price desc
limit 10

16. Listar el número de pedidos por cliente.

select customers.customerid, customername, count(orders.customerid) from orders
inner join customers on customers.customerid = orders.customerid
group by customers.customerid

17. Obtener el total de ventas (precio * cantidad) por producto.

select products.productid as id, products.productname as producto,
sum(products.price * orderdetails.quantity) as ventas
from orderdetails
inner join products on products.productid = orderdetails.productid
group by products.productid
order by products.productid

18. Mostrar los productos que no se han vendido nunca.

insert into products values(78,'Pringles potato',20,5,'12 cans',19) // para añadir producto nuevo que no ha sido vendido

select p.productid, p.productName, p.price
from Products as p
where p.productID not in (select distinct productID from orderdetails)
	
19. Obtener las categorías y cuántos productos tiene cada una.

select c.categoryid, c.categoryname, count(p.categoryid) as productos from products as p
inner join categories as c on p.categoryid = c.categoryid
group by c.categoryid

20. Mostrar el promedio de unidades en stock por categoría.

// No pude realizar esta query

21. Obtener todos los clientes que han realizado más de 5 pedidos.

select c.customerid, c.customername, count(c.customerid) as pedidos from customers as c
inner join orders as o on c.customerid = o.customerid
group by c.customerid
order by c.customerid

22. Mostrar el pedido más reciente de cada cliente.

select * from (
    select
        *,
        row_number() over (partition by customerid order by orderdate desc) as r
    from orders)
where r = 1

23. Obtener la cantidad total de pedidos por año.

select extract(year from  orderdate) as año, count(orderid) as pedidos from orders
group by año

24. Calcular el total de ventas por empleado.

select o.employeeid, concat(e.firstname, ' ', e.lastname) as empleado,
count(o.orderid) as ventas, sum(p.price * d.quantity) as monto
from orders as o
inner join orderdetails as d on o.orderid = d.orderid
inner join employees as e on o.employeeid = e.employeeid
inner join products as p on p.productid = d.productid
group by o.employeeid, e.firstname, e.lastname

25. Obtener el top 5 de clientes con mayor volumen de compra.

select c.customerid, c.customername, sum(p.price * d.quantity) as monto from customers as c
inner join orders as o on c.customerid = o.customerid
inner join orderdetails as d on o.orderid = d.orderid
inner join products as p on p.productid = d.productid
group by c.customerid
order by monto desc
limit 5

26. Mostrar pedidos con más de 5 productos diferentes.

select o.orderid, o.orderdate, count(distinct d.productid) as mayora5 from orders as o
inner join orderdetails as d on o.orderid = d.orderid
group by o.orderid, o.orderdate
having count(distinct d.productid) >= 5

27. Ver productos que han sido reordenados (ReorderLevel > 0). // productos que fueron pedido más de 1 vez

select p.productname, count(d.productid) as reordenes from orderdetails as d
inner join products as p on d.productid = p.productid
group by p.productname
having count(d.productid) > 1
order by reordenes desc

28. Listar los productos que tienen más unidades vendidas. // top 10

select p.productname, count(d.productid) as reordenes from orderdetails as d
inner join products as p on d.productid = p.productid
group by p.productname
order by reordenes desc
limit 10

29. Obtener el país con más clientes.

select country, count(customerid) as clientes from customers
group by country
order by clientes desc
limit 1

30. Mostrar el nombre completo de los empleados concatenado (Nombre + Apellido).

select e.employeeid, concat(e.firstname, ' ', e.lastname) as "nombre completo"
from employees as e

31. Obtener el cliente con el mayor número de pedidos.

select c.customerid, c.customername, count(o.orderid) as pedidos from customers as c
inner join orders as o on c.customerid = o.customerid
group by c.customerid
order by pedidos desc
limit 1

32. Mostrar los productos más vendidos por categoría.

select c.categoryname, p.productname, sum(p.price * d.quantity) from categories as c
inner join products as p on c.categoryid = p.categoryid
inner join orderdetails as d on p.productid = d.productid
group by c.categoryname, p.productname
order by c.categoryname, sum desc

33. Calcular la duración promedio de entrega por empleado.

// No pude realizar esta query

34. Mostrar productos junto con el nombre del proveedor y la categoría.

select p.productname, s.contactname, c.categoryname from products as p
inner join suppliers as s on p.supplierid = s.supplierid
inner join categories as c on c.categoryid = p.categoryid

35. Listar los pedidos con retrasos (usando RequiredDate y ShippedDate).

// No pude realizar esta query

36. Calcular el total de ventas por mes y año.

select
    extract(year from o.orderdate) as año, 
    extract(month from o.orderdate) as Mes,
    sum(p.price * d.quantity) as "total ventas"
from orders as o
inner join orderdetails as d on o.orderid = d.orderid
inner join products as p on d.productid = p.productid
group by año, mes
order by año, mes

37. Ver empleados que no han gestionado ningún pedido.

select * from employees as e
left join orders as o on e.employeeid = o.employeeid
where o.orderid is null

38. Obtener pedidos con un monto total mayor a $10,000.

select d.orderid, sum(d.quantity * p.price) as total from orderdetails as d
inner join products as p on p.productid = d.productid
group by d.orderid
having sum(d.quantity * p.price) > 10000

39. Obtener la fecha del primer y último pedido por cliente.

select customerid,
    min(orderdate) as "primer pedido",
    max(orderdate) as "último pedido"
from orders
group by customerid
order by customerid

40. Mostrar las 3 categorías más rentables (basado en ventas).

select c.categoryname, sum(p.price * d.quantity) as ventas from categories as c
inner join products as p on c.categoryid = p.categoryid
inner join orderdetails as d on p.productid = d.productid
group by c.categoryname
order by c.categoryname desc
limit 3