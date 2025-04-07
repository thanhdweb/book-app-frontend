import React, { useState } from "react";
import {
  useDeleteBookMutation,
  useFetchAllBooksQuery,
} from "../../../redux/features/books/booksApi";
import { Link, useNavigate } from "react-router-dom";

import ReactPaginate from "react-paginate";

const ManageBooks = () => {
  const navigate = useNavigate();

  const { data: books, refetch } = useFetchAllBooksQuery();

  const [deleteBook] = useDeleteBookMutation();
  // Handle deleting a book
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id).unwrap();
      alert("Book deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete book:", error.message);
      alert("Failed to delete book. Please try again.");
    }
  };

  const [currentPage, setCurrentPage] = useState(0); // Sửa: Bắt đầu từ 0 vì react-paginate dùng index từ 0
  const booksPerPage = 15; // Số sách trên mỗi trang

  // Tính toán số trang và dữ liệu hiển thị trên trang hiện tại
  const totalBooks = books ? books.length : 0;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const startIndex = currentPage * booksPerPage; // Sửa: Tính startIndex dựa trên currentPage (bắt đầu từ 0)
  const endIndex = startIndex + booksPerPage;
  const currentBooks = books ? books.slice(startIndex, endIndex) : [];

  // Thêm: Hàm xử lý khi chuyển trang (react-paginate sẽ gọi hàm này)
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
  };

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Books
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <div className="overflow-x-auto">
                <table className="hidden sm:table items-center bg-transparent w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        #
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Book Title
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Category
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Price
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBooks &&
                      currentBooks.map((book, index) => (
                        <tr key={index}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                            {startIndex + index + 1}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {book.title}
                          </td>
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {book.category}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            ${book.newPrice}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">
                            <Link
                              to={`/dashboard/edit-book/${book._id}`}
                              className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteBook(book._id)}
                              className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className="sm:hidden space-y-4 p-4">
                  {currentBooks &&
                    currentBooks.map((book, index) => (
                      <div
                        key={index}
                        className="border border-blueGray-200 rounded-lg p-4 shadow-sm"
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-semibold text-blueGray-700">
                            #{startIndex + index + 1}
                          </div>
                          <div className="space-x-2">
                            <Link
                              to={`/dashboard/edit-book/${book._id}`}
                              className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-2"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteBook(book._id)}
                              className="font-medium bg-red-500 py-1 px-3 rounded-full text-white"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="text-sm font-medium text-blueGray-700">
                            Title: {book.title}
                          </div>
                          <div className="text-sm text-blueGray-500">
                            Category: {book.category}
                          </div>
                          <div className="text-sm text-blueGray-500">
                            Price: ${book.newPrice}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Sửa: Sử dụng react-paginate để thay thế phân trang code thuần */}
              {totalBooks > booksPerPage && (
                <div className="flex justify-center my-4">
                  <ReactPaginate
                    previousLabel={
                      <span className="block px-2 py-1">{"<<"}</span>
                    }
                    nextLabel={<span className="block px-2 py-1">{">>"}</span>}
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={0}
                    onPageChange={handlePageChange}
                    containerClassName={"flex space-x-2"}
                    pageClassName={
                      "px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }
                    activeClassName={"bg-indigo-500 text-white"}
                    previousClassName={`px-3 py-1 rounded uppercase text-xs font-semibold ${
                      currentPage === 0
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-500 text-white hover:bg-indigo-600"
                    }`}
                    nextClassName={`px-3 py-1 rounded uppercase text-xs font-semibold ${
                      currentPage === totalPages - 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-500 text-white hover:bg-indigo-600"
                    }`}
                    breakClassName={
                      "px-3 py-1 rounded bg-gray-200 text-gray-500 cursor-default"
                    }
                    disabledClassName={"cursor-not-allowed"}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageBooks;
