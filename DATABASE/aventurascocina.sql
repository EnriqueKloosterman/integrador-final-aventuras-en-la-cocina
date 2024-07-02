-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-07-2024 a las 21:25:09
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aventurascocina`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `article`
--

CREATE TABLE `article` (
  `articleId` varchar(36) NOT NULL,
  `title` varchar(150) NOT NULL,
  `article` text NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` varchar(36) DEFAULT NULL,
  `tagId` int(11) DEFAULT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `article`
--

INSERT INTO `article` (`articleId`, `title`, `article`, `createdAt`, `updatedAt`, `userId`, `tagId`, `image`) VALUES
('2c67432b-7662-4811-a8ad-84584836a895', 'Elegir los Utensilios Adecuados: Guía para Cocineros Aficionados', '[\"¡Hola a todos! Soy Miguel, un cocinero aficionado que ha descubierto la magia de cocinar en casa. Una de las primeras cosas que aprendí en mi viaje culinario es la importancia de tener los utensilios adecuados. Elegir los utensilios correctos puede hacer que la experiencia en la cocina sea más agradable y eficiente. Aquí les comparto algunos consejos para seleccionar los utensilios esenciales que todo cocinero aficionado debería tener.\",\"1. Cuchillos de calidad\",\"Un buen cuchillo es esencial. Invierte en un cuchillo de chef de alta calidad, ya que es el más versátil y se usa para la mayoría de las tareas de corte. También te recomiendo tener un cuchillo de sierra para cortar pan y un cuchillo pequeño (puntilla) para trabajos más detallados. Recuerda mantener tus cuchillos afilados para facilitar su uso y garantizar cortes precisos.\",\"2. Tablas de cortar\",\"Las tablas de cortar son indispensables. Es ideal tener al menos dos: una para carnes y otra para frutas y verduras, lo que ayuda a prevenir la contaminación cruzada. Las tablas de madera son excelentes para cuchillos y son duraderas, mientras que las de plástico son fáciles de limpiar y suelen ser más económicas.\",\"3. Sartenes y ollas\",\"Un buen set de sartenes y ollas te facilitará mucho la vida en la cocina. Una sartén antiadherente es perfecta para cocinar huevos y otros alimentos delicados, mientras que una sartén de acero inoxidable es ideal para dorar y sellar carnes. También necesitarás una cacerola pequeña para salsas y una olla grande para sopas y guisos.\",\"4. Utensilios de cocina básicos\",\"Tener a mano algunos utensilios básicos es crucial. Un par de espátulas (una de silicona y otra de metal), cucharas de madera, un batidor y unas pinzas son herramientas que usarás a diario. También considera un rallador multifuncional y un pelador de vegetales.5. Herramientas de medición\",\"Para seguir recetas con precisión, necesitas herramientas de medición. Un juego de tazas y cucharas medidoras, así como una balanza de cocina, te ayudarán a obtener las cantidades exactas de ingredientes.\",\"6. Otros imprescindibles\",\"No te olvides de otros utensilios útiles como coladores, boles para mezclar, un abrelatas y unas tijeras de cocina. Estos elementos pueden parecer simples, pero son increíblemente prácticos.\",\"Elegir los utensilios adecuados puede transformar tu experiencia en la cocina. No necesitas comprar todo de una vez; comienza con lo esencial y amplía tu colección a medida que adquieras más experiencia. ¡Espero que estos consejos te ayuden a equipar tu cocina y a disfrutar aún más de tu aventura culinaria!\",\"¡Feliz cocina!\"]', '2024-06-29 22:29:54.037423', '2024-06-29 22:30:29.000000', '33c41d90-6191-4f35-8092-8060ea4f6967', 3, 'http://res.cloudinary.com/deumagcgr/image/upload/v1719700193/zi0gnyh6fdimrdvntgon.jpg'),
('3330173d-cedf-4aed-9173-7bb306dfca21', 'Qué Buscar en un Restaurante para una Experiencia Gastronómica Excepcional', '[\"Comer fuera de casa es una experiencia que va más allá de simplemente satisfacer el hambre. Es una oportunidad para explorar nuevos sabores, disfrutar de un ambiente agradable y, en muchos casos, compartir momentos especiales con amigos y familiares. Pero, ¿cómo podemos asegurarnos de que estamos eligiendo el restaurante adecuado? Aquí hay algunos aspectos clave a considerar para garantizar una experiencia gastronómica memorable.\",\"1. Calidad y frescura de los ingredientes.\",\"La piedra angular de cualquier gran comida es la calidad de los ingredientes. Al seleccionar un restaurante, es importante investigar si el establecimiento se esfuerza por utilizar productos frescos y de alta calidad. Muchos restaurantes de renombre destacan su compromiso con ingredientes locales y de temporada, lo cual no solo garantiza frescura sino también apoya a la economía local.\",\"2. Variedad y originalidad del menú\",\"Un buen restaurante ofrece un menú variado que puede satisfacer diferentes gustos y necesidades dietéticas. Además de la variedad, la originalidad en la oferta gastronómica es crucial. Platos innovadores que combinan sabores y técnicas de cocción únicas pueden elevar tu experiencia culinaria a nuevos niveles. Asegúrate de que el menú tenga opciones vegetarianas, veganas, sin gluten y otras alternativas para que todos en tu grupo puedan disfrutar de la comida.\",\"3. Ambiente y decoración\",\"El ambiente de un restaurante puede influir significativamente en tu experiencia. Busca un lugar que ofrezca un ambiente acogedor y una decoración que complemente la cocina. Ya sea que prefieras un ambiente elegante y sofisticado o uno más relajado y casual, asegúrate de que el entorno sea propicio para disfrutar de tu comida. La iluminación, la música y el diseño interior juegan roles importantes en crear la atmósfera adecuada.\",\"4. Servicio al cliente\",\"El servicio al cliente puede hacer o deshacer tu experiencia en un restaurante. Un personal amable, atento y conocedor del menú puede mejorar significativamente tu visita. Busca reseñas que mencionen la calidad del servicio, y no dudes en hacer preguntas al personal cuando llegues. La capacidad de los camareros para recomendar platos, adaptarse a necesidades especiales y mantener una actitud positiva es fundamental.\",\"5. Limpieza e higiene\",\"La limpieza es un factor no negociable. Un restaurante limpio en todas sus áreas, desde la cocina hasta los baños, refleja un compromiso con la salud y el bienestar de sus clientes. Asegúrate de que el lugar cumpla con las normas de higiene y observa detalles como la limpieza de las mesas, cubiertos y la presentación general del establecimiento.\",\"6. Relación calidad-precio\",\"Mientras que disfrutar de una buena comida a veces puede justificar un gasto mayor, la relación calidad-precio siempre debe ser justa. Compara los precios del menú con la calidad y cantidad de los platos ofrecidos. Un buen restaurante ofrece una experiencia culinaria que justifica su costo, proporcionando valor a sus clientes.\",\"7. Opiniones y reseñas\",\"En la era digital, las opiniones y reseñas en línea son herramientas invaluables. Plataformas como Yelp, TripAdvisor y Google Reviews pueden proporcionar información valiosa sobre las experiencias de otros comensales. Lee varias reseñas para obtener una visión equilibrada y presta atención a los comentarios sobre los puntos mencionados anteriormente.\",\"8. Experiencias personales y recomendaciones\",\"Finalmente, no subestimes el valor de las recomendaciones personales. Preguntar a amigos, familiares o colegas sobre sus restaurantes favoritos puede llevarte a descubrir joyas ocultas que de otra manera no habrías encontrado.\",\"Al considerar estos factores, puedes asegurarte de que tu próxima salida a comer sea una experiencia placentera y satisfactoria. Recuerda, la mejor elección de restaurante no solo te ofrece una buena comida, sino que también crea recuerdos que perduran.\"]', '2024-05-17 13:47:42.341836', '2024-05-17 13:47:42.341836', '23c5eafc-8116-4ef1-9d12-538de743cac3', 2, 'http://res.cloudinary.com/deumagcgr/image/upload/v1715953662/qxvnqiupiysr10tqmryp.jpg'),
('72d44e24-b299-424c-8928-bb348ab3fcb3', 'La Belleza de la Simplicidad en la Cocina', '[\"Como chef, he aprendido que la simplicidad es una de las virtudes más poderosas y subestimadas en la cocina. La tentación de crear platos complicados con múltiples ingredientes y técnicas puede ser fuerte, pero a menudo es en la simplicidad donde se encuentra la verdadera esencia de la gastronomía. Aquí quiero compartir algunas reflexiones sobre cómo buscar y abrazar la simplicidad en tus platos.\",\"El primer paso hacia la simplicidad es seleccionar ingredientes de alta calidad. Cuando los ingredientes son frescos y de buena calidad, no necesitan mucha manipulación para brillar. Un tomate maduro de temporada, un aceite de oliva virgen extra o un trozo de pescado fresco pueden ser transformados en platos extraordinarios con un mínimo de intervención. Deja que los ingredientes hablen por sí mismos.\",\"En lugar de sobrecargar tus platos con muchos componentes, enfócate en unos pocos ingredientes que se complementen bien. Un plato con tres o cuatro elementos bien equilibrados puede ser más impactante y memorable que uno con una docena de componentes. La clave está en resaltar los sabores naturales y la armonía entre ellos.\",\"Opta por técnicas de cocina que realcen los ingredientes sin complicar el proceso. Métodos como asar, grillar, saltear y hervir al vapor son efectivos y permiten que los ingredientes mantengan sus sabores y texturas originales. La simplicidad en la técnica también hace que el proceso de cocinar sea más accesible y menos estresante.\",\"La simplicidad no solo se refleja en el sabor, sino también en la presentación. Un plato bien presentado no necesita ser elaborado para ser atractivo. Coloca los alimentos de manera ordenada y utiliza la vajilla adecuada para realzar la belleza natural de los ingredientes. Un toque de hierbas frescas o un chorrito de aceite de oliva pueden ser suficientes para añadir color y elegancia.\",\"Una parte fundamental de la simplicidad es el uso juicioso de condimentos. La sal y la pimienta, usadas correctamente, pueden transformar un plato. Aprende a sazonar con precisión, probando a medida que cocinas, para resaltar los sabores naturales sin enmascararlos. A veces, menos es más cuando se trata de especias y aderezos.\",\"Muchas cocinas tradicionales del mundo se basan en la simplicidad. La cocina italiana, por ejemplo, se centra en platos con pocos ingredientes, donde cada componente es esencial. Observa y aprende de estas tradiciones, donde la simplicidad es clave para crear platos deliciosos y satisfactorios.\",\"En resumen, buscar la simplicidad en la cocina no significa hacer concesiones en sabor o creatividad. Al contrario, es un camino hacia una cocina más auténtica, donde los ingredientes y técnicas se utilizan de manera consciente y respetuosa. Como chef, mi objetivo es siempre honrar la integridad de los ingredientes y permitir que su verdadera esencia brille. Recuerda, en la cocina, como en la vida, a menudo las cosas más simples son las más extraordinarias.\"]', '2024-05-20 13:45:54.158872', '2024-06-29 22:16:49.000000', '33c41d90-6191-4f35-8092-8060ea4f6967', 3, 'http://res.cloudinary.com/deumagcgr/image/upload/v1716212752/yjrm0y5gatofuwz5yaly.png'),
('7a875db2-89f5-44e0-8f08-f1751c84b75f', 'Descubriendo el Placer de Cocinar: Mi Refugio Contra el Estrés Laboral', '[\"Hola a todos, soy Ana, una joven profesional de 25 años que, como muchos de ustedes, lidia con el estrés del trabajo diario. Hace un tiempo, encontré una forma maravillosa de relajarme y desconectar del bullicio de la vida laboral: la cocina. Quiero compartir cómo esta actividad se ha convertido en mi refugio y por qué creo que puede hacer lo mismo por ti.\",\"El descubrimiento inesperado\",\"Mi viaje culinario comenzó casi por accidente. Después de un día especialmente agotador en la oficina, decidí intentar cocinar una receta sencilla que había visto en internet. No esperaba mucho, solo quería ocupar mi mente con algo diferente. Lo que no anticipé fue la sensación de calma y satisfacción que sentí al preparar mi propia comida. Desde entonces, cocinar se ha convertido en mi manera favorita de desestresarme.\",\"El poder terapéutico de la cocina\",\"Cocinar es una actividad que involucra todos los sentidos: desde el aroma de las especias hasta el sonido del cuchillo al cortar los vegetales. Esta inmersión sensorial me ayuda a desconectar del estrés del trabajo y a centrarme en el presente. Además, seguir una receta paso a paso se convierte en una forma de meditación activa, donde cada movimiento tiene un propósito y me permite escapar de las preocupaciones cotidianas.\",\"Creatividad en la cocina\",\"Otro aspecto que me encanta de cocinar es la oportunidad de ser creativa. A diferencia de las tareas rutinarias del trabajo, en la cocina puedo experimentar y probar nuevas combinaciones de sabores. Esta libertad creativa no solo es liberadora, sino que también me da una gran satisfacción personal cuando mis experimentos resultan en platos deliciosos.\",\"Beneficios para la salud\",\"Cocinar en casa también tiene beneficios para la salud. Controlar los ingredientes que uso me ha permitido comer de manera más saludable y consciente. He descubierto que preparar mis propias comidas me hace sentir mejor, tanto física como mentalmente, y es una excelente forma de autocuidado.\",\"Cocinar como acto de amor\",\"Finalmente, cocinar para mis seres queridos ha añadido una capa extra de felicidad a esta actividad. Ver a mis amigos y familiares disfrutar de los platos que preparo es increíblemente gratificante. La cocina se ha convertido en una forma de expresar amor y cuidado, fortaleciendo mis relaciones personales.\",\"En resumen, la cocina ha pasado de ser una tarea a convertirse en mi refugio contra el estrés laboral. Si aún no lo has probado, te animo a que te pongas el delantal y experimentes por ti mismo el placer de cocinar. No necesitas ser un chef experto para disfrutar de los beneficios terapéuticos de esta maravillosa actividad. ¡Atrévete a descubrir el chef que llevas dentro y deja que la cocina sea tu escape y tu oasis de tranquilidad!\"]', '2024-06-06 16:05:49.127716', '2024-06-06 16:05:49.127716', '836b425e-202b-483f-b7b2-076bdb8468b5', 1, 'http://res.cloudinary.com/deumagcgr/image/upload/v1717689948/jpnbiqsqiwomfvwrxdex.jpg'),
('a67447b5-0cfc-401b-afb1-8b37496cf8aa', 'Reportaje Especial: La Importancia Vital de un Desayuno Nutritivo', '[\"En la frenética y a menudo caótica urbe de Metrópolis, donde el ritmo de vida es tan rápido como los vuelos de Superman sobre nuestros cielos, es fácil pasar por alto la importancia fundamental de un buen desayuno. Sin embargo, detrás de las primeras horas de la mañana se esconde un tesoro de vitalidad y energía que podría definir el curso de nuestro día.\",\"Un buen desayuno no es solo una comida más en el calendario de nuestras actividades diarias. Es la base sobre la cual construimos la energía y la claridad mental que necesitamos para enfrentar los desafíos que nos esperan. Desde mi posición aquí en el Daily Planet, he sido testigo de innumerables historias de individuos que han subestimado el poder transformador de comenzar el día con los nutrientes adecuados.\",\"¿Qué hace exactamente que un desayuno sea \\\"bueno\\\"? No se trata solo de llenar el estómago con calorías vacías o azúcares refinados que solo proporcionan un impulso temporal de energía. Un desayuno nutritivo se compone de alimentos que proporcionan una combinación equilibrada de carbohidratos, proteínas, grasas saludables, vitaminas y minerales. Esto significa alimentos como cereales integrales, frutas frescas, lácteos bajos en grasa, huevos, frutos secos y semillas.\",\"El impacto de un desayuno adecuado se extiende mucho más allá de simplemente satisfacer el hambre matutina. Numerosos estudios han demostrado que quienes desayunan regularmente tienden a tener un peso más saludable, ya que están menos inclinados a comer en exceso durante el resto del día. Además, un desayuno equilibrado puede mejorar la concentración, la memoria y el rendimiento cognitivo, lo que es esencial tanto para los estudiantes que se enfrentan a un día de aprendizaje como para los profesionales que buscan destacarse en el trabajo.\",\"Pero más allá de los beneficios individuales, un desayuno nutritivo también tiene un impacto en la salud pública en general. En una época en la que las enfermedades crónicas como la obesidad, la diabetes y las enfermedades cardiovasculares están en aumento, invertir en hábitos alimenticios saludables desde una edad temprana puede marcar la diferencia en la calidad de vida a largo plazo.\",\"Lamentablemente, la realidad es que muchas personas pasan por alto el desayuno debido a las demandas de tiempo y la presión de las responsabilidades diarias. Ya sea debido a madrugones para llegar al trabajo a tiempo o a la prisa matutina para llevar a los niños a la escuela, el desayuno a menudo se sacrifica en aras de la conveniencia. Sin embargo, este sacrificio puede tener consecuencias a largo plazo para nuestra salud y bienestar.\",\"Como ciudadanos de Metrópolis y del mundo en general, debemos priorizar la importancia de un desayuno nutritivo. Esto implica no solo educarnos a nosotros mismos sobre los beneficios que aporta, sino también abogar por políticas y programas que promuevan el acceso equitativo a alimentos saludables para todos. Ningún niño debería comenzar el día con el estómago vacío debido a la falta de recursos en el hogar, y ningún adulto debería tener que elegir entre el desayuno y llegar puntual al trabajo.\",\"En resumen, el desayuno es mucho más que una comida. Es una oportunidad diaria para nutrir nuestro cuerpo y nuestra mente, para establecer el tono de un día exitoso y saludable. Así que la próxima vez que estés tentado de saltarte el desayuno en favor de unos minutos extra de sueño o de una taza de café rápida, recuerda que estás dejando pasar una oportunidad invaluable para invertir en tu salud y bienestar a largo plazo.\"]', '2024-05-16 12:52:37.526340', '2024-05-16 13:00:12.120035', '23c5eafc-8116-4ef1-9d12-538de743cac3', 2, 'http://res.cloudinary.com/deumagcgr/image/upload/v1715863956/c4axu2gmo3shpsgt55xg.jpg'),
('d581194d-1dc9-40cf-bbf7-21879c13c34a', 'Consejos Esenciales para Principiantes en la Cocina', '[\"¡Hola a todos! Soy Ana, una apasionada de la cocina desde hace más de una década. A lo largo de los años, he aprendido que la cocina es mucho más que seguir recetas; es una forma de expresión, una terapia y, sobre todo, una fuente de alegría. Si estás comenzando tu viaje culinario, aquí tienes algunos consejos esenciales para empezar con buen pie.\",\"1. Organiza tu espacio y tus ingredientes.\",\"Antes de empezar a cocinar, asegúrate de tener todo lo que necesitas a mano. Esto incluye no solo los ingredientes, sino también los utensilios. Tener un espacio limpio y organizado te permitirá trabajar de manera más eficiente y disfrutar del proceso. Lee la receta completa antes de comenzar y prepara todos los ingredientes necesarios, conocidos como “mise en place” en términos culinarios. Esto te ayudará a evitar sorpresas y a mantener el control en la cocina.\",\"2. Invierte en utensilios básicos de calidad.\",\"No necesitas una cocina llena de gadgets sofisticados para empezar. Sin embargo, invertir en algunos utensilios de calidad marcará una gran diferencia. Un buen cuchillo de chef, una tabla de cortar, una sartén antiadherente y una olla robusta son esenciales. Estos básicos te permitirán realizar la mayoría de las recetas sin complicaciones.\",\"3. Aprende las técnicas básicas.\",\"Antes de lanzarte a recetas complejas, es importante dominar algunas técnicas básicas. Aprende a picar, rebanar, y cortar en juliana. Practica técnicas de cocción como saltear, hervir y hornear. Dominar estas habilidades te dará confianza y te permitirá abordar una variedad más amplia de recetas con facilidad.\",\"4. No tengas miedo de experimentar.\",\"La cocina es un espacio creativo. No tengas miedo de ajustar recetas según tus gustos y preferencias. Si una receta pide un ingrediente que no tienes, busca sustitutos o improvisa. La mayoría de las veces, encontrarás que tus variaciones añaden un toque personal que hace que el plato sea único y delicioso.\",\"5. Prueba y ajusta los sabores.\",\"Un consejo crucial es probar tu comida a medida que cocinas. De esta manera, puedes ajustar los condimentos y asegurarte de que los sabores estén equilibrados. Recuerda que es más fácil agregar más sal o especias que quitar exceso. Así que ve poco a poco y ajusta al gusto.\",\"6. Mantén la calma y diviértete.\",\"Es normal cometer errores, especialmente cuando estás empezando. Lo más importante es no desanimarse. Cada error es una oportunidad de aprendizaje. La cocina debe ser una experiencia divertida y relajante, no una fuente de estrés. Pon música, disfruta del proceso y celebra tus éxitos, por pequeños que sean.\",\"7. Busca inspiración y sigue aprendiendo.\",\"La inspiración está en todas partes: en libros de cocina, programas de televisión, blogs y redes sociales. Sigue a chefs que te inspiran y prueba nuevas recetas regularmente. Además, considera tomar clases de cocina, ya sea en persona o en línea, para expandir tus habilidades y conocimientos.\",\"8. Comparte tus creaciones.\",\"Una de las mayores alegrías de cocinar es compartir tu comida con los demás. Invita a amigos y familiares a probar tus creaciones. No solo recibirás comentarios valiosos, sino que también disfrutarás de la alegría de ver a otros disfrutar de tus platos.\",\"Recuerda, el viaje culinario es una maratón, no una carrera de velocidad. Cada vez que cocinas, mejoras y te acercas más a convertirte en el chef que aspiras ser. ¡Así que ponte el delantal, enciende la estufa y deja que tu pasión por la cocina te guíe! ¡Feliz cocinando!\"]', '2024-05-20 13:36:33.531350', '2024-05-20 13:48:34.972774', '836b425e-202b-483f-b7b2-076bdb8468b5', 3, 'http://res.cloudinary.com/deumagcgr/image/upload/v1716212192/spdtdmu62pic7wig3m1l.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`categoryId`, `category`) VALUES
(1, 'carnes y aves'),
(2, 'pastas'),
(3, 'legumbres y verduras'),
(4, 'salsas'),
(5, 'postres y dulces'),
(6, 'reposteria'),
(7, 'bebidas y cocteles'),
(8, 'sopas y cremas'),
(9, 'pescados y mariscos'),
(10, 'masas y pan'),
(11, 'Arroz'),
(12, 'vegana'),
(13, 'Ensaladas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comment`
--

CREATE TABLE `comment` (
  `commentId` int(11) NOT NULL,
  `comment` text NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` varchar(36) DEFAULT NULL,
  `recipeId` varchar(36) DEFAULT NULL,
  `articleId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comment`
--

INSERT INTO `comment` (`commentId`, `comment`, `createdAt`, `updatedAt`, `userId`, `recipeId`, `articleId`) VALUES
(2, 'Muy buen articulo. ', '2024-06-07 18:11:33.569224', '2024-06-07 18:11:33.569224', '13b160b7-8234-48d1-b57a-1ecc98785951', NULL, '3330173d-cedf-4aed-9173-7bb306dfca21'),
(4, 'Gracias por compartir tus experiencias.\n', '2024-06-07 23:31:52.025314', '2024-06-07 23:31:52.025314', '68c5e807-ddd4-4d74-8843-a0d1dbf04523', NULL, '7a875db2-89f5-44e0-8f08-f1751c84b75f'),
(8, 'Muy interesante', '2024-06-10 17:30:20.345697', '2024-06-10 17:30:20.345697', 'cb3e9c7c-efe3-4cdf-82ea-733c9c30d4e8', NULL, 'a67447b5-0cfc-401b-afb1-8b37496cf8aa'),
(9, 'Un buen desayuno me da la fuerza para afrontar el día.', '2024-06-14 14:48:09.800659', '2024-06-14 14:48:09.800659', 'fc10979c-f60e-4804-b263-ba0091b802d6', NULL, 'a67447b5-0cfc-401b-afb1-8b37496cf8aa'),
(10, 'A tener en cuenta!', '2024-06-25 13:40:28.467132', '2024-06-25 13:40:28.467132', '836b425e-202b-483f-b7b2-076bdb8468b5', NULL, '72d44e24-b299-424c-8928-bb348ab3fcb3'),
(11, 'Genial como  siempre', '2024-06-25 13:42:06.823360', '2024-06-25 13:42:06.823360', '836b425e-202b-483f-b7b2-076bdb8468b5', NULL, 'a67447b5-0cfc-401b-afb1-8b37496cf8aa'),
(13, 'Concuerdo totalmente!!', '2024-06-25 13:55:47.244186', '2024-06-25 13:55:47.244186', '105ed090-ac9b-47ca-aeb0-60ce1a7abbfc', NULL, 'd581194d-1dc9-40cf-bbf7-21879c13c34a'),
(15, 'rico', '2024-06-25 23:51:53.586577', '2024-06-25 23:51:53.586577', '105ed090-ac9b-47ca-aeb0-60ce1a7abbfc', NULL, NULL),
(16, 'Sencillito y riquito!!', '2024-06-25 23:56:02.738488', '2024-06-25 23:56:02.738488', '105ed090-ac9b-47ca-aeb0-60ce1a7abbfc', 'ec9cf51a-1156-4510-a95b-bc5a4e67ae64', NULL),
(18, 'rico', '2024-06-26 00:30:20.591806', '2024-06-26 00:30:20.591806', '23c5eafc-8116-4ef1-9d12-538de743cac3', '141bddb7-f241-4a50-8646-6d2ff2d00651', NULL),
(19, 'Me encanto!', '2024-06-26 00:32:45.293992', '2024-06-26 00:32:45.293992', '23c5eafc-8116-4ef1-9d12-538de743cac3', NULL, '72d44e24-b299-424c-8928-bb348ab3fcb3'),
(22, 'Me encanto!!', '2024-06-26 13:37:51.639271', '2024-06-26 13:37:51.639271', '13b160b7-8234-48d1-b57a-1ecc98785951', NULL, 'd581194d-1dc9-40cf-bbf7-21879c13c34a'),
(23, 'Ya quiero probarlo.', '2024-06-26 13:38:27.688521', '2024-06-26 13:38:27.688521', '13b160b7-8234-48d1-b57a-1ecc98785951', '5d9074b5-1580-4a8b-817f-274df789d387', NULL),
(24, 'Ideal para los chicos(y no tan chicos 😜)', '2024-06-29 22:32:23.251319', '2024-06-29 22:32:23.251319', '33c41d90-6191-4f35-8092-8060ea4f6967', '54141541-7d85-4396-a2f6-dff76f9ca96f', NULL),
(41, 'A tener en cuenta', '2024-06-30 21:39:36.155937', '2024-06-30 21:39:36.155937', 'cb3e9c7c-efe3-4cdf-82ea-733c9c30d4e8', NULL, '3330173d-cedf-4aed-9173-7bb306dfca21'),
(42, 'Se me hace agua la boca.', '2024-06-30 21:42:09.953399', '2024-06-30 21:42:09.953399', 'cb3e9c7c-efe3-4cdf-82ea-733c9c30d4e8', 'ecea4675-bfea-4e1a-951c-0d6b51b84bce', NULL),
(52, 'ideal para el almuerzo.', '2024-06-30 23:14:23.280590', '2024-06-30 23:14:23.280590', 'fc10979c-f60e-4804-b263-ba0091b802d6', '6a298a96-e451-4d2e-a751-669ce374ffe2', NULL),
(58, 'Muy buen articulo.', '2024-07-02 17:43:12.279293', '2024-07-02 17:43:12.279293', '13b160b7-8234-48d1-b57a-1ecc98785951', NULL, '2c67432b-7662-4811-a8ad-84584836a895');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recipe`
--

CREATE TABLE `recipe` (
  `recipeId` varchar(36) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `instructions` text NOT NULL,
  `ingredients` text NOT NULL,
  `image` varchar(100) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` varchar(36) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `recipe`
--

INSERT INTO `recipe` (`recipeId`, `title`, `description`, `instructions`, `ingredients`, `image`, `createdAt`, `updatedAt`, `userId`, `categoryId`) VALUES
('034444e4-5756-4820-b67e-3eaf9eb59673', 'Arrollado de papa.\n', '[\"En Argentina, se suele preparar para las reuniones familiares de Navidad y Fin de Año el clásico arrollado con masa de pionono. Como aquí hace calor para estas fechas, se sirve frío. En esta ocasión, a través de RecetasGratis, podrás conocer esta alternativa caliente hecha con papa, una receta fácil, práctica y, sobre todo, deliciosa!\"]', '[\"Hidrata los tomates secos en agua caliente. Lava y pincha la papa para cocinarla con su piel en el microondas por 6 minutos. Pasado ese tiempo, gírala y cocínala por 6 minutos más.\",\"Con cuidado de no quemarte, pela la papa. Si queda algún pedacito de piel no te preocupes porque previamente la has lavado y quedará un puré más rústico. Así pues, tritúrala y condiméntala al gusto.\",\"Cuando el sabor del puré esté a tu gusto, deja que se entibie un poco y agrega el huevo. Mezcla y reserva para seguir con la receta de arrollado de papa.\",\"Cubre la mesa con papel film y distribuye sobre él el puré formando un rectángulo de 2 cm de alto.\",\"Agrega los tomates secos previamente hidratados, sobre ellos coloca el jamón y, por último, el queso. Puedes hacer el arrollado de papa con el queso que más te guste, mientras esté cortado en lonchas. Igualmente, si quieres hacer un arrollado de papa vegetariano, simplemente elimina el jamón y sustitúyelo por otro ingrediente, como espinacas.\",\"Comienza a enrollar tu arrollado de papa con la ayuda del papel film para ir presionando.\",\"Cierra los extremos del papel film como si fuese un caramelo y coloca el arrollado de papa sobre una bandeja para horno. Hornéalo durante 15 minutos aproximadamente.\",\"Sírvelo abriendo el film con cuidado de no quemarte. Puedes cubrirlo con una salsa de verdeo y cortarlo en rodajas de unos 2 dedos de ancho para que no se te desarme. Acompaña tu arrollado de papa, jamón y queso con una ensalada fresca de hojas verdes o una ensalada caprese.\\n\\n\"]', '[\"450 gramos de papa.\",\"1 huevo.\",\"70 gramos de jamón cocido.\",\"100 gramos de queso de máquina (cortado en lonchas)\",\"5 tomates secos.\",\"1 cucharada postre de nuez moscada.\",\"½ cucharada postre de pimienta.\",\"1 cucharada postre de puré de ajo.\"]', 'http://res.cloudinary.com/deumagcgr/image/upload/v1716211219/z9crzsgvwplh6pxgkdkq.png', '2024-05-20 13:20:21.206624', '2024-05-20 13:20:21.206624', '13b160b7-8234-48d1-b57a-1ecc98785951', 2),
('141bddb7-f241-4a50-8646-6d2ff2d00651', 'Pollo a asado a la cerveza', '[\"El pollo asado es uno de los platos que más suelo preparar cuando no quiero invertir mucho tiempo en la cocina, pero no quiero dejar de comer rico. Admite infinidad de guarniciones y condimentos, los cuales voy cambiando para no cansarme de ellos. Hoy le ha tocado el turno a la cerveza, una bebida que, además de entrar sola cuando hace calor, es ideal para aportar sabor a nuestros platos de pollo o carne.\",\"Según la variedad de cerveza que usemos, puede que la salsa salga con un exceso de amargor. Para curarme en salud, al pollo asado con cerveza suelo añadirle una cucharadita de miel, cuyo dulzor equilibra perfectamente el gusto de la cerveza. Pruébalo; queda muy rico.\",\"El acompañamiento estrella de toda buena receta de pollo al horno son las patatas, así que es la guarnición que he elegido en esta ocasión. Si prefieres una opción más ligera, puedes sustituirlas por fruta, como hago cuando preparo mi pollo al horno con manzanas y ciruelas o este riquísimo pollo al horno con uvas y chalotas.\",\"Dicho todo esto, vamos a lo que importa. Veamos cómo preparar pollo al horno con cerveza paso a paso.\",\"A disfrutar!  \"]', '[\"Precalienta el horno a 180 ºC con calor arriba y abajo. Prepara los vegetales de la receta. Retira la piel de la cebolla, pártela en dos y córtala en juliana. Lava la patata, pélala y córtala en rodajas finas. En cuanto a los dientes de ajo, dales un golpe para que se abran ligeramente, pero no les quites la piel.\",\"Coloca estos ingredientes junto con la hoja de laurel en una fuente apta para horno. Vierte la cerveza, agrega la miel y echa un poquito de sal, que la patata es muy sosa y lo agradece.\",\"Por otro lado, salpimenta los cuartos de pollo por dentro y por fuera. Dispón el pollo en la fuente con la piel mirando hacia abajo. Echa por encima las hierbas provenzales y riega todo con un hilo de aceite.\",\"Mete la fuente en el horno, a una altura media, y cocina durante unos 50 minutos aproximadamente. Pasado este tiempo, da la vuelta a los trozos de pollo, sube la temperatura del horno a 200 ºC y cocina otros 10 minutos. Así la piel del pollo quedará bien doradita. Aprovecha también para regar todo con el jugo que habrá en el fondo de la fuente.\",\"Cuando la piel tenga un color dorado que sea de tu gusto, saca del horno tu pollo con cerveza. Sírvelo inmediatamente con su guarnición de patatas y cebolla.\"]', '[\"2 cuartos traseros de pollo campero\",\"1 cebolla\",\"1 papa grande\",\"1 hoja de laurel\",\"150 ml de cerveza\",\"2 dientes de ajo\",\"1 cucharada de miel\",\"1 hoja de laurel\",\"aceite de oliva virgen extra\",\"hierbas provenzales\",\"pimienta negra recién molida\",\"sal\"]', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715804792/tpwcvwquk5fbimiealjl.jpg', '2024-05-15 20:26:32.800675', '2024-06-28 21:22:00.000000', '944ffe1b-e114-449a-8fb1-1d6e2e1b2544', 1),
('54141541-7d85-4396-a2f6-dff76f9ca96f', 'Helado de yogur y limón', '[\"Bueno, para aliviar este calor sofocante os traigo un nuevo helado. Ya sabéis que tenemos una sección con un montón de sabores para que podáis experimentar durante las vacaciones. En los próximos días os traeré alguno más pero en esta ocasión probaremos el sabor favoritos de Javi: limón. El proceso de elaboración es muy sencillo. En nuestros reels de Instagram vas a  encontrar un video con la elaboración. Lo primero, antes de nada, haz un hueco en tu congelador. Segundo, busca esos moldes de helados que deberías tener en el fondo de algún cajón.\"]', '[\"Lava y seca el limón y ralla la piel. Ponla en el vado de la thermomix.,Exprime el limón hasta obtener 80 ml de zumo y vierte en el vaso de la Thermomix,Añade el yogur griego, el edulcorante y mezcla 30 segundos en velocidad 3. Vierte la mezcla en los moldes de helado y llega al congelador hasta que hayan congelado en su totalidad.,Saca unos minutos antes para que sean más fáciles de desmoldar. A disfrutar.\"]', '[\"La ralladura de medio limón,80 ml de zumo de limón,350 g de yogur griego,40 ml de sirope de ágave o endulzante al gusto,*si los yogures son azucarados no añadas endulzante extra.,6 moldes de helado\"]', 'http://res.cloudinary.com/deumagcgr/image/upload/v1719612767/i8irluo6iu7rdcppg4gt.png', '2024-06-28 22:12:48.323765', '2024-06-28 22:12:48.323765', '944ffe1b-e114-449a-8fb1-1d6e2e1b2544', 5),
('5d9074b5-1580-4a8b-817f-274df789d387', 'Merluza rellena de gambas', '[\"Deleita a tus seres queridos con un plato tan tradicional como exquisito: una merluza rellena de gambas. La merluza es uno de los pescados estrella de estas fechas y, aunque sola está muy rica, si dentro le colocamos un delicioso relleno, lo estará mucho más.\",\"Esta forma de preparar el pescado nos dará un poco más de trabajo que hacerlo simplemente al horno o en salsa, pero la ocasión lo merece. Si quieres una alternativa elegante y sabrosa a la clásica merluza en salsa verde, prepara esta receta.\",\"Cuando vayas a la pescadería, pídele al pescadero una cola de merluza grande y hermosa, en función del número de comensales que seáis. Pídele que la prepare abierta por la mitad, como si fuera un libro, pues es para rellenarla.\",\"Ten en cuenta que en este tipo de recetas de pescado sencillas, como la lubina a la sal o la dorada al horno, la calidad de la materia prima se nota enormemente. Cuanto mejor sea, más rico saldrá el plato. Dicho todo esto, vamos con la receta.\"]', '[\"Prepara el fumet de pescado casero\",\"Comenzamos preparando un caldo o fumet de pescado que usaremos para hacer el relleno. Lo haremos con las cabezas de las gambas y de la merluza, así como con las verduras que quieras: una cebolla, las hojas de los puerros, una zanahoria…\",\"Vierte un chorrito de aceite en una cazuela y dora las cabezas de pescado. Si tienes la espina de la merluza, échala también. Cuando empiecen a soltar su aroma, añade una cebolla cortada en cuartos, las hojas de los puerros bien limpias y una zanahoria pelada. También puedes incorporar una hoja de laurel.\",\"Vierte agua hasta que cubra los ingredientes y deja cocer durante 25 minutos más o menos. Pasado este tiempo deja que el caldo pierda un poco de temperatura, para que no te quemes al manipularlo. Cuélalo y resérvalo para más adelante.\",\"Prepara el relleno de la merluza\",\"Lava los puerros, pártelos por la mitad y córtalos en juliana. Pela y pica el diente de ajo finamente.\",\"En una cazuela amplia vierte un chorrito de aceite de oliva virgen extra. Incorpora el puerro, el ajo y un poco de sal. Pocha estos vegetales hasta que el puerro comience a estar blando y tenga algo de colorcito.\",\"Mientras, limpia las setas y pártelas en trocitos pequeños. Añádelas y cocínalas unos 12 minutos.\",\"Cuando todo esté bien blandito, agrega el vino blanco, sube un poco el fuego y deja que reduzca a la mitad.\",\"Añade la harina, mezcla y sigue cocinando un par de minutos.\",\"Seguidamente, añade 200 ml del caldo que hemos preparado anteriormente. Dejar hervir mientras remueves; verás como poco a poco se espesa. Seguidamente, añade también la leche y mezcla hasta que se integre. Cocina hasta que la mezcla esté bastante espesa.\",\"Incorpora las gambas y cocina un par de minutos más. Rectifica el punto de sal. Reserva.\",\"Termina tu merluza rellena de gambas\",\"Precalienta el horno a 180 ºC.\",\"Si no lo ha hecho el pescadero, abre la cola de merluza por la mitad, en forma de libro.\",\"Echa un poco de aceite en una bandeja de horno o cúbrela con papel. Así el pescado no se pegará.\",\"Encima, coloca el pescado abierto. Echa un poquito de sal. Sobre uno de los lomos dispón el relleno, que ya estará más o menos frío. Cierra con el otro lomo.\",\"Hornea a 180 ºC durante 6 o 7 minutos.\",\"Saca la bandeja del horno y extiende una capa fina de mayonesa por encima de la merluza.\",\"Sube la temperatura del horno a 200 ºC y vuelve a hornear otros 6 o 7 minutos hasta que la mayonesa empiece a tomar color.\",\"Sirve tu merluza rellena de gambas recién hecha, cuando aún está calentita.\"]', '[\"1 cola de merluza entera (1 kg aproximadamente)\",\"225 g de gambas\",\"125 g de setas\",\"2 puerros\",\"1 diente de ajo\",\"150 ml de leche entera\",\"75 ml de vino blanco\",\"2 cucharadas soperas de harina\",\"aceite de oliva virgen extra\",\"sal\",\"150 g de mayonesa\",\"200 ml de caldo de pescado casero\",\"pimienta a gusto\"]', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715954998/anga3ythmcb45a3gv5rd.jpg', '2024-05-17 14:09:57.577153', '2024-06-28 23:02:35.000000', '41815f0b-a90f-4718-b8f6-8a6a2935dd47', 9),
('6a298a96-e451-4d2e-a751-669ce374ffe2', 'Ensalada de patata y cebolla morada', '[\"No quería irme a trabajar sin traeros receta nueva… y es que sigue haciendo mucho calor. Ayer estábamos a 32ºC aquí y la noche ha sido también de altas temperaturas. Hemos estado todos igual excepto un poco por el norte,  así que he pensado que esta ensalada de patata y cebolla morada todavía nos viene bien… Os dejo VIDEO aquí.\",\"La previsión del tiempo es que lloverá esta semana y no sabéis que ganas tengo de ver agua y de ponerme un jersey. Estoy deseando que bajen las temperaturas y dormir tapadita… no puedo con los “calores”, es too much… ¿Os pasa???…\",\"Como Septiembre está siendo la nueva cuesta de Enero con mil gastos con los coles y con todo lo que ha subido la cesta de la compra, veréis que es una receta muy económica… tiene mil tunéos y podéis añadir huevos, taquitos de jamón, trozos de salchichas, manzana verde, frutos secos, zanahorias… pero así ya está deliciosa y no necesita más.\",\"No lleva nada de tiempo, es cocer solo las patatas y el resto coser y cantar. Disfrutadla!!!! Un besazo familia!!\"]', '[\"\\r\\nPon en vaso en el agua y el varoma en su posición con las patatas lavadas con piel y programa 30 minutos, Varoma, velocidad 1. Reserva.\",\"Pela la cebolla morada y corta en juliana, deja en un cuenco con agua con hielo unos 15 minutos para que quede más suave de sabor pero crujiente. Corta en taquitos pequeñitos los pepinillos y reserva.\",\"Pon un un vaso alto los ingredientes de la salsa de mahonesa y bate con una cuchara.\",\"Para las patatas cortadas en trozos o por la mitad a una fuente, agrega la cebolla escurrida, los pepinillos y la salsa e integra bien. Sirve con perejil picadito y a disfrutar.\"]', '[\"Para las patatas:\",\"800 ml de agua\",\"700-800 g de patatas nuevas, enteras con piel\",\"1 cebolla morada cortada en juliana\",\"2-4 pepinillos\",\"Para la salsa:\",\"5 cucharadas de mahonesa o lactonesa\",\"1 cucharada de mostaza\",\"1 pizca de miel\",\"unas gotas de limón\",\"2 cucharadas de aceite de oliva virgen extra\",\"1 cucharadita de vinagre\",\"Sal y pimienta al gusto\",\"Perejil fresco picadito\\r\\n\"]', 'http://res.cloudinary.com/deumagcgr/image/upload/v1719782101/kkxnm22w1sbtrhl01hqc.png', '2024-06-30 21:15:00.424191', '2024-06-30 21:15:00.424191', '41815f0b-a90f-4718-b8f6-8a6a2935dd47', NULL),
('a39b05d2-3a12-4bf5-8995-60e062f70e6a', 'Receta de pasta con espinacas y queso ricotta', '[\"La pasta es uno de los alimentos más consumidos en el mundo y no es de extrañar: es barata, fácil de preparar y combina con infinidad de alimentos. En esta receta vamos a utilizar dos ingredientes clásicos de la cocina italiana: las espinacas frescas y el queso ricotta. Con ellos conseguiremos un plato de pasta ligero, pero muy sabroso.\",\"¿Pero qué es el queso ricotta? Se trata de un derivado lácteo similar a nuestro requesón, aunque de textura más cremosa y sabor menos ácido. Es típico de Italia, donde lo utilizan tanto en postres como en platos salados.\",\"En mi opinión, la receta queda mejor con pasta corta, como los rigatoni o los penne, los cuales quedan bañados por la cremosidad de la salsa de espinacas y ricotta. Si te gustan este tipo de texturas, echa un ojo a esta pasta con nata, setas y jamón cocido, o a esta cremosa pasta con brócoli, bacon y salsa de nata. Dicho esto, paso a explicarte cómo hacer esta pasta con espinacas, receta italiana que encantará a toda la familia.\"]', '[\"Comienza por lavar y trocear las espinacas. Procura retirar los tallos que veas más gruesos.\",\"Pon a calentar un recipiente con agua. Cuando empiece a hervir, añade un poquito de sal y echa la pasta. Cuécela según lo que te indique el paquete para dejarla al dente.\",\"Mientras, de manera paralela, vamos a ir haciendo la salsa. Para ello vierte las 2 o 3 cucharadas de aceite de oliva en una sartén grande y saltea las espinacas. Al principio no te cabrán todas, así comienza añadiendo unas pocas y, según se vayan ablandando, incorpora el resto. Verás que se quedan en nada de volumen. Echa un poquito de sal, que también ayudará a que suelte el agua. En este punto no las cocines en exceso, solo lo justo para que queden blanditas.\",\"Una vez estén cocinadas las espinacas, añade el queso ricotta y deja que se funda mientras vas removiendo.\",\"Ahora, añade un poco del parmesano y un par de cucharones del agua de cocer la pasta. Sazona también con la pimienta blanca y un poquito de nuez moscada. Mezcla todo bien hasta obtener una salsa ligera.\",\"Incorpora la pasta que acabas de cocer y saltea todo durante un minuto más para que los sabores se amalgamen.\",\"Por último, remata con las nueces peladas y ligeramente picadas, así como un poco más de queso parmesano. Sirve tu pasta con espinacas y queso ricotta inmediatamente.\"]', '[\"320 g de pasta corta tipo rigatoni\",\"400 g de espinacas frescas\",\"250 g de queso ricotta\",\"75 g de nueces ya peladas\",\"60 g de queso parmesano rallado\",\"2 o 3 cucharadas de aceite de oliva virgen\",\"pimienta blanca\",\"nuez moscada\",\"sal a gusto\"]', 'http://res.cloudinary.com/deumagcgr/image/upload/v1719673690/wb3rtv90966iwhtq69wi.jpg', '2024-06-29 15:08:09.846477', '2024-06-29 15:09:38.000000', '33c41d90-6191-4f35-8092-8060ea4f6967', 2),
('d9ca6b19-0a77-4f16-9190-20ea864e7767', 'Ñoquis de papa con maicena.', '[\"¿Conoces la tradición de los ñoquis del 29? Esta costumbre nació en Italia, donde Pantaleón curaba a los enfermos. Un 29 de diciembre, hambriento, tocó la puerta de unos campesinos, quienes lo invitaron a compartir la comida hecha con ingredientes económicos que disponían: ñoquis. Agradecido, Pantaleón anunció un buen año de pesca y cosechas. La familia campesina encontró monedas de oro debajo de cada plato después de que Pantaleón se marchara, inaugurando el período de prosperidad que había anunciado. Es por ello que cada 29 del mes se acostumbra a comer este tipo de pasta, dejando bajo el plato algo de dinero con la esperanza de obtener mejoras económicas.\"]', '[\"Para hacer el puré de papa para tus ñoquis con maicena, lava y pincha 1 papa mediana. Cocínala con su piel en el microondas por 4 minutos. Pasado ese tiempo, gírala y cocínala por 4 minutos más.\",\"Tritura o pisa la papa para obtener un puré liso. Condiméntalo con nuez moscada, agrega el huevo e integra bien estos ingredientes.\",\"Agrega la maicena y amasa hasta obtener una masa homogénea y maleable.\",\"Divide la masa en bollos más chicos y, con ayuda de tus manos, forma rollos. Corta pequeños cuadrados de tamaños similares para poder obtener tus ñoquis de maicena.\",\"Con ayuda de algo más de maicena u otra harina sin gluten, marca tus ñoquis con el utensilio de cocina destinado para ello o un tenedor.\",\"En abundante agua hirviendo, cocina tus ñoquis de papa y maicena procurando no superponerlos. Una vez que floten, estarán listos. Aproximadamente, el tiempo de cocción es de 1 minuto. Sin embargo, dependerá del tamaño de los ñoquis, es por ello que recomendamos cocinar 1 ñoqui de prueba y, luego, continuar con el resto.\",\"¡Listos! Ya puedes disfrutar de esta deliciosa receta de ñoquis de papa con maicena sin gluten con tu salsa favorita o con una ensalada.\"]', '[\"260 gramos de puré de papa.\",\" 50 gramos de maicena.\",\"½ huevo.\",\"1 pizca de nuez moscada.\"]', 'http://res.cloudinary.com/deumagcgr/image/upload/v1716210369/squzehlu26ixoxx8oyll.png', '2024-05-20 13:06:11.333938', '2024-05-20 13:06:11.333938', '105ed090-ac9b-47ca-aeb0-60ce1a7abbfc', 2),
('e22f3901-b46d-48da-bcd9-ad805c7f77f9', 'Tarta milhojas de manzana', '[\"Siempre me han gustado las tartas de manzana... y esta está tan rica. Añade a tu gusto especias como canela o licores para darles todavía más sabor...\"]', '[\"Pon en el vaso los huevos, azúcar, leche, mantequilla y el licor y mezcla 25 segundos el velocidad 4.\",\"Incorpora la harina y la pizca de sal y mezcla de nuevo 20 segundos en velocidad 4. Comprueba que está bien integrado o termina de envolver con la espátula. Reserva.\",\"Lava, seca y descorazona las manzanas. Corta en laminas finitas con la ayuda de una mandolina -no es necesario pelarlas-. Forra el molde de 20 cm de diámetro desmoldable y vierte dentro las laminas de manzana -reserva unas cuantas para colocar bien en la capa de arriba. Estira bien.\",\"Vierte la mezcla del vaso sobre ellas, coloca la ultima capa bien colocadita y hornea con el horno precalentado a 180ºC con calor arriba y abajo 45-50 minutos. Pincela con mermelada de albaricoque y listo.\"]', '[\"800-900 g de manzanas golden\",\"3 huevos M\",\"80-120 g de azúcar blanquilla\",\"120 ml de leche\",\"20 g de mantequilla a temperatura ambiente\",\"20 ml de licor al gusto: coñac, pacharán… etc\",\"90 g de harina de trigo\",\"Una pizca de sal\",\"Mermelada de albaricoque para pincelar\",\"1 cucharadita de canela -opcional-\",\"Además necesitarás:\",\"Molde de 20 cm de diámetro\"]', 'http://res.cloudinary.com/deumagcgr/image/upload/v1718031043/wjtehsgaejo5q2wmb6at.png', '2024-06-10 14:50:43.628380', '2024-06-10 14:50:43.628380', '795e76f4-f2d9-4ff8-ac18-3aea02fd5093', 1),
('ec9cf51a-1156-4510-a95b-bc5a4e67ae64', 'Bizcocho de ricotta y limón', '[\"¿Quieres darle un toque especial a tus desayunos y meriendas? Prepara esta receta de bizcocho de queso ricotta y limón. Su miga tiene una textura ligeramente densa, pero jugosa, y un delicado sabor a limón. Está buenísimo.\"]', '[\"Empieza rallando el limón, el cual habrás lavado muy bien previamente. Recuerda retirar solamente la parta amarilla. Exprime el limón para sacar su zumo y reserva.\",\"Precalienta el horno a 180 °C con calor arriba y abajo. Sin ventilador.\",\"Por otro lado, bate los huevos con el azúcar hasta que estén bien espumosos. Tardarás unos 4 o 5 minutos en tenerlos listos si lo haces con un robot de cocina o con unas varillas eléctricas. Si los bates a mano, tardarás más.\",\"Bate un poco el queso ricotta en el propio envase, para hacerlo más cremoso, y añádelo. Vuelve a batir a velocidad suave para que se integre.\\r\\nIncorpora la ralladura y el zumo de limón. Vuelve a batir unos segundos a velocidad baja.\",\"Añade la harina tamizada junto con la levadura y la sal. Mezcla con una espátula realizando movimientos envolventes, de arriba a abajo, hasta que no veas restos de harina.\",\"Vierte la masa en el molde. Hornea a 180 °C durante 35-40 minutos más o menos. Para ver si está listo, clava una brocheta en el centro y, si sale limpia, ya lo tienes.\",\"Cuando tu bizcocho de ricotta y limón, sácalo del horno y deja que se temple un poco. Desmóldalo. Una vez frío, puedes decorarlo con un poco de azúcar glas si te apetece.\"]', '[\"3 huevos M\",\"200 g de azúcar blanca\",\"250 g de queso ricotta\",\"ralladura de 1 limón zumo de 1 limón\",\"220 g de harina todo uso\",\"1,5 cucharaditas de levadura\",\"1 pizca de sal\",\"azúcar glas para decorar (opcional)\"]', 'http://res.cloudinary.com/deumagcgr/image/upload/v1719148692/qci6mz3zcklgg96vdmam.jpg', '2024-06-23 13:18:12.709667', '2024-06-23 13:18:12.709667', '795e76f4-f2d9-4ff8-ac18-3aea02fd5093', 1),
('ecea4675-bfea-4e1a-951c-0d6b51b84bce', 'Matambre a la pizza parrilla', '[\"La parrilla es un punto de encuentro para los argentinos. Tanto sea la parrilla de casa, que reúne amigos y familia como la de los restaurantes, donde quienes no disponen de este instrumento en casa pueden disfrutar del plato más argentino que hay. Siempre es un buen momento para comer asado, celebraciones, cumpleaños, partidos, cualquier excusa es válida para que un argentino desee una carne cocida sobre las brasas. En esta oportunidad, junto a Recetas Gratis, te enseñaremos a preparar matambre a la pizza a la parrilla. Te enseñaremos algunos trucos para que no quede chicloso sino suave por dentro, crocante por fuera y con un delicioso sabor a los ingredientes de la pizza.\"]', '[\"Para comenzar con la preparación del matambre a la pizza, hierve el matambre unos 30 minutos para que esté más tierno. Si lo deseas, puedes saborizar el agua con laurel, así como vegetales como zanahoria, cebolla, puerro, acelga.\",\"Mientras, condimenta el puré de tomate con la provenzal seca y el ají molido para que las especias se hidraten.\",\"También lava y corta el tomate en rodajas y la mozzarella en porciones para tener todo listo antes de comenzar con la cocción de la carne en la parrilla.\",\"También lava y corta el tomate en rodajas y la mozzarella en porciones para tener todo listo antes de comenzar con la cocción de la carne en la parrilla.\",\"Ahora sí, es momento de cocinar la carne. Para ello, dispón la cara con más grasa sobre la parrilla bien caliente. Lo sabrás porque no podrás mantener tu mano encima más de 3 o 4 segundos. Mantenla de este lado por unos 10 minutos hasta que logre un color dorado como ves en la imagen. Gírala para continuar con el próximo paso.\",\"Al girar la carne, píntala con el puré de tomate y agrega el queso mozarrella. Recomendamos la tapes con una asadera o tapa de olla para que se derrita mejor.\",\"Pasados unos 5 minutos, que el queso haya empezado a derretirse, agrega las rodajas de tomate y las aceitunas. Tápalo por 2 minutos más.\",\"Sirve tu matambre a la pizza a la parrilla y listo para comer. Cuéntanos en los comentarios tu opinión y comparte con nosotros una fotografía del resultado final.\"]', '[\"1 kilogramo de matambre de cerdo.\",\"25 centímetros cúbicos de puré de tomate.\",\"1 cucharada postre de provenzal.\",\"1 pizca de ají molido.\",\"4 aceitunas.\",\"1 cucharada sopera de orégano.\",\"100 gramos de mozzarella.\",\"1 tomate.\"]', 'http://res.cloudinary.com/deumagcgr/image/upload/v1716209782/texwunkdwbgkp4vtrsoa.png', '2024-05-20 12:56:24.356203', '2024-05-20 12:56:24.356203', '105ed090-ac9b-47ca-aeb0-60ce1a7abbfc', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tag`
--

CREATE TABLE `tag` (
  `tagId` int(11) NOT NULL,
  `tag` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tag`
--

INSERT INTO `tag` (`tagId`, `tag`) VALUES
(1, 'Variedades'),
(2, 'Interes General'),
(3, 'consejos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `userId` varchar(36) NOT NULL,
  `userName` varchar(80) NOT NULL,
  `userLastName` varchar(80) NOT NULL,
  `userEmail` varchar(80) NOT NULL,
  `userPassword` varchar(80) NOT NULL,
  `image` varchar(100) NOT NULL,
  `user_role` enum('admin','user') NOT NULL DEFAULT 'user',
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`userId`, `userName`, `userLastName`, `userEmail`, `userPassword`, `image`, `user_role`, `createdAt`, `updatedAt`) VALUES
('105ed090-ac9b-47ca-aeb0-60ce1a7abbfc', 'Jorge', 'Sánchez', 'jorge.sanchez@gmail.com', '$2a$10$e9iAIyFM6yvqOMdKlhec0urTUL46SLr.TqRtIrlz84AxBVql7NxJ.', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715951839/zfejwa251pnnrat3pgze.jpg', 'user', '2024-05-17 13:17:18.854528', '2024-05-17 13:17:18.854528'),
('13b160b7-8234-48d1-b57a-1ecc98785951', 'Elena', 'Fernández', 'elena.fernandez@gmail.com', '$2a$10$ON1j.Ws4y6eE5OwxUvCfC.IXW0TV8lj0J2h3nWtM8ZZHDud73YhFa', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715951633/qbz4l0noygkkyhjrqpnc.jpg', 'user', '2024-05-17 13:13:53.305523', '2024-05-17 13:13:53.305523'),
('23c5eafc-8116-4ef1-9d12-538de743cac3', 'Lois', 'Lane', 'loisplanet@gmail.com', '$2a$10$0u4ud/y2sejabh/qK1ZzZu6j/lICFsPzAycc/r7ilTeOV.QsdcYEC', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715862996/ooqzjox9jbgwcgrvxrtj.jpg', 'admin', '2024-05-16 12:36:37.218383', '2024-07-01 20:50:55.882330'),
('2aaac2fc-9e6c-4281-a25a-d20e633edcaa', 'Luis', 'Martinez', 'luis.martinez@gmail.com', '$2a$10$G/4O5p1.OCOqg8wbBZmQ3.LtIwGX7isM/T0hu2PUS09Y7jvIX.RfK', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715951366/oro92yeoptgmy6s7vltz.jpg', 'user', '2024-05-17 13:09:25.784343', '2024-05-17 13:09:25.784343'),
('33c41d90-6191-4f35-8092-8060ea4f6967', 'Miguel', 'Torres', 'miguel.torres@gmail.com', '$2a$10$rnD19PgIdLVNE8yzGQb/oeIqOr8uj3rM.rK1EDMZmNgAkojnveptK', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715952199/syzrz9ja2wzqiuaz3fsn.jpg', 'user', '2024-05-17 13:23:19.184843', '2024-05-17 13:23:19.184843'),
('41815f0b-a90f-4718-b8f6-8a6a2935dd47', 'María', 'Rodríguez', 'maria.rodriguez@gmail.com', '$2a$10$eOgFTLLeCoGfs1nKw19qU./HFBVyprvWkXJVlTlYF6uRYQcQQVoae', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715951439/rov2ykxdqi8e49eocsw3.jpg', 'user', '2024-05-17 13:10:39.431688', '2024-05-17 13:10:39.431688'),
('49ee3301-4bc5-4e22-8a05-2330c880a7d8', 'Lucía', 'Ramírez', 'lucia.ramirez@gmail.com', '$2a$10$gSMKTfFFKDsGztOrzlvJC.vNG.I1AiAWH2ur./vrBxTnMtLEgyp9G', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715952126/ztchsdufhelujew9vu6b.jpg', 'user', '2024-05-17 13:22:06.395530', '2024-05-17 13:22:06.395530'),
('68c5e807-ddd4-4d74-8843-a0d1dbf04523', 'Shadow', 'Hunter', 'elfi@gmail.com', '$2a$10$cGpOqjJxSTIVExKMt.eo0ukfiOf7qGNOWiPnW/v0W5tbldnHBI/xe', 'http://res.cloudinary.com/deumagcgr/image/upload/v1717597276/ewackziybhj5fr9ubykh.jpg', 'user', '2024-06-05 14:21:17.018511', '2024-06-05 14:21:17.018511'),
('795e76f4-f2d9-4ff8-ac18-3aea02fd5093', 'Sofía', 'Gómez', 'sofia.gomez@gmail.com', '$2a$10$k9NxZygLNv80CgWq8m2a2u0p8FkpIvpA6HBUZIwaB61l3tAoMnNUK', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715952258/bz7drqmwsgza18yhascb.png', 'user', '2024-05-17 13:24:18.620154', '2024-05-17 13:24:18.620154'),
('7d749513-06cb-4892-b5f1-8fa63e9d58c0', 'Juan', 'Pérez', 'juan.perez@gmail.com', '$2a$10$g3eBtfntuccktcPaGysTDeaNukWO.bAwbOSvtGU2zfnN2oTyiBLo.', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715951121/dzog9l75axeyfuitsiab.jpg', 'user', '2024-05-17 13:05:21.974549', '2024-05-17 13:05:21.974549'),
('836b425e-202b-483f-b7b2-076bdb8468b5', 'Ana', 'García', 'ana.garcia@gmail.com', '$2a$10$NY/uzouxMlV/W5g52BvwVemTuQdB1Lf60vy6e3zmdNatoR4Myz78C', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715951284/sgghnnkgsrl30ec48t5i.jpg', 'user', '2024-05-17 13:08:03.914644', '2024-05-17 13:08:03.914644'),
('883db2e1-b7f7-45a8-b929-0b8d02a1e174', 'Banda', 'Gris', 'bandagris@gmail.com', '$2a$10$BCNeQdVgHqu6MPsqWZcx1uLrwOwC4/xfuH2rCPWt7Cgd0TsB8FcP6', 'http://res.cloudinary.com/deumagcgr/image/upload/v1717170553/b5o2n85opfahmbihqmsp.jpg', 'user', '2024-05-31 15:49:13.278522', '2024-05-31 15:49:13.278522'),
('944ffe1b-e114-449a-8fb1-1d6e2e1b2544', 'Dexter', 'Douglas', 'fenomenoide@gmail.com', '$2a$10$Efviri3mBLkjR0O.9TpxT.r96szY0lAz/diyxSiOrMf8UiE7oZ4KC', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715804002/fcoxlhpsuuk3mb5cxyv4.jpg', 'admin', '2024-05-15 20:13:23.116112', '2024-05-15 20:14:49.095586'),
('a0e76f12-bbb3-4c65-b1a2-b60bb8ed9a55', 'Orco', 'Fiero', 'orco@gmail.com', '$2a$10$55HQnUA28DoMAKHw9xtrH.OhQORxhKOaQfQIUD7a.SkUWFp7ZnIw6', 'http://res.cloudinary.com/deumagcgr/image/upload/v1716490544/svent9rx5crxezlko71d.jpg', 'user', '2024-05-23 18:55:43.681738', '2024-05-23 18:55:43.681738'),
('cb3e9c7c-efe3-4cdf-82ea-733c9c30d4e8', 'Maxwell', 'Smart', 'control86@gmail.com', '$2a$10$BUlJGtkYNwj2MTt6vw5E3e921uYc231Ba6NOkBXpXNdgUZYtwK76G', 'http://res.cloudinary.com/deumagcgr/image/upload/v1717717871/ov5emlwjeueo8nkek72g.jpg', 'user', '2024-06-06 23:51:11.981962', '2024-06-06 23:51:11.981962'),
('f640c2fd-a371-406c-8a8b-9aa5653a8d86', 'Carlos', 'López', 'carlos.lopez@gmail.com', '$2a$10$ADTuh0ImeH8lsUJeoqgz1..umO4P/q/6sanlqWA.Mpc0HnA4/Zxxy', 'http://res.cloudinary.com/deumagcgr/image/upload/v1715951512/kpbs2wz1ootspo03mpru.jpg', 'user', '2024-05-17 13:11:51.948528', '2024-05-17 13:11:51.948528'),
('fc10979c-f60e-4804-b263-ba0091b802d6', 'Kal', 'El', 'krypton@gmail.com', '$2a$10$ooeVHePfFsQFEw9PPxDAuen89sQPiAHzHOd7Pc3ZpFx9rZq8ceN3.', 'http://res.cloudinary.com/deumagcgr/image/upload/v1717786044/bnynmemly3ltgwcu3i1n.jpg', 'user', '2024-06-07 18:47:25.212280', '2024-06-07 18:47:25.212280'),
('ff722bf1-2042-4d32-b73c-84bab7a8dbcc', 'Eyra', 'Nightsahde', 'eyra@gamail.com', '$2a$10$yVTWEV/6jwh/PUmYCvzk8.6dKzxpn7ieeeXeaC0kPPPgBuwZb9qSK', 'http://res.cloudinary.com/deumagcgr/image/upload/v1716490367/uwxhpvgc0cdanewj2d0z.jpg', 'user', '2024-05-23 18:52:47.459580', '2024-05-23 18:52:47.459580');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`articleId`),
  ADD KEY `FK_636f17dadfea1ffb4a412296a28` (`userId`),
  ADD KEY `FK_43bf3776b5983cfdd7c2ed4606b` (`tagId`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indices de la tabla `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `FK_c0354a9a009d3bb45a08655ce3b` (`userId`),
  ADD KEY `FK_860b91a98fffa51a81d25aad203` (`recipeId`),
  ADD KEY `FK_c20404221e5c125a581a0d90c0e` (`articleId`);

--
-- Indices de la tabla `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`recipeId`),
  ADD KEY `FK_fe30fdc515f6c94d39cd4bbfa76` (`userId`),
  ADD KEY `FK_991484dd8189182dafe91e44413` (`categoryId`);

--
-- Indices de la tabla `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`tagId`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `comment`
--
ALTER TABLE `comment`
  MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `tag`
--
ALTER TABLE `tag`
  MODIFY `tagId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `FK_43bf3776b5983cfdd7c2ed4606b` FOREIGN KEY (`tagId`) REFERENCES `tag` (`tagId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_636f17dadfea1ffb4a412296a28` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_860b91a98fffa51a81d25aad203` FOREIGN KEY (`recipeId`) REFERENCES `recipe` (`recipeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c20404221e5c125a581a0d90c0e` FOREIGN KEY (`articleId`) REFERENCES `article` (`articleId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `FK_991484dd8189182dafe91e44413` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_fe30fdc515f6c94d39cd4bbfa76` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
