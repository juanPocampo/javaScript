Coderhouse
Curso de JavaScript
Comisión 30325
Profesor: Oscar Morral
Alumno: Alejandro Lucas Gallo
Fecha de entrega: 12 de mayo de 2022
Proyecto final
Síntesis: el proyecto representa el desarrollo del sitio web de un banco online, constando de 7 (cinco) páginas: Index, Principal, Saldos y Operaciones.
Características y herramientas: el sitio web desarrollado es 100% responsive y se puede visualizar desde los principales navegadores disponibles actualmente en el mercado. Los lenguajes utilizados son HTML5 y CSS3 en el caso de marcado y estilo, respectivamente, Javascript como lenguaje de programación para añadir características interactivas y Bootstrap como framework de CSS. También se utilizó GIT para controlar las versiones, experimentando con ramas cuando se buscaba realizar mejoras y/o correciones al sitio, y GitHub para crear un repositorio y disponibilizar el sitio por medio de una GitHub page. Las imágenes, los videos y cualquier otro contenido multimedia fueron descargados de la web en formato de alta calidad, cuando fue posible. En el caso de las imágenes panorámicas, fueron transformadas al formato webp para mejorar la performance del sitio.


La idea del proyecto es simular un banco online, con la posibilidad de ingresar los saldos iniciales de las tres cuentas y luego poder realizar operaciones entre ellas. Ahora estoy en la etapa de cargar los saldos y guardarlos en el storage para luego poder operar y realizar cálculos sobre esos saldos e ir actualizándolos en línea.


Puntos a resolver:
- Cuando salgo al index, vuelvo a principal y registro un nuevo usuario, me sobreescribe el array, no pushea el nuevo cliente al array existente.
- Luego de registrar un nuevo usuario, al volver a la página principal o al salir al index, cuando quiero ingresar nuevamente me pone que no hay clientes registrados.
- Cuando me registro como cliente, bloquear la posibilidad de que pueda registrar otro cliente mientras la sesión esté activa. Es decir, que me obligue a desloguearme y a registrar un usuario nuevo para poder loguearme con ese nuevo usuario.
- Luego de configurar los saldos iniciales, se puede empezar a operar. Sin embargo, si salgo de la página Operaciones y vuelvo a ingresar, debe ir directamente a Operaciones, no a Saldos.