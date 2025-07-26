--Mostrar los pedidos realizados por un cliente específico (CustomerID = 89).


select * from orders
where customerid=89;

--Mostrar los empleados ordenados por fecha de cumpleaños.


select * from employees
order by birthdate asc;


--Mostrar los nombres de productos con precio (price > 48).


select productname from products 
where price>48


--Contar el total de clientes por país.

select country, count(*) as "total" from customers
group by country


--Obtener todos los pedidos realizados en el año 1997.

select * from orders
where extract(year from orderdate) =1997


--select distinct extract(year from orderdate) from orders


--Mostrar todos los productos en la categoría "Beverages".

select * from categories;


select * from products
inner join categories
on products.categoryid= categories.categoryid
where categories.categoryname='Beverages';


--Mostrar los 10 productos más caros.

select  * from products
order by price desc
limit 10;



--Listar el número de pedidos por cliente.


select customerid,count(*) from  orders

group by customerid