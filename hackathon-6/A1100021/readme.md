# 📦 Proyecto: ServiPhone

> Sistema local que requiere importar un respaldo (`.json`) en `localStorage` antes de su uso.

---

## ⚠️ Importante: Importar el Backup

Este sistema almacena toda su información utilizando **localStorage** del navegador.  
Por lo tanto, debes importar manualmente un archivo de backup (`.json`) al iniciar por primera vez o después de limpiar el navegador.

🔁 El sistema necesita datos iniciales para funcionar correctamente.  
💥 Si no se importa el backup, el sistema puede cargar vacío o generar errores al intentar acceder a datos inexistentes.

---

## 📝 ¿Cómo importar el backup?

Sigue estos pasos desde la interfaz del sistema:

1. Abre el archivo `index.html` en tu navegador.  
2. En la barra de navegación, ve a:  
   **Datos ▾ → Backup**  
3. Serás redirigido a `backup.html`.  
4. En esa página, haz clic en el botón "Importar Backup".  
5. Selecciona el archivo `.json` que se encuentra en la carpeta **backups** dentro del proyecto.