import { useEffect, useState } from "react";
import { getBooks, deleteBook, searchBooks } from "../services/api";
import { useNavigate } from "react-router-dom";

function BookList() {
    const [books, setBooks] = useState([]);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const loadBooks = async () => {
        const res = await getBooks();
        setBooks(res.data);
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Xóa sách?")) {
            await deleteBook(id);
            loadBooks();
        }
    };

    const handleSearch = async () => {
        if (keyword.trim() === "") {
            loadBooks();
        } else {
            const res = await searchBooks(keyword);
            setBooks(res.data);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>📚 Danh sách sách</h2>

            {/* SEARCH */}
            <div style={{ marginBottom: "10px" }}>
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm</button>
            </div>

            {/* Add */}
            <div style={{ marginBottom: "10px", textAlign: "left"}}>
                <button onClick={() => navigate("/add")}>
                    ➕ Thêm sách
                </button>
            </div>


            {/* TABLE */}
            <table border="1" cellPadding="10" width="100%">
                <thead style={{ background: "#eee" }}>
                <tr>
                    <th>ID</th>
                    <th>Ảnh</th>
                    <th>Tên sách</th>
                    <th>Tác giả</th>
                    <th>Thể loại</th>
                    <th>NXB</th>
                    <th>Năm</th>
                    <th>Số lượng</th>
                    <th>Mô tả</th>
                    <th>Hành động</th>
                </tr>
                </thead>

                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.id}</td>

                        <td>
                            <img
                                src={book.imageUrl}
                                alt=""
                                width="80"
                            />
                        </td>

                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.category}</td>
                        <td>{book.publisher}</td>
                        <td>{book.publishedYear}</td>
                        <td>{book.quantity}</td>
                        <td style={{ maxWidth: "200px" }}>
                            {book.description}
                        </td>

                        <td>
                            <button onClick={() => navigate(`/edit/${book.id}`)}>
                                Sửa
                            </button>
                            <button
                                onClick={() => handleDelete(book.id)}
                            >
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;