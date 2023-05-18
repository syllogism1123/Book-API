import {Button, Card, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Book} from "../model/Book";
import {useBook} from "../hook/useBook";

export const BookDetails = () => {
    const [book, setBook] = useState<Book>()
    const {id} = useParams<{ id: string }>();
    const baseUrl = "https://my-booklibrary.fly.dev";
    const {addBook} = useBook();
    const navi = useNavigate();
    const loadBookById = (id: string) => {
        axios.get(baseUrl + `/api/books/search/` + id, {
            withCredentials: true
        })
            .then((response) => {
                setBook(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    useEffect(() => {
        if (id) {
            loadBookById(id)
        }
    }, [id])
    const addToLib = () => {
        if (book) {
            addBook(book).then(() => {
                    navi("/mylibrary")
                }
            ).catch((r) => console.error(r));
        }
    }


    return (
        <div style={{fontSize: '18px'}} className="book-details-wrapper">
            <Card className='book-details' variant="elevation" style={{backgroundColor: 'cyan', marginTop: "20px"}}>
                <img id='book-img-details' src={book?.imageUrl} alt={book?.title}/>
                <div className="details" style={{fontFamily: 'Arial', color: 'black', lineHeight: '1.6'}}>
                    <Typography style={{fontSize: '24px', fontWeight: 'bold'}}>Title: {book?.title}</Typography>
                    <Typography
                        style={{fontSize: '18px', fontWeight: 'bold'}}>Authors: {book?.authors.join(', ')}</Typography>
                    <Typography style={{fontSize: '18px', fontWeight: 'bold'}}>Publisher: {book?.publisher}</Typography>
                    <Typography
                        style={{fontSize: '18px', fontWeight: 'bold'}}>PublisherDate: {book?.publishedDate}</Typography>
                    <Typography style={{
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>Description: {book?.description.replace(/<[^>]*>/g, "")}</Typography>
                    <Typography style={{
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>AverageRating: {book?.averageRating.toPrecision(2)}</Typography>
                </div>
                <div className='card-button'>
                    <Button id='add-button' variant="contained" color="secondary" type="submit" size="small"
                            onClick={addToLib}>
                        Add to Lib
                    </Button>
                </div>
            </Card>
        </div>
    );
}