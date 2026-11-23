// Datos oficiales contrastados de Valdemoro (Madrid)
// Fuentes: valdemoro.es, turismomadrid.es, fundaciongoyaenaragon.es, crtm.es

export const CATEGORIES = [
  { id: 'todos', label: 'Todos los lugares' },
  { id: 'monumentos', label: 'Monumentos' },
  { id: 'arte', label: 'Arte y Museos' },
  { id: 'naturaleza', label: 'Parques y Naturaleza' },
  { id: 'cultura', label: 'Fiestas y Cultura' }
];

export const PLACES = [
  {
    id: 'iglesia-asuncion',
    category: 'arte',
    title: 'Iglesia Parroquial de Nuestra Señora de la Asunción',
    shortSubtitle: 'Barroco madrileño y lienzo original de Francisco de Goya',
    categoryLabel: 'Arte y Patrimonio',
    featured: true,
    rating: 'Bien de Interés Cultural (BIC)',
    duration: '45 - 60 min',
    entry: 'Entrada gratuita',
    accessible: true,
    familyFriendly: true,
    tags: ['BIC', 'Pintura de Goya', 'Barroco', 'Entrada gratuita'],
    address: 'Plaza de la Constitución / Plaza del Esparto s/n, 28341 Valdemoro, Madrid',
    coords: '40.18872,-3.67665',
    mapsQuery: 'Iglesia Parroquial de Nuestra Señora de la Asunción, Valdemoro, Madrid',
    image: '/images/valdemoro/iglesia-asuncion.jpg',
    artworkImage: '/images/valdemoro/goya-valdemoro.jpg',
    description: 'El templo más insigne de Valdemoro. Su configuración actual responde al barroco madrileño de los siglos XVII y XVIII, reparado tras el terremoto de Lisboa de 1755.',
    historyDetails: [
      'Declarada Bien de Interés Cultural (BIC). Cuenta con planta de cruz latina, nave central con bóveda de cañón con lunetos y capillas laterales.',
      'Su retablo mayor fue financiado a finales del siglo XVIII por Don Pedro López de Lerena (Conde de Lerena), natural de Valdemoro y ministro de Hacienda de Carlos III y Carlos IV.',
      'Alberga en el retablo mayor el óleo sobre lienzo "Aparición de la Virgen a San Julián, obispo de Cuenca", obra maestra de Francisco de Goya (1786-1787).',
      'El conjunto pictórico se completa con "La Asunción de la Virgen" de Francisco Bayeu en la calle central y "El martirio de San Pedro Mártir" de Ramón Bayeu.',
      'El proyecto pictórico original fue encomendado por Real Orden a Mariano Salvador Maella en 1788, autor del retrato de López de Lerena conservado en el Museo del Prado.'
    ],
    officialSource: 'valdemoro.es y Fundación Goya en Aragón'
  },
  {
    id: 'plaza-constitucion',
    category: 'monumentos',
    title: 'Plaza de la Constitución y Torre del Reloj',
    shortSubtitle: 'Corazón civil castellano con soportales del siglo XVII',
    categoryLabel: 'Monumentos',
    featured: true,
    rating: 'Conjunto Histórico Protegido',
    duration: '30 - 45 min',
    entry: 'Acceso libre',
    accessible: true,
    familyFriendly: true,
    tags: ['Arquitectura Castellana', 'Siglo XVII', 'Torre del Reloj', 'Zona de Tapeo'],
    address: 'Plaza de la Constitución, 28341 Valdemoro, Madrid',
    coords: '40.18952,-3.67635',
    mapsQuery: 'Plaza de la Constitución, Valdemoro, Madrid',
    image: '/images/valdemoro/plaza-constitucion.jpg',
    secondaryImage: '/images/valdemoro/torre-reloj.jpg',
    secondaryImageTitle: 'Torre del Reloj (1672)',
    secondaryImageDesc: 'Erigida sobre el edificio de El Pósito con trazas del maestro Cristóbal Rodríguez de Jarama y rematada con chapitel de pizarra.',
    description: 'Arquetipo de plaza mayor castellana con planta rectangular, soportales adintelados sobre pilastras de piedra y balconadas que acogían las ferias comarcales desde el siglo XVI.',
    historyDetails: [
      'Comenzó a trazarse en el siglo XVI y quedó consolidada en el siglo XVII como epicentro del comercio comarcal y sede de las Casas de la Audiencia.',
      'Alberga el histórico edificio de El Pósito (nº 7), erigido en 1613 por iniciativa de Don Antonio Correa, "El Indiano", para almacenar y prestar grano a labradores sin recursos.',
      'Sobre El Pósito se erige la emblemática Torre del Reloj, levantada por acuerdo del concejo el 13 de mayo de 1672 bajo la dirección del maestro Cristóbal Rodríguez de Jarama.',
      'La torre contó con maquinaria de 1912 del afamado relojero Lorenzo Redondo y Bonilla, hoy actualizada con mecanismo digital y carillón.'
    ],
    officialSource: 'valdemoro.es (Patrimonio Histórico)'
  },
  {
    id: 'fuente-de-la-villa',
    category: 'monumentos',
    title: 'Fuente de la Villa',
    shortSubtitle: 'Piedra caliza de Colmenar de Oreja erigida en 1605',
    categoryLabel: 'Monumentos',
    featured: false,
    rating: 'Bien de Interés Patrimonial',
    duration: '20 min',
    entry: 'Acceso libre',
    accessible: true,
    familyFriendly: true,
    tags: ['Monumento Histórico', 'Año 1605', 'Felipe III', 'Escudo Histórico'],
    address: 'Plaza de la Fuente / Calle de la Fuente, 28341 Valdemoro, Madrid',
    coords: '40.18731,-3.67825',
    mapsQuery: 'Fuente de la Villa, Valdemoro, Madrid',
    image: '/images/valdemoro/fuente-de-la-villa.jpg',
    description: 'Construida en 1605 por acuerdo del Concejo para abastecer a los mercaderes y rebaños tras la concesión real del Privilegio de Feria otorgado por Felipe III en 1603.',
    historyDetails: [
      'Labrada en recia piedra caliza procedente de Colmenar de Oreja.',
      'Presenta un frente monumental estructurado por tres pilastras, tres caños de bronce y un generoso pilón corrido que servía de abrevadero.',
      'La pilastra central exhibe en relieve el escudo de armas más antiguo conocido de la villa de Valdemoro.',
      'Suministró agua a los vecinos hasta la llegada de la red moderna en la década de 1970 y alimentaba el lavadero municipal.'
    ],
    officialSource: 'valdemoro.es y Comunidad de Madrid'
  },
  {
    id: 'convento-santa-clara',
    category: 'monumentos',
    title: 'Convento de Santa Clara (Monjas Clarisas)',
    shortSubtitle: 'Clausura de 1616 fundada por el I Duque de Lerma',
    categoryLabel: 'Monumentos',
    featured: true,
    rating: 'Bien de Interés Cultural (BIC)',
    duration: '30 min (exterior y culto)',
    entry: 'Exterior libre / Culto',
    accessible: true,
    familyFriendly: false,
    tags: ['BIC 2016', 'Duque de Lerma', 'Aparejo Toledano', 'Siglo XVII'],
    address: 'Plaza del Convento / Calle Párroco Don Lorenzo, 28341 Valdemoro, Madrid',
    coords: '40.18780,-3.67505',
    mapsQuery: 'Convento de Santa Clara, Valdemoro, Madrid',
    image: '/images/valdemoro/convento-santa-clara.jpg',
    description: 'Convento de la Encarnación inaugurado solemnemente el 19 de mayo de 1616 en presencia del rey Felipe III y su valido Don Francisco Gómez de Sandoval y Rojas, Duque de Lerma.',
    historyDetails: [
      'Trazado por el célebre fraile y arquitecto Fray Alberto de la Madre de Dios y ejecutado por Pedro de Lizargárate, con influjo directo de Juan Gómez de Mora.',
      'Ejemplo representativo del primer barroco clasicista madrileño con severas fachadas en aparejo toledano (ladrillo y mampostería encintada).',
      'Sobre la portada luce una imagen pétrea de Santa Clara custodiada por las armas del Ducado de Lerma y la Casa de la Cerda.',
      'Declarado Bien de Interés Cultural en 2016 con ocasión de su IV centenario. Mantiene comunidad activa de religiosas de clausura.'
    ],
    officialSource: 'valdemoro.es y Boletín Oficial de la Comunidad de Madrid'
  },
  {
    id: 'ermita-cristo-salud',
    category: 'monumentos',
    title: 'Ermita del Santísimo Cristo de la Salud',
    shortSubtitle: 'Santuario del patrón de Valdemoro, con orígenes en el siglo XV',
    categoryLabel: 'Monumentos',
    featured: false,
    rating: 'Patrimonio Religioso Local',
    duration: '30 min',
    entry: 'Entrada gratuita',
    accessible: true,
    familyFriendly: true,
    tags: ['Patrón de Valdemoro', 'Siglo XVIII', 'Fiestas de Mayo', 'Barroco'],
    address: 'Glorieta del Cristo de la Salud, 28341 Valdemoro, Madrid',
    coords: '40.19250,-3.67380',
    mapsQuery: 'Ermita del Cristo de la Salud, Valdemoro, Madrid',
    image: '/images/valdemoro/ermita-cristo-salud.jpg',
    description: 'Santuario del venerado patrón municipal. Nació en el siglo XV como humilladero junto al antiguo Camino Real a Aranjuez bajo la advocación del Cristo de la Sangre.',
    historyDetails: [
      'Su hermandad fue aprobada formalmente el 2 de mayo de 1721 y se mantiene como una de las cofradías con mayor arraigo de la Comunidad de Madrid.',
      'El templo presenta nave central con bóveda de cañón con lunetos, cúpula gallonada con linterna y un suntuoso retablo barroco con columnas salomónicas y camarín.',
      'La talla titular actual data de 1939 tras la desaparición de la imagen primitiva durante la Guerra Civil Española.'
    ],
    officialSource: 'cristodelasaludvaldemoro.org y valdemoro.es'
  },
  {
    id: 'bolitas-del-airon',
    category: 'naturaleza',
    title: 'Parque Bolitas del Airón',
    shortSubtitle: '44 hectáreas de bosque y principal reserva del Árbol del Paraíso',
    categoryLabel: 'Parques y Naturaleza',
    featured: true,
    rating: 'Espacio Natural Protegido Local',
    duration: '1 - 2 horas',
    entry: 'Acceso libre',
    accessible: true,
    familyFriendly: true,
    tags: ['44 Hectáreas', 'Árbol del Paraíso', 'Yacimiento Calcolítico', 'Romería San Marcos'],
    address: 'Camino de las Bolitas / Paseo del Prado, 28341 Valdemoro, Madrid',
    coords: '40.18420,-3.66550',
    mapsQuery: 'Espacio natural Bolitas del Airón, Valdemoro, Madrid',
    image: '/images/valdemoro/bolitas-del-airon.jpg',
    description: 'El pulmón verde de Valdemoro. Antigua Dehesa Boyal documentada desde el siglo XIV, acondicionada como parque natural con más de 3.200 metros de senderos.',
    historyDetails: [
      'Constituye la principal reserva botánica de la Comunidad de Madrid del Árbol del Paraíso (Elaeagnus angustifolia), especie de singular aroma primaveral.',
      'Bañado por el arroyo de la Ermita de Santiago y el arroyo de la Cañada, refugio de avifauna mediterránea.',
      'Alberga vestigios arqueológicos calcolíticos con más de 4.000 años de antigüedad que acreditan los primeros asentamientos del valle.',
      'Cada 25 de abril acoge la tradicional Romería de San Marcos, donde las familias degustan el típico hornazo.'
    ],
    officialSource: 'valdemoro.es (Medio Ambiente)'
  },
  {
    id: 'tierno-galvan',
    category: 'naturaleza',
    title: 'Parque Enrique Tierno Galván',
    shortSubtitle: '56.000 m² de lago, olivos centenarios y paseo botánico',
    categoryLabel: 'Parques y Naturaleza',
    featured: false,
    rating: 'Parque Urbano',
    duration: '45 min',
    entry: 'Acceso libre',
    accessible: true,
    familyFriendly: true,
    tags: ['56.000 m²', 'Lago con Aves', 'Olivos Centenarios', 'Zona El Restón'],
    address: 'Paseo de Enrique Tierno Galván s/n, 28342 Valdemoro, Madrid',
    coords: '40.19280,-3.69150',
    mapsQuery: 'Parque Enrique Tierno Galván, Valdemoro, Madrid',
    image: '/images/valdemoro/parque-tierno-galvan.jpg',
    description: 'Extenso parque urbano vertebrado alrededor de un estanque naturalizado, con amplias praderas y especies arbóreas mediterráneas junto al barrio de El Restón.',
    historyDetails: [
      'Segunda zona verde más amplia de la localidad con 14 parcelas delimitadas.',
      'Poblado por olivos centenarios trasplantados, cedros, alcornoques, magnolios y pinos piñoneros.',
      'Cuenta con estanque central para aves acuáticas, área de juegos infantiles y circuitos biosaludables.'
    ],
    officialSource: 'valdemoro.es'
  },
  {
    id: 'parque-sureste',
    category: 'naturaleza',
    title: 'Rutas hacia el Parque Regional del Sureste',
    shortSubtitle: 'Paisaje estepario, cantiles yesíferos y mirador del Cerro de la Mira',
    categoryLabel: 'Parques y Naturaleza',
    featured: false,
    rating: 'Parque Regional Protegido',
    duration: '2 - 3 horas',
    entry: 'Acceso libre',
    accessible: false,
    familyFriendly: true,
    tags: ['Senderismo y BTT', 'Cerro de la Mira', 'Aves Esteparias', 'Vistas Panorámicas'],
    address: 'Camino del Cerro de la Mira, 28341 Valdemoro, Madrid',
    coords: '40.17850,-3.64200',
    mapsQuery: 'Cerro de la Mira, Valdemoro, Madrid',
    image: '/images/valdemoro/parque-sureste.jpg',
    description: 'Valdemoro forma parte del Parque Regional en torno a los ejes de los ríos Manzanares y Jarama, ofreciendo rutas entre cerros yesíferos de alto valor geológico.',
    historyDetails: [
      'Destaca la ruta senderista hacia el Cerro de la Mira y el vértice geodésico de Espartinas, con torre de vigilancia y panorámica de toda la vega.',
      'Observatorio natural de avifauna esteparia y rapaces como el aguilucho cenizo, cernícalos y avutardas.',
      'Caminos óptimos para ciclismo de montaña (BTT), paseos ornitológicos e itinerarios de geología castellana.'
    ],
    officialSource: 'turismomadrid.es y Comunidad de Madrid'
  },
  {
    id: 'feria-barroca',
    category: 'cultura',
    title: 'Feria Barroca de Valdemoro',
    shortSubtitle: 'Recreación histórica del Privilegio de Feria de 1603 concedido por Felipe III',
    categoryLabel: 'Fiestas y Cultura',
    featured: true,
    rating: 'Fiesta de Interés Turístico Comarcal',
    duration: 'Fin de semana (Octubre)',
    entry: 'Acceso libre',
    accessible: true,
    familyFriendly: true,
    tags: ['Siglo de Oro', 'Mercado Barroco', 'Teatro de Calle', 'Gastronomía Tradicional'],
    address: 'Plaza de la Constitución y Casco Histórico, 28341 Valdemoro, Madrid',
    coords: '40.18952,-3.67635',
    mapsQuery: 'Plaza de la Constitución, Valdemoro, Madrid',
    image: '/images/valdemoro/feria-barroca.jpg',
    description: 'Gran evento anual que transforma el casco histórico en un animado mercado del Siglo de Oro durante el primer fin de semana de octubre.',
    historyDetails: [
      'Conmemora la concesión real del Privilegio de Feria otorgado por Felipe III a la villa de Valdemoro en 1603 gracias a la mediación del Duque de Lerma.',
      'La Plaza de la Constitución y las calles adyacentes acogen artesanos, corral de comedias, pasacalles, chirimías, espectáculos nocturnos de fuego y exhibiciones de cetrería.',
      'Se escenifica la "Visita Real" con recreaciones teatrales a cargo de compañías profesionales y talleres teatrales locales.'
    ],
    officialSource: 'valdemoro.es (Fiestas y Tradiciones)'
  },
  {
    id: 'fiestas-patronales',
    category: 'cultura',
    title: 'Fiestas Patronales de Mayo y Septiembre',
    shortSubtitle: 'Santísimo Cristo de la Salud (Mayo) y Virgen del Rosario (Septiembre)',
    categoryLabel: 'Fiestas y Cultura',
    featured: false,
    rating: 'Tradición Centenaria',
    duration: 'Programación de 5 días',
    entry: 'Acceso libre',
    accessible: true,
    familyFriendly: true,
    tags: ['Cristo de la Salud', 'Virgen del Rosario', 'Conciertos', 'Guisos Populares'],
    address: 'Plaza de la Constitución y Recinto Ferial, 28341 Valdemoro, Madrid',
    coords: '40.18952,-3.67635',
    mapsQuery: 'Plaza de la Constitución, Valdemoro, Madrid',
    image: '/images/valdemoro/fiestas-patronales.jpg',
    description: 'Valdemoro celebra dos grandes ciclos festivos anuales arraigados en el fervor popular, la música en directo y la convivencia en las calles.',
    historyDetails: [
      'Fiestas del Cristo de la Salud (primer fin de semana tras el 3 de mayo): procesión solemne, besapiés, subasta tradicional de ramos y bar de hermandad con guisos caseros.',
      'Fiestas de Nuestra Señora del Rosario (primera quincena de septiembre): pregón y chupinazo en la Plaza de la Constitución, desfile de peñas, conciertos multitudinarios, encierros y paella popular.',
      'Fuegos artificiales de cierre y atracciones en el recinto ferial.'
    ],
    officialSource: 'valdemoro.es'
  },
  {
    id: 'teatro-juan-prado',
    category: 'cultura',
    title: 'Teatro Municipal Juan Prado',
    shortSubtitle: 'Escenario escénico de referencia con 426 butacas',
    categoryLabel: 'Fiestas y Cultura',
    featured: false,
    rating: 'Red de Teatros de la Comunidad de Madrid',
    duration: 'Según espectáculo',
    entry: 'Según programación',
    accessible: true,
    familyFriendly: true,
    tags: ['426 Butacas', 'Red de Teatros', 'Festival de Teatro', 'Homenaje a Juan Prado'],
    address: 'Calle Estrella de Elola, 27, 28341 Valdemoro, Madrid',
    coords: '40.18910,-3.67950',
    mapsQuery: 'Teatro Municipal Juan Prado, Valdemoro, Madrid',
    image: '/images/valdemoro/teatro-juan-prado.jpg',
    description: 'El corazón de las artes escénicas de Valdemoro. Inaugurado en 1987 y rebautizado en 2003 en memoria del ilustre pintor valdemoreño Juan Prado.',
    historyDetails: [
      'Aforo para 426 espectadores con accesos totalmente adaptados para personas con movilidad reducida.',
      'Programación estable de teatro clásico, danza, música de cámara y espectáculos infantiles dentro de la Red de Teatros autonómica.',
      'Sede principal del prestigioso Festival de Teatro Villa de Valdemoro.'
    ],
    officialSource: 'valdemoro.es y redescena.net'
  }
];

export const GASTRONOMY_EXPERIENCES = [
  {
    id: 'chiron',
    type: 'alta-cocina',
    title: 'Restaurante Chirón',
    subtitle: '1 Estrella Michelin y 2 Soles Repsol',
    chef: 'Chef Iván Muñoz y sumiller Raúl Muñoz',
    zone: 'Casco Histórico',
    address: 'Calle Alarcón, 27, 28341 Valdemoro, Madrid',
    coords: '40.18985,-3.67810',
    mapsQuery: 'Restaurante Chirón, Valdemoro, Madrid',
    image: '/images/valdemoro/chiron.jpg',
    description: 'Estandarte culinario del sur madrileño. Cocina de arraigo castellano y raíces fluviales entre los ríos Jarama y Tajo reinterpretada con técnica contemporánea impecable.',
    highlights: ['Menú degustación Jarama y Tajuña', 'Bodega con vinos singulares de Madrid', 'Aceite de oliva de producción propia'],
    priceRange: '€€€€'
  },
  {
    id: 'tapeo-casco',
    type: 'tapas',
    title: 'Ruta del Tapeo Tradicional del Casco Histórico',
    subtitle: 'Plaza de la Constitución, Calle Alarcón y Calle Grande',
    chef: 'Tabernas y mesones centenarios',
    zone: 'Casco Histórico',
    address: 'Plaza de la Constitución y Calle Infantas, 28341 Valdemoro, Madrid',
    coords: '40.18952,-3.67635',
    mapsQuery: 'Plaza de la Constitución, Valdemoro, Madrid',
    image: '/images/valdemoro/tapeo-plaza.jpg',
    description: 'El ambiente más auténtico para disfrutar de raciones castellanas al pie de los soportales del siglo XVII.',
    highlights: ['Torreznos crujientes al estilo de la comarca', 'Tortilla de patatas casera guisada', 'Callos a la madrileña y rabo de toro'],
    priceRange: '€€'
  },
  {
    id: 'gastro-reston',
    type: 'tapas',
    title: 'Eje Gastronómico de El Restón',
    subtitle: 'Terrazas modernas y propuestas de fusión mediterránea',
    chef: 'Gastrobares de nueva hornada',
    zone: 'El Restón',
    address: 'Avenida del Mar Mediterráneo y Glorieta del Universo, 28342 Valdemoro, Madrid',
    coords: '40.19150,-3.69300',
    mapsQuery: 'Avenida del Mar Mediterráneo, Valdemoro, Madrid',
    image: '/images/valdemoro/reston-gastronomia.jpg',
    description: 'Punto de encuentro dinámico con amplias terrazas al aire libre, cocinas internacionales y hamburgueserías gourmet.',
    highlights: ['Tapas de autor creativas', 'Cervezas artesanas y coctelería', 'Ambiente familiar junto al parque Tierno Galván'],
    priceRange: '€€'
  },
  {
    id: 'reposteria-tejas',
    type: 'dulces',
    title: 'Tejas de Almendra y Bollos de Aceite',
    subtitle: 'Repostería tradicional de obradores locales',
    chef: 'Maestros panaderos y confiteros de Valdemoro',
    zone: 'Comercios locales',
    address: 'Panaderías y confiterías artesanas del municipio',
    image: '/images/valdemoro/reposteria-tejas.jpg',
    description: 'El bocado dulce emblemático de Valdemoro. Las tejas de almendra tostada con fina masa de mantequilla y los esponjosos bollos de aceite castellanos horneados a diario.',
    highlights: ['Tejas crujientes con almendra marcona', 'Bollos de aceite con anís y azúcar', 'Elaboración 100% artesanal'],
    priceRange: '€'
  },
  {
    id: 'vinos-arganda',
    type: 'vinos',
    title: 'Vinos D.O. Madrid (Subzona de Arganda)',
    subtitle: 'Uvas autóctonas Malvar y Tempranillo sobre suelos yesíferos',
    chef: 'Enólogos y viticultores de la comarca',
    zone: 'Enoturismo Comarcal',
    address: 'Bodegas de la Comarca de Las Vegas y Subzona de Arganda',
    image: '/images/valdemoro/vinos-madrid.jpg',
    description: 'Valdemoro está adscrito a la subzona más extensa de la Denominación de Origen Protegida Vinos de Madrid, donde la variedad blanca Malvar ofrece vinos frescos de notable personalidad.',
    highlights: ['Blancos frescos de uva Malvar', 'Tintos con crianza de Tempranillo', 'Aceites de oliva virgen extra de almazaras del sureste'],
    priceRange: '€€'
  }
];

export const PRACTICAL_INFO = {
  transport: {
    renfe: {
      line: 'Línea C-3 (Cercanías Renfe)',
      route: 'Aranjuez - Atocha - Sol - Chamartín - El Escorial',
      timeFromSol: '25 a 30 minutos',
      frequency: 'Cada 20 minutos en días laborables',
      zone: 'Zona tarifaria B3 del Consorcio de Transportes',
      stationAddress: 'Paseo de la Estación s/n, 28341 Valdemoro'
    },
    road: {
      highway: 'Autovía del Sur (A-4)',
      kilometer: 'Punto kilométrico 26,7',
      accessNorth: 'Salida Valdemoro Norte (Zona empresarial y enlace M-423)',
      accessCenter: 'Salida Valdemoro Centro (Casco Urbano y Pza. Constitución)',
      distanceMadrid: 'A 27 km de la Puerta del Sol'
    },
    buses: [
      { line: 'Línea 422', route: 'Madrid (Intercambiador Legazpi) - Valdemoro', type: 'Diurno interurbano directo' },
      { line: 'Línea 424', route: 'Madrid (Legazpi) - Valdemoro (El Restón)', type: 'Conexión directa zona residencial' },
      { line: 'Línea 423', route: 'Madrid (Estación Sur Méndez Álvaro) - Valdemoro - Aranjuez', type: 'Eje sur metropolitano' },
      { line: 'Línea 428', route: 'Getafe (Universidad Carlos III) - Pinto - Valdemoro', type: 'Conexión universitaria sur' },
      { line: 'Nocturno N-401', route: 'Madrid (Atocha) - Pinto - Valdemoro', type: 'Servicio nocturno diario' }
    ]
  },
  tourismOffice: {
    name: 'Oficina Municipal de Turismo de Valdemoro',
    building: 'Antiguo edificio de El Pósito (1613)',
    address: 'Plaza de la Constitución, 7, 28341 Valdemoro (Madrid)',
    phone: '91 801 82 45',
    generalPhone: '91 809 98 90',
    email: 'bzturismo@valdemoro.es',
    hours: 'Lunes a viernes de 9:00 a 14:00 horas',
    weekendNote: 'Fines de semana y festivos: consultar atención presencial en Centro Cultural Juan Prado'
  },
  stats: [
    { label: 'Espacio Natural Protegido', value: '44 ha', detail: 'Parque Bolitas del Airón' },
    { label: 'Privilegio de Feria Real', value: 'Año 1603', detail: 'Concesión de Felipe III' },
    { label: 'Joya pictórica de Goya', value: '1786', detail: 'Lienzo en la Asunción' },
    { label: 'Tiempo directo desde Sol', value: '25 min', detail: 'Renfe Cercanías C-3' }
  ]
};
