import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ImageView from "react-native-image-viewing";
import styles from './styles.js';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => getData(), []);

  const getData = () => {
    console.log(offset);
    if (!loading && !isListEnd) {
      console.log('getData');
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/photos?_page=${offset}&_limit=10`)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('responseJson', responseJson);
          if (Array.isArray(responseJson)) {
            setOffset(offset + 1);
            setDataSource([...dataSource, ...responseJson]);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };


  const ItemView = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.imageTile}
        onPress={() => showPreview(item)}
      >
        <View style={styles.imageBox}>
          <Image
            source={{ uri: item.thumbnailUrl }}
            style={styles.image}
          />
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.imageText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  const showPreview = (item) => {
    setImages([{ uri: item.url }]);
    setIsVisible(true);
  };

  return (
    <View style={styles.rootContainer}>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <FlatList
        data={dataSource}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Home;