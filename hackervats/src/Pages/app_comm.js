import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import db from '../lib/firebase'
import { getFirestore, collection, getDocs ,doc} from 'firebase/firestore/lite'
// import { getFirestore, collection, getDocs ,doc} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';
import Navbar from "../community/navbar-comm";
import Post from "../community/Post";
import '../community/comm.css';








const Community = () => {
  let [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
 

  let post1 = [];
  useEffect(() => {
    getDocs(collection(db, "posts")).then((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      post1 = data;
      setPosts(post1);
      setLoading(false);
    })
  }, [posts]);
  
  const _posts = [];
  useEffect(() => {
    getDocs(collection(db, "posts")).then((snapshot)=>
    {
      
      snapshot.docs.forEach((doc)=>
      {
        _posts.push(
          {
            id: doc.id,
            ...doc.data(),
          }
        )
      })
      setPosts(_posts);
    })
  }, []);

  if (isLoading) {
    return (
      <Flex minH="100vh" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxW="md" centerContent p={8}>
        <VStack spacing={8} className="post-list" w="100%">
          {posts.map((post) => (
            <Post post={post} key={post.id} posts={posts} />
          ))}
        </VStack>
      </Container>
    </>
  );
};

export default Community;