
const { Pedido, User, Books } = require("../db");
//const Books = require("../models/Books");

const cart = [
  {
    idCustomer: 1,
    products: [
      {
        id: 1,
        title: "Las aventuras de Roderick Random",
        authors: [
          "Tobias Smollett"
        ],
        publisher: "Editorial Montesinos",
        ISBN: 8496831477,
        categories: "Narrativa",
        imageLinks: "http://books.google.com/books/content?id=yHmGhaz7GNsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        description: "Tanto que , cuando se hallaba dividido por una diferencia de intereses , uno de los bandos normalmente solicitaba la ayuda de Roderick ( nombre por el cual era yo conocido ) para inclinar la balanza y mantener el bando opuesto...",
        price: 25.23
      },
      {
        id: 2,
        title: "Random Lengths",
        authors: [
          "Cox H. J."
        ],
        publisher: "Random Lengths Publications",
        ISBN: 1884311091,
        categories: " Literatura y Estudios Literarios",
        imageLinks: "http://books.google.com/books/content?id=TnUqAQAAMAAJ&printsec=frontcover&img=1&zoom=5&imgtk=AFLRE721hWzO62cGKn_Y-hFBOesuIhy9MYITFWsKxRKST7itjY4ufysldSkDedWsfDY2hrT65Posps6KkvAKuOeCQBvPFmi7XUYkKuRadJtWpTJMjKid7yxe0bS9660Lk3D8UumPXP5V&source=gbs_api",
        description: "Tanto que , cuando se hallaba dividido por una diferencia de intereses , uno de los bandos normalmente solicitaba la ayuda de Roderick <b>Random</b> ( nombre por el cual era yo conocido ) para inclinar la balanza y mantener el bando opuesto&nbsp;...",
        price: 30.50
      },
    ]
  },
  {
    idCustomer: 2,
    products: [
      {
        id: 17,
        title: "Historia de la ciencia",
        authors: [
          "Patricia Daniels",
          "Tom Hackson",
          "Cristina Wilsdon"
        ],
        publisher: "Ediciones AKAL",
        ISBN: 8476007345,
        categories: [
          "Education"
        ],
        imageLinks: "http://books.google.com/books/content?id=b9hlvMO06sQC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71W5SFEJO6YzRc6ztAOjqS_Ydb69S6IrLBdTiM054u7cvUkaFAfwID2mw-rJpliF28HxlwTHSX3Hb1Egrue2DPElX_0Qux9Kvr_q_YlU_q0whVs8jO8EBRNmU9zkl1Om1SHtigo&source=gbs_api",
        description: "EXPLORA TODO LO QUE TIENE QUE VER CON LA CIENCIA; DESDE LOS ÁTOMOS MÁS PEQUEÑOS HASTA LA INMENSIDAD DEL ESPACIO, PASANDO POR LAS PROFUNDIDADES MARINAS Y LOS LÍMITES DE LA MATERIA.Descubre datos sorprendentes sobre los terremotos, la electricidad, los elementos y todo lo que siempre quisiste saber sobre la ciencia.Déjate cautivar por científicos geniales y sus asombrosos descubrimientos.Pon a prueba tus conocimientos con experimentos divertidos.Disfruta de las fotografías a todo color que muestran los secretos del cuerpo humano, la biodiversidad de nuestro planeta y los misterios del universo.",
        price: 105.00
      },
      {
        id: 17,
        title: "Ingenieria Térmica",
        authors: [
          "Martín Llorens Morraja",
          "Angel Luis Miranda Barreras"
        ],
        publisher: "Marcombo",
        ISBN: 9788426715319,
        categories: [
          "Ciencias"
        ],
        imageLinks: "http://books.google.com/books/content?id=fi7d9tNCwY0C&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73PMZrvz8ILEr2sgDQKAq2eyTwSQzg9ba9aIRRYemvMkxMyMWm6KIot5sn9zwbQ4ubdMotILGYpUbHzTlvfqjsHRCeXdzUXp3ilXSqbpDcOOaXCI1XKnTtqJjPPXGNtOujCYMe4&source=gbs_api",
        description: "La Termodinámica es la parte de la Física, en sus dos vertientes, clásica y estadística,que estudia la energía y su transformación de una forma en otra. El estudio puede hacerse de forma macroscópica, es decir, sin tener en cuenta las peculiaridades de las partículas que integran el sistema (Termo. Clásica) o bien teniendo en cuenta las propiedades promedio de grandes grupos de partículas (Termo. Estadística). En general, se considera que su estudio ofrece algunas dificultades inherentes a ciertas peculiaridades en la formulación y desarrollo de sus leyes. Si nos limitásemos al estudio de los aspectos puramente aplicados perderíamos fácilmente la perspectiva general que todo técnico o ingeniero ha de poseer porque, aunque sea cierto en lo particular, se ha de tener un buen criterio general en los temas relacionados con los mismos. Un aspecto fundamental de la Termodinámica es el estudio de la transformación de una forma de energía en otra, especialmente la de calor en trabajo. Por otra parte, la transmisión del calor exige la existencia de un gradiente de temperaturas, es decir,que la temperatura no sea constante. La Termodinámica estudia la temperatura y el calor, pero no específicamente la distribución de temperaturas ante un proceso determinado de transferencia de calor. Dicho con palabras más sencillas, la Termodinámicadetermina la tasa de transferencia de calor y la Termotecnia se ocupa de la distribución de temperaturas. La Ingeniería Térmica pretende efectuar un estudio conjunto de ciertos aspectos fundamentales de la Termotecnia y de la Termodinámica. Así pues, laTermotecnia comprende el estudio de la transmisión de calor y de los dispositivos para llevarla a cabo, y la Termodinámica el estudio de las leyes fundamentales relacionadas con la energía.",
        price: 95.00
      },
      {
        id: 18,
        title: "Sistemas Operativos",
        authors: [
          "Daniel Sol Llaven"
        ],
        publisher: "Grupo Editorial Patria",
        ISBN: 9786077442677,
        "categories": [
          "Educación"
        ],
        imageLinks: "http://books.google.com/books/publisher/content?id=qdFUCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71US4fn8gLBhUAX1BQWPhwVr6GHduAI2LAnCEbeRfPQnTWymTpIRSP4I5vP05mdXCyiKcrirO0IUxDCvpHqBkb-1z_vQuwzW1yoZCPlG8WwNhJI45poWrvESeW5X7F4PLs6FLbs&source=gbs_api",
        description: "El propósito principal de este texto es presentar de forma sencilla, clara y lo más completa que sea posible, la naturaleza y las características de los sistemas operativos modernos que se utilizan en computadoras personales, estaciones de trabajo o dispositivos móviles, como Android, iOS, Windows, Linux, entre otros. Sin duda, uno de los aspectos tecnológicos más relevantes y con mayor presencia en la actualidad, y parte fundamental de la formación académica de diversas carreras de ingeniería. En Sistemas Operativos. Panorama para la ingeniería en computación e informática se revisan y tratan con amplitud y sencillez los temas que conforman la mayoría de los programas de estudio de las carreras de Ingeniería en Computación, Ingeniería en Sistemas e Ingeniería Informática. Los sistemas operativos constituyen un elemento básico para la operación de los sistemas y el desarrollo de las aplicaciones, por lo que hoy día su estudio y tratamiento se establece como un tema relevante e indispensable que la mayoría de las instituciones de educación superior en el ramo de la ingeniería han decidido incorporar como parte integral en la formación de los futuros ingenieros en una asignatura. El enfoque clásico del sistema operativo como administrador de recursos, expuesto por autores como Andrew Tanenbaum, Glenn Brookshear y William Stallings en los libros de su autoría, permea en contenidos de este valioso texto.",
        price: 115.00
      },
      {
        id: 19,
        title: "Poesía Castellana",
        authors: [
          "Vega, Garcilaso de la"
        ],
        publisher: "Ediciones AKAL",
        ISBN: 8446043505,
        categories: [
          "Literatura y Estudios Literarios"
        ],
        imageLinks: "http://books.google.com/books/publisher/content?id=d74KDgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70XwxzzoJGjjlMVBXs5J58bJbbAlSjITU12oWSz4lflfdPLDPoRkeislU7ucopikbznzqq-D1PAZ-jNeTe0gwK5mPQrRVEjunpcQFud002t667qtVkM8kb9TakCYH3Oe3ifP5Yt&source=gbs_api",
        description: "La obra poética de Garcilaso de la Vega –compuesta por cuarenta sonetos, cinco canciones, una oda en liras, dos elegías, una epístola, tres églogas y siete coplas castellanas y tres odas latinas– se publicó por primera vez en 1543, a modo de apéndice de las Obras de Juán Boscán. La producción lírica de Garcilaso, máxima expresión del Renacimiento castellano, se convirtió, desde muy pronto, en una referencia inexcusable para los poetas españoles, que desde entonces no pudieron ignorar la revolución métrica y estética operada por él en la lírica española, al adaptar la métrica del castellano a los moldes del endecasílabo con tanto virtuosismo como sensibilidad, y encontrar en la nueva musicalidad del verso una consonancia con los acordes de una nueva sentimentalidad y un nuevo repertorio de temas, estructuras y recursos estilísticos procedentes del petrarquismo. La presente edición de la obra completa de Garcilaso pone a disposición del lector un texto moderno, pero no por ello exento de la corrección y del rigor exigibles al trabajo filológico. Tomando como base la edición crítica del especialista Bienvenido Morros (1995), cada poema es estudiado con profundidad y exhaustivamente anotado por los dos editores de la obra, Julián Jiménez Heffernan e Ignacio García Aguilar. Además, la edición cuenta con un esclarecedor estudio preliminar a cargo de Pedro Ruiz Pérez, catedrático de Literatura Española de la Universidad de Córdoba. Sin duda Garcilaso es el poeta de la elegancia, del que tantos otros, y grandes, se sentirán deudos, desde Luis de Góngora hasta Alberti, Juan Ramón Jiménez o Gustavo Adolfo Bécquer.",
        price: 62.00
      },
      {
        id: 20,
        title: "Cielo, viento, estrella y poesía",
        authors: [
          "Tong-Ju Yun"
        ],
        publisher: "Editorial Verbum",
        ISBN: 8479621559,
        categories: [
          "Poesía"
        ],
        imageLinks: "http://books.google.com/books/content?id=adDYdZlP2ywC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71yudxWanSHxXh6X2HVJyIy-pBAfkWOV0JIFpuDa7yTGUVHsm0hRvVGhYCx4n9usf8CXx4GdceAWgBoJ6Sau9cUy7zTwdnbOV6Lg8MdAX8gNVcn4y1h-C9fkR50KM4iHNk004rc&source=gbs_api",
        description: "Por primera vez en español se presenta una amplia muestra de la poesía coreana contemporánea. Un cuerpo poético íntimamente vinculado a la naturaleza, cuyo predominio temático con la soledad, la meditación, la contemplación de los misterios de lo cotidiano y del mundo.El poeta extrae de su propia vida y de la Naturaleza su mundo poético, el cual constituye esa ventana que lo eleva al cielo, a las estrellas, al viento y a la poesía.",
        price: 15.00
      }
    ]
  },
]

const cartController = {

  getCartByCustomer: (req, res) => {
    const { idCustomer } = req.params;
    try {
      if (!idCustomer) throw "Debe enviar el id del cliente";
      const shoop = cart?.find((c) => c.idCustomer === Number(idCustomer));
      if (!shoop) res.status(404).send("No tiene una compra asociada");
      const totalPrice = parseFloat(shoop.products?.reduce((acc, prod) => acc + prod.price, 0).toFixed(2));
      return res.send({ ...shoop, totalPrice });
    } catch (error) {
      res.status(400).send(error);
    }
  },


  postCartUser: async (req, res, next) => {

    const { cart, email } = req.body;

    const hayCarrito = await Pedido.findOne({
      where:{
        email
      }
    });

    if (  hayCarrito ){

  const borrado = await Pedido.destroy({
    where:{
      email
    }
  })
   
      cart.forEach(async (element) => {

          const carrito = await Pedido.create({ 
            price: element.price,
            title: element.title,
            quantity: element.quantity, 
            stock:element.stock,
            imageLinks: element.imageLinks,
            email: email
    
          });
       
      });
      return res.status(200).json({
        status: 1,
        message: 'Carrito actualizado correctamente',
        data: borrado
      });
    

    }else{

    


    cart.forEach(async (element) => {
 
        const carrito = await Pedido.create({
          idBook:element.id,
          price: element.price,
          title: element.title,
          quantity: element.quantity,
          imageLinks: element.imageLinks,
          email: email
  
        });
       
    }); 
    return res.status(200).json({
      status: 1,
      message: 'Carrito creado correctamente',
      data: ''
    });

  }
  },
  getCartUser: async (req, res, next) => {// por query

    const { email } = req.query

    try {
      const carrito = await Pedido.findAll({
        where: {
          email: email
        }
      })
      
      res.send({
        status: 1,
        message: 'Get realizado',
        data: carrito,
      });
    } catch (error) {
      console.log(error)
    }
    
  },
  deleteCartUser: async(req,res,next) => {
    
    const { email }=req.query;

    try {
  
      const borrados = await Pedido.findAll({
        where:{
          email:email
        }
      });

      const destroy = await Pedido.destroy({
        where:{
          email:email
        }
      });

      res.send({
        status:1,
        message:'Borrado del carrito con éxito',
        deleted: borrados
      })
      
    } catch (error) {
      console.log(error)
    }

  },
  getStockCart : async( req,res,next ) => {

    const { title }= req.query;

    const buscado = await Books.findOne({
      where:{
        title
      }
    });


    return res.status(200).json({
      status:1,
      message:'libro encontrado',
      stock: buscado.stock
    })


    
  }
}

module.exports = cartController