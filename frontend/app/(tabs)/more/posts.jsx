import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Post from "../../../Components/post";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Back from "../../../Components/back";
import Topline from "../../../Components/topline";
import ShowComments from "../../../Components/showcomments";

const Posts = () => {
  const [caption, setCaption] = useState("");
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successComment, setSuccesscomment] = useState(false);
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [opencomments, setOpenComments] = useState(true);
  const [postComments, setPostComments] = useState([]);
  // Authenticatation checkout
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          return <Redirect href={"../../login"} />;
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, []);

  // get the comments of a specific post
  const get_post_comments = async (id) => {
    const token = await AsyncStorage.getItem("token");
    try {
      if (token) {
        const response = await fetch(`${BASE_URL}/api/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        setPostComments(data.comments);
        setLoading(false);
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // get user info
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(`${BASE_URL}/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();

          setProfile(data.user);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // get all the posts
  useEffect(() => {
    const get_posts = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(`${BASE_URL}/api/posts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setPosts(data);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    get_posts();
  }, []);

  return (
    <View style={{ flex: 1, paddingBottom: 5, backgroundColor: "white" }}>
      <ScrollView style={styles.scroll}>
        <Back title="Posts" />
        <View style={styles.postsPage}>
          <View style={styles.data}>
            {posts && (
              <View style={styles.posts}>
                {posts.map((post, index) => (
                  <Post
                    post={post}
                    key={index}
                    setSuccesscomment={setSuccesscomment}
                    setOpenComments={setOpenComments}
                    get_post_comments={get_post_comments}
                  />
                ))}
              </View>
            )}
            {success && (
              <View style={styles.success}>
                <Text style={styles.successText}>Post Added Successfully </Text>
              </View>
            )}
          </View>
          {successComment && (
            <View style={styles.success}>
              <Text style={styles.successText}>
                Comment Added Successfully{" "}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      {!opencomments && (
        <ShowComments
          setOpenComments={setOpenComments}
          postComments={postComments}
        />
      )}
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
  },
  success: {
    position: "absolute",
    width: "60%",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    justifyContent: "center",
    backgroundColor: "black",
    marginLeft: 80,
    borderRadius: 8,
    top: "20%",
  },
  successText: {
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
  },
  data: {
    width: "93%",
    marginRight: "auto",
    marginLeft: "auto",
    flex: 1,
    position: "relative",
  },

  postsPage: {
    paddingTop: 100,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  },
  add: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d7d7d7",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderRadius: 20,
    justifyContent: "space-between",
  },

  btnAdd: {
    backgroundColor: "#E87A00",
    padding: 4,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    width: 55,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    color: "white",
  },
  fileInputButton: {
    fontSize: 40,
  },
  camera: {
    fontSize: 20,
    color: "#808080",
  },
  posts: {
    paddingTop: 20,
    display: "flex",
    gap: 10,
  },
});
