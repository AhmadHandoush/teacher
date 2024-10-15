import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../app/utils/constants";
import { AntDesign } from "@expo/vector-icons";

const Post = ({
  post,
  setSuccesscomment,
  setOpenComments,
  get_post_comments,
}) => {
  const { caption, image, created_at, id } = post;
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  const [commentsCount, setCommentsCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      try {
        if (token) {
          const response = await fetch(`${BASE_URL}/api/post_owner_data`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();

          setProfile(data[0].user);
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

  useEffect(() => {
    const get_likes = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await fetch(`${BASE_URL}/api/likes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        setLikes(data.likes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    get_likes();
  }, []);
  useEffect(() => {
    const get_comments_number = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await fetch(`${BASE_URL}/api/comments_number/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        setCommentsCount(data.comments);
      } catch (error) {
        console.error("Error fetching comments count:", error);
      }
    };

    get_comments_number();
  }, []);

  const handleAddComment = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/api/add_comment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      });
      const data = await response.json();

      setComment("");
      setSuccesscomment(true);
      setTimeout(() => {
        setSuccesscomment(false);
      }, 2000);
      setCommentsCount(commentsCount + 1);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const handleAddLike = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/like/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setLikes(likes + 1);
        setLiked(true);
      } else {
        console.error("Failed to like/dislike post");
      }
    } catch (error) {
      console.error("Error liking/disliking post:", error);
    }
  };
  const handleOpenComments = () => {
    setOpenComments(false);
    get_post_comments(id);
  };
  const handleDislike = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      await fetch(`${BASE_URL}/api/dislike/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLiked(false);
      setLikes(likes - 1);
    } catch (error) {
      console.log("Error: Failed to dislike ");
    }
  };

  return (
    <View style={styles.post}>
      <View style={styles.top}>
        <View style={styles.img}>
          {profile && (
            <Image
              source={{ uri: `${BASE_URL}/images/${profile.user_image}` }}
              style={styles.profile}
            />
          )}
        </View>
        {profile && (
          <View style={styles.proinfo}>
            <Text style={styles.name}>{profile.name} </Text>
            <Text style={styles.time}>{created_at.slice(0, 10)}</Text>
          </View>
        )}
      </View>
      <Text style={styles.caption}>{caption}</Text>
      <Image
        source={{ uri: `${BASE_URL}/images/${image}` }}
        style={styles.postImage}
      />
      <View style={styles.info}>
        <Text style={styles.likes}> {likes} likes</Text>
        <TouchableOpacity onPress={handleOpenComments}>
          <Text style={styles.comments}> {commentsCount} comments</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        {!liked ? (
          <TouchableOpacity onPress={handleAddLike}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={32}
              color="black"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleDislike}>
            <AntDesign name="heart" size={32} color="red" />
          </TouchableOpacity>
        )}

        <View style={styles.addComment}>
          <TextInput
            placeholder="Add a comment"
            onChangeText={setComment}
            value={comment}
            style={styles.input}
            selectionColor={"#E87A00"}
          />
          <TouchableOpacity style={styles.submit} onPress={handleAddComment}>
            <Text style={styles.adding}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  post: {
    borderWidth: 1,
    borderColor: "#d7d7d7",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 6,
  },

  top: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
  caption: {
    marginLeft: 10,
    marginBottom: 5,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  profile: {
    width: "100%",
    height: "100%",
  },
  proinfo: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    color: "#808080",
    fontSize: 12,
  },
  postImage: {
    width: "100%",
    height: 250,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingTop: 5,
  },
  likes: {
    color: "#808080",
  },
  comments: {
    color: "#808080",
  },
  heart: {},
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 5,
    paddingLeft: 5,
    marginTop: 10,
  },
  addComment: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#d7d7d7",
    borderRadius: 10,
    padding: 5,

    paddingRight: 5,
    paddingLeft: 10,
    width: 260,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    height: 30,
  },
  submit: {
    backgroundColor: "#e87a00",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  adding: {
    color: "white",
    fontWeight: "bold",
  },
});
