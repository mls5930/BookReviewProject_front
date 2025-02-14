const axios = require('axios');
const path = require('path');
const mainHtml = path.join(__dirname,`../views/main/`)
const viewHtml = path.join(__dirname,`../views/view/`)
require('dotenv').config();
const BACK_HOST = process.env.BACK_HOST;
const BACK_HOST_PORT = process.env.BACK_HOST_PORT;
const BACK_URL = `http://${BACK_HOST}:${BACK_HOST_PORT}`;
const {bookData } = require("../public/js/main")
//책 검색
const getList = async(req, res) =>{
    //감상문 전체 검색
    const bookDataView = await axios.get(`${BACK_URL}/review`);
    //책 신간 전체 리스트
    const bookDatalist = await axios.get(`${BACK_URL}/view?QueryType=ItemNewSpecial&SearchTarget=Book&amout=10`);
    
    const mybookData = bookDatalist.data?.map( (book) => {
        return {
            title: book.title.split("-")[0],
            cover: book.cover,
            author: book.author.split(",")[0],
            isbn13 : book.isbn13
        };
    });
  
    const bookDataViews = bookDataView.data;

    res.render(mainHtml+`main.html` ,{
        mybookData,
        bookDataViews, // : mybookData
        user: req.user
    })
}

//검색 창에 책 검색
const getSearchBook = async (req, res) => {
  const { query } = req.query;
  let bookDatalist = "";
  if (query) {
    bookDatalist = await axios.get(
      `${BACK_URL}/search?query=${query}&SearchTarget=Book&amout=10`
    );
  } else {
    bookDatalist = await axios.get(
      `${BACK_URL}/view?QueryType=ItemNewSpecial&SearchTarget=Book&amout=10`
    );
  }
  res.render(viewHtml + "bookSearch.html", {result :query, listBook: bookDatalist.data , user:req.user  });
};

const getCommunity = async (req, res) => {
    try {
      const response = await fetch(`${BACK_URL}/community/list`);
      const communitiesData = await response.json();
      res.render(viewHtml + "community.html", { communitiesData , user:req.user  });
    } catch (error) {
      res.render(viewHtml + "community.html", { communitiesData: []  , user:req.user });
    }
}

const getBookMark = async (req, res) => {
    req.user.nickname;
    try {
      const bookmark = await axios.post(`${BACK_URL}/user/register`, {
        nickname: nickname,
      });
      res.status(202).render("main/mypage.html", {
        bookmark,
        user:req.user 
      });
    } catch (error) {
      return res.status(401).send();
    }
  }

  const getBookList = async (req, res) => {
    try{
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
      res.render(viewHtml + "bookList.html", { listBook, user:req.user });
    }catch (error) {
      return res.status(401).send();
    }
  }
  

module.exports =  { getList, getSearchBook, getCommunity, getBookMark, getBookList};