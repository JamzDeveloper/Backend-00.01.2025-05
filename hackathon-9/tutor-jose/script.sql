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
