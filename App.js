import CameraRoll from '@react-native-community/cameraroll';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

const { width, height } = Dimensions.get('screen')

export default function App() {

  const [photos, setPhotos] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(() => {
      CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
        .then(r => {
          console.log(r)
          setSelected(r.edges[0].node.image.uri)
          setPhotos(r.edges)
        })
        .catch((err) => {
          console.log(err);
        });
    })
  }, [])

  return (

    <ScrollView style={styles.container}>

      <View style={styles.block}>
        <TouchableOpacity>
          <Text style={styles.textTitle}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.textTitle, { color: 'lightblue' }]}>Next</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image style={styles.selectedImage} source={{ uri: selected }} />
      </View>

      <View style={styles.galleryContainer}>

        {photos.map((item, index) => {

          return <TouchableOpacity key={index} onPress={() => setSelected(item.node.image.uri)} style={styles.galleryImageContainer}>
            <Image style={styles.galleryImage} source={{ uri: item.node.image.uri }} />
          </TouchableOpacity>

        })}

      </View>

      <View style={styles.block}>
        <TouchableOpacity>
          <Text style={styles.textTitle}>More</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 12
  },
  textTitle: {
    color: "black",
    fontWeight: 'bold'
  },
  galleryImage: {
    height: '100%',
    width: '100%'
  },
  galleryImageContainer: {
    height: 100,
    width: (width / 4) - 10,
    margin: 5
  },
  galleryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  selectedImage: {
    height: height / 2.5,
    width: '100%',
  }
})