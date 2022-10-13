import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailBook, postReview, resetDetail } from "../redux/actions";
import { useEffect } from "react";
import { addCart } from "../redux/actions";

const BookDetail = () => {
  const dispatch = useDispatch();
  const bookId = useParams().id;

  useEffect(() => {
    dispatch(getDetailBook(bookId));

    return () => {
      dispatch(resetDetail());
    };
  }, []);

  const bookDetail = useSelector((state) => state.detail);
  bookDetail.quantity = 1;

  function handleClick(e) {
    let cart = JSON.parse(localStorage.getItem("bookDetail")) || [];

    let repeatBook = cart.filter((book) => book.id === bookDetail.id);

    if (repeatBook.length) {
      alert("El libro ya está agregado al carrito");
    } else {
      cart.push(bookDetail);
      alert("Libro agregado al carrito");
      dispatch(addCart(cart));
      cart = JSON.stringify(cart);
      localStorage.setItem("bookDetail", cart);
    }
  }

  const score = ["⭐", "⭐", "⭐", "⭐", "⭐"];

  const [currentValue, setCurrentValue] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverValue, setHoverValue] = useState(undefined);
  const USER = useSelector((state) => state.user);
  const LOGIN = useSelector((state) => state.login);
  const ROLE = useSelector((state) => state.role);

  const handleClickStar = (value) => {
    setCurrentValue(value + 1);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleComment = (e) => {
    if (e.target.value.trim().length < 100) {
      setComment(e.target.value);
    }
  };

  const submitReview = () => {
    if (currentValue === 0 || comment.length < 5) {
      alert("Completa bien la reseña\nSelecciona al menos una estrella");
    } else {
      // console.log({
      //   userId: USER.iduser,
      //   bookId: bookDetail.id,
      //   score: currentValue,
      //   commentUser: comment,
      // });
      dispatch(
        postReview({
          userId: USER.iduser,
          bookId: bookDetail.id,
          score: currentValue,
          commentUser: comment,
        })
      );
      setComment("");
      setCurrentValue(0);
    }
  };

  const reviews = [
    {
      userName: "Danny",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      score: 2,
    },
    {
      userName: "William",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
      score: 0,
    },
    {
      userName: "Rodrigo",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      score: 5,
    },
    {
      userName: "Gabriel",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      score: 2,
    },
    {
      userName: "Ricardo",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
      score: 1,
    },
    {
      userName: "Brayan",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      score: 4,
    },
    {
      userName: "Diego",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      score: 3,
    },
  ];

  return (
    <div className="bg-bgHome min-h-screen pb-20">
      <div className="w-max">
        <Link to="/">
          <h3 className="border-1 border-rose-500 rounded ml-10 mt-8 px-3 py-2 w-max bg-button text-white">
            &#129044; Regresar
          </h3>
        </Link>
      </div>
      <div className="m-auto mt-10 border-t-2 w-[75%] rounded border-[#555555]">
        <h2 className="text-center text-3xl font-bold uppercase font-serif text-[#19203a] pt-3">
          {bookDetail.title}
        </h2>
      </div>
      <div className="w-[75%] m-auto flex pt-10">
        <div className="w-3/4">
          <div className="flex">
            <div>
              <div>
                <h3 className="text-center text-3xl mb-1 font-bold text-[#1b1b47] border-b-2 w-4/5 m-auto">
                  <span className="text-white font-normal">Precio: </span>$
                  {Number(bookDetail.price).toFixed(2)}
                </h3>
              </div>
              <div>
                <img
                  src={bookDetail["imageLinks"]}
                  alt={`img-${bookDetail["title"]}`}
                  className="h-96 w-96 sombra rounded"
                />
              </div>
              <div className="flex mt-2">
                <button
                  className="border-1 border-rose-500 rounded w-max mx-auto px-3 py-2 mt-1 bg-button text-white flex justify-center gap-2 hover:bg-[#025634] transition-colors duration-200"
                  onClick={handleClick}
                >
                  AGREGAR AL CARRITO
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-center h-full ml-5">
                <div className="text-2xl flex flex-col justify-center w-full pr-1">
                  <div className="flex gap-5">
                    <div className="w-1/4">
                      <h3 className="mb-7 font-bold text-NavBar">AUTOR\ES</h3>
                    </div>
                    <div className="w-3/4">
                      <h3 className="mb-7 pl-7 uppercase">
                        {Array(bookDetail.authors).join(", ")}
                      </h3>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-1/4">
                      <h3 className="mb-7 font-bold text-NavBar">EDITORIAL</h3>
                    </div>
                    <div className="w-3/4">
                      <h3 className="mb-7 pl-7 uppercase">
                        {bookDetail.publisher}
                      </h3>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-1/4">
                      <h3 className="mb-7 font-bold text-NavBar">CATEGORÍAS</h3>
                    </div>
                    <div className="w-3/4">
                      <h3 className="mb-7 pl-7 uppercase">
                        {bookDetail.categories?.map((e) => e.name).join(", ")}
                      </h3>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-1/4">
                      <h3 className="mb-7 font-bold text-NavBar">ISBN</h3>
                    </div>
                    <div className="w-3/4">
                      <h3 className="mb-7 pl-7">{bookDetail.ISBN}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-white text-2xl">Descripción</h3>
            <p className="font-medium italic text-xl mt-5 p-2 pr-10 bg-[#292828] rounded-lg mr-3 text-[#bbb] pb-10">
              {bookDetail.description && bookDetail.description.length > 515
                ? `${bookDetail.description.slice(0, 515)}...`
                : `${bookDetail.description}`}
            </p>
          </div>
        </div>
        <div className="w-1/4 border border-[#153c57] rounded bg-[#0F172A]">
          <h3 className="text-center mt-3 text-white font-medium border-b-2 border-[#777777] w-[95%] m-auto">
            RESEÑAS
          </h3>
          <div className="h-[525px]  overflow-y-auto scrollCustomStyle border border-[#555555] p-1 w-[95%] m-auto rounded mt-2 bg-[#030407]">
            {reviews.length ? (
              reviews.map((review) => {
                return (
                  <div className="w-[95%] m-auto rounded p-1 mb-1">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="bg-[#808027] text-black font-medium italic px-2 rounded">
                          {review.userName}
                        </h4>
                      </div>
                      <div>
                        <h5 className="pr-3 font-bold text-white">
                          {score.slice(0, review.score).join("")}
                        </h5>
                      </div>
                    </div>
                    <div>
                      <p className="bg-[#979393] p-1 rounded-sm mt-1">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-[#999999] h-[450px] flex flex-col items-center justify-center">
                <div>
                  <h4>Aun no hay reseñas de este libro</h4>
                </div>
                <div className="flex gap-3">
                  <h4>Sé el primero en comentar</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {LOGIN === 1 && ROLE === "USER" ? (
            <div>
              <div className="w-[93%] m-auto mt-2">
                <div className="">
                  <textarea
                    placeholder="Deja tu reseña...(max 100 char)"
                    className="w-full text-white rounded outline-none p-1 h-[100px] min-h-[100px] max-h-[100px] bg-[#333333] italic border border-[#777777]"
                    value={comment}
                    onChange={(e) => handleComment(e)}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-between px-3">
                <div className="flex">
                  {score?.map((start, index) => {
                    return (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={
                          (hoverValue || currentValue) > index ? `#ff0` : `#fff`
                        }
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="hover:cursor-pointer"
                        width="25px"
                        height="25px"
                        key={index}
                        onClick={() => handleClickStar(index)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    );
                  })}
                </div>
                <div
                  className="flex px-1 rounded bg-[#19588b] hover:cursor-pointer hover:bg-[#10436d]"
                  onClick={() => submitReview()}
                >
                  <h4 className="text-white">Agregar</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className=""
                    width="25px"
                    height="25px"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-5 text-[#cccccc] flex flex-col justify-center items-center text-lg">
              <div>
                <h4>Para poder dejar tu reseña</h4>
              </div>
              <div>
                <Link to="/login">
                  <h4 className="underline hover:text-white">Inicia Sesión</h4>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
