const axios = require('axios');
const path = require('path');
const viewHtml = path.join(__dirname,`../views/view/`)
require('dotenv').config();
const BACK_HOST = process.env.BACK_HOST;
const BACK_HOST_PORT = process.env.BACK_HOST_PORT;
const BACK_URL = `http://${BACK_HOST}:${BACK_HOST_PORT}`;

const getAudioList = async(req, res) => {
    //책 신간 전체 리스트
    const bookDatalist = await axios.get(`${BACK_URL}/view?QueryType=ItemNewSpecial&SearchTarget=Book&amout=10`);
    bookDatalists = bookDatalist.data;

    const listBook = bookDatalists.map((book) => {
      return {
        title: book.title.split("-")[0],
        cover: book.cover,
        author: book.author.split(",")[0],
        isbn13 : book.isbn13
      };
    });
    res.render(viewHtml + "audioList.html", { listBook });
};


const getAudioView = async (req, res) => {
    //책 신간 전체 리스트
    const bookDatalist = await axios.get(`${BACK_URL}/view?QueryType=ItemNewSpecial&SearchTarget=Book&amout=10`);
    bookDatalists = bookDatalist.data;

    const listBook = bookDatalists.map((book) => {
      return {
        title: book.title.split("-")[0],
        cover: book.cover,
        author: book.author.split(",")[0],
        isbn13 : book.isbn13
      };
    });

    res.render(viewHtml + "audioBookView.html", { bookData: listBook[0] });
};

const getAudioWrite = async (req, res) => {
      //책 신간 전체 리스트
      const bookDatalist = await axios.get(`${BACK_URL}/view?QueryType=ItemNewSpecial&SearchTarget=Book&amout=10`);
      bookDatalists = bookDatalist.data;
  
      const listBook = bookDatalists.map((book) => {
        return {
          title: book.title.split("-")[0],
          cover: book.cover,
          author: book.author.split(",")[0],
          isbn13 : book.isbn13
        };
      });
    res.render(viewHtml + "audioWrite.html", { bookData: listBook[0] });
  }

module.exports = {getAudioList, getAudioView, getAudioWrite};
