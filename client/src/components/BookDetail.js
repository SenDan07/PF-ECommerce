import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailBook, resetDetail } from "../redux/actions";
import { useEffect } from "react";

const BookDetail = () => {
  const dispatch = useDispatch();
  const bookId = useParams().id * 1;
  console.log(bookId);
  useEffect(() => {
    dispatch(getDetailBook(bookId));

    return () => {
      dispatch(resetDetail());
    };
  }, []);

  const bookDetail = useSelector((state) => state.detail);

  //   const { name, description, released, rating, platforms, image, genres } =
  //     bookDetail[0];
  //   console.log(bookDetail);
  return (
    <div>
      <div>
        <Link to="/">
          <h3>&#129044; Regresar</h3>
        </Link>
      </div>
      <div class="w-2/4 m-auto mt-20">
        <div class="flex">
          <div>
            <div>
              <h3 class="text-center">
                <span>Precio: </span>$00,00
              </h3>
            </div>
            <div>
              <img
                src={bookDetail["image"]}
                alt={`img-${bookDetail["name"]}`}
                class="h-96 w-80 rounded"
              />
            </div>
            <div>
              <h4 class="text-center">Añadir al carrito</h4>
            </div>
          </div>
          <div class="w-full">
            <div class="m-auto">
              <h2 class="text-center">Titulo Libro</h2>
            </div>
            <div class="flex justify-center border-2 border-indigo-500/100 h-full">
              <div>
                <h3>AUTOR</h3>
                <h3>EDITORIAL</h3>
                <h3>CATEGORÍAS</h3>
                <h3>EDICIÓN</h3>
                <h3>TIPO</h3>
                <h3>ISBN</h3>
              </div>
              <div>
                <h3>Lorem Ipsum</h3>
                <h3>Lorem Ipsum</h3>
                <h3>Lorem Ipsum, Lorem Ipsum...</h3>
                <h3>Lorem Ipsum</h3>
                <h3>Lorem Ipsum</h3>
                <h3>Lorem Ipsum</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
