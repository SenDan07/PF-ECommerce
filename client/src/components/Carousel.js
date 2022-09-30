import { useState } from "react"

export default function Carousel() {
    let img1 = "https://imagenes.elpais.com/resizer/F9W3qboQF2wyx2uSySg-9E7uqqs=/1200x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/X4HMK44RJNAH4GWXZPZTZJUGEI.jpg"
    let img2 = "https://st2.depositphotos.com/1496410/8568/v/950/depositphotos_85685620-stock-illustration-red-stamp-bestseller.jpg"
    let img3 = "https://www.latejedora.org/wp-content/uploads/2015/11/Horario-InviernoTeje.jpg"
    let img4 = "https://www.southexpress.pe/wp-content/uploads/2019/06/envios-internacionales-2.jpg"
    let images = [img1, img2, img3, img4]

    let text1 = "Celebramos Halloween con descuentos de miedo (Promoción válida desde 28 de octubre al 2 de noviembre)."
    let text2 = "Tenemos los mejores libros, revisa nuestro catalogo y adquiere tus Best Sellers favoritos."
    let text3 = "Pronto tendrenos cambiaremos a nuestro horario de verano."
    let text4 = "Hacemos envios a todo el mundo."
    let texts = [text1, text2, text3, text4]

    let [index, setIndex] = useState(0)

    function handleButtonLeft() {
        index > 0 ?
            setIndex(index - 1) : setIndex(images.length - 1)
    }

    function handleButtonRight() {
        index === images.length - 1 ?
            setIndex(0) : setIndex(index + 1)
    }

    setTimeout(() => {
        handleButtonRight()
    }, 555555555000)

    return (
        <div className="mb-10 carousel slide relative">
            <div className="relative">
                <div className="absolute left-0 text-2xl top-64 ">
                    <button onClick={handleButtonLeft} className="absolute bg-[#6b7280] hover:bg-hoverMenu rounded-full p-2 translate-x-60" >{`<`}</button>
                </div>

                <div className="absolute right-0 text-2xl top-64">
                    <button onClick={handleButtonRight} className="bg-[#6b7280] hover:bg-hoverMenu p-2 -translate-x-60">{`>`}</button>
                </div>
            </div>

            <img src={images[index]} alt="image not found" className="w-9/12 h-3/6 mx-auto" />

            <div className="">
                <span className="text-4xl flex justify-center">{texts[index]}</span>
            </div>


        </div>
    )
}


/* export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleCaptions" class="carousel slide relative" data-bs-ride="carousel">
                <div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="0"
                        class="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div class="carousel-inner relative w-full overflow-hidden">
                    <div class="carousel-item active relative float-left w-full">
                        <img
                            src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                            class="block w-full"
                            alt="..."
                        />
                        <div class="carousel-caption hidden md:block absolute text-center">
                            <h5 class="text-xl">First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div class="carousel-item relative float-left w-full">
                        <img
                            src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
                            class="block w-full"
                            alt="..."
                        />
                        <div class="carousel-caption hidden md:block absolute text-center">
                            <h5 class="text-xl">Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div class="carousel-item relative float-left w-full">
                        <img
                            src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
                            class="block w-full"
                            alt="..."
                        />
                        <div class="carousel-caption hidden md:block absolute text-center">
                            <h5 class="text-xl">Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                    </div>
                </div>
                <button
                    class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                >
                    <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                >
                    <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}  */