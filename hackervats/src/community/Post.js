import { Box, Center, HStack, Text } from "@chakra-ui/react";
import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import VoteButtons from "./vote-button";
import db from "../lib/firebase";
import {useState} from 'react'
import './comm.css'
import AddNewComment from "./add-new-comment";
import { getFirestore, collection, getDocs ,doc,addDoc,updateDoc} from 'firebase/firestore/lite'
//import { addDoc,getFirestore, collection, getDocs,updateDoc ,doc} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';

const Post = (props) => {
  
   useEffect(()=>{
     
   },[props.post.isCommentVisible])
  function handleComment(e)
  {
    const id=props.post.id;
    props.posts.map((post)=>{
      if(post.id==id)
      {
        const postRef=doc(db,"posts",post.id);
       if(post.isCommentVisible==false)
       {
         post.isCommentVisible=true;
       }
       else
       {
        post.isCommentVisible=false;
       }
         
         console.log( post.isCommentVisible)
         updateDoc(postRef,post);
      }
    })

  }
  return (
    <HStack key={props.post.id} w="100%" alignItems="flex-start">
      <VoteButtons post={props.post} />
      <Box className="box-posts" bg="gray.100" p={4} w="100%" rounded="md" >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text className="user-post">User: {props.post.user}</Text>
          <Text className="user-post"> {props.post.createdAt.toString()}</Text>
        </div>
        <Text className="text-post">{props.post.title}</Text>
        <br></br>
        <ul className="crsr"> <i className="fa-solid fa-message icon-comm" onClick={(e)=>handleComment(e)}></i></ul>
        {!props.post.isCommentVisible && <> 
        <Box className="comm-list" bg="gray.100" p={4} w="100%" rounded="md" >
          {props.post.comment.map((comm) => (
            <li>{comm}</li>
          ))}
      </Box>
      <AddNewComment post={props.post} /></>}
      </Box>
    </HStack>
  );
}

export default Post;