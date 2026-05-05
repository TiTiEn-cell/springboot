import { useEffect, useState } from "react";
import { getBook, updateBook } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: "",
        author: "",
        category: "",
        publisher: "",
        publishedYear: "",
        quantity: 0,
        description: "",
        imageUrl: ""
    });


    const loadBook = async () => {
        const res = await getBook(id);
        setBook(res.data);
    };

    // Load dữ liệu sách theo id
    useEffect(() => {
        loadBook();
    }, []);

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateBook(id, book);
            alert("Cập nhật thành công!");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Lỗi khi cập nhật!");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>✏️ Sửa sách</h2>

            <form onSubmit={handleSubmit}>
                <input name="title" value={book.title} onChange={handleChange} required /><br /><br />
                <input name="author" value={book.author} onChange={handleChange} required /><br /><br />
                <input name="category" value={book.category} onChange={handleChange} /><br /><br />
                <input name="publisher" value={book.publisher} onChange={handleChange} /><br /><br />
                <input name="publishedYear" type="number" value={book.publishedYear} onChange={handleChange} /><br /><br />
                <input name="quantity" type="number" value={book.quantity} onChange={handleChange} /><br /><br />
                <input name="imageUrl" value={book.imageUrl} onChange={handleChange} /><br /><br />

                <textarea
                    name="description"
                    value={book.description}
                    onChange={handleChange}
                /><br /><br />

                <button type="submit">Lưu</button>
            </form>
        </div>
    );
}

export default EditBook;