import { useState } from "react";
import { createBook } from "../services/api";
import { useNavigate } from "react-router-dom";

function AddBook() {
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

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createBook(book);
            alert("Thêm sách thành công!");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Lỗi khi thêm sách!");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>➕ Thêm sách</h2>

            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Tên sách" onChange={handleChange} required /><br /><br />
                <input name="author" placeholder="Tác giả" onChange={handleChange} required /><br /><br />
                <input name="category" placeholder="Thể loại" onChange={handleChange} /><br /><br />
                <input name="publisher" placeholder="NXB" onChange={handleChange} /><br /><br />
                <input name="publishedYear" type="number" placeholder="Năm XB" onChange={handleChange} /><br /><br />
                <input name="quantity" type="number" placeholder="Số lượng" onChange={handleChange} /><br /><br />
                <input name="imageUrl" placeholder="Link ảnh" onChange={handleChange} /><br /><br />

                <textarea
                    name="description"
                    placeholder="Mô tả"
                    onChange={handleChange}
                /><br /><br />

                <button type="submit">Thêm</button>
            </form>
        </div>
    );
}

export default AddBook;