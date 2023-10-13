import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  View,
  LogBox,
} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from '../helper/global';
import {run} from 'jest';
import Feed from './Feed';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {UserAction} from '../redux/actions/AddAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ADD_DATA} from '../redux/type';

const Gym_Feed = () => {
  const [visible, setvisible] = useState(false);
  const [image, setimage] = useState('');
  const [comment, setcomment] = useState('');
  const [imageTitle, setimageTitle] = useState('');
  const time = new Date().toLocaleTimeString('en-IN', {timeStyle: 'short'});

  const dispatch = useDispatch();

  const imageSelect = async () => {
    let options = {
      mediaType: 'image',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        {
          setimage(response?.assets[0]?.uri);
        }
      }
    }).catch(error => console.log('error', error));
  };

  const Post = () => {
    let data = {};
    if (comment.trim() == '') {
    } else {
      data = {
        id: Date.now(),
        image: image,
        comment: comment,
        image_title: imageTitle,
        time: time,
        like: 0,
      };
      console.log('userData', data);
    }
    dispatch({type: ADD_DATA, payload: data});
    setcomment('');
    setimageTitle('');
    setimage('');
    setvisible(!visible);
  };

  // AsyncStorage.clear();
  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.title_container}>
        <Text style={styles.title}>Arnab's Gym Feed</Text>
      </View>
      <View style={styles.comment_container}>
        <Image
          source={require('../../assets/image/ProfileTab.png')}
          style={styles.avtar}
        />
        <Pressable
          style={{flex: 1}}
          pointerEvents="box-only"
          onPress={() => setvisible(!visible)}>
          <TextInput
            placeholder="What's going on today?"
            style={styles.inputs}
            placeholderTextColor={'#2E3B39'}
            editable={false}
          />
        </Pressable>
      </View>
      <View style={styles.btn_container}>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require('../../assets/image/image.png')}
            style={styles.btn_img}
          />
          <Text style={styles.btn_title}>Add Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require('../../assets/image/video.png')}
            style={styles.btn_img}
          />
          <Text style={styles.btn_title}>Add Video</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.postContainer}>
        <Text style={styles.title}>Your Posts</Text>
      </View>

      <View style={styles.post_btn_container}>
        <TouchableOpacity style={styles.posts_btn}>
          <Text>All post</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: 'white', fontWeight: 500}}>Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: 'white', fontWeight: 500}}>Video</Text>
        </TouchableOpacity>
      </View>

      <Feed />

      <Modal
        animationType={'fade'}
        transparent={true}
        visible={visible}
        onRequestClose={this.closeModal}>
        <View style={styles.modal_container}>
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.colose_btn}
              onPress={() => setvisible(!visible)}>
              <Text style={styles.colose_title}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.create_post}>Create post</Text>
            <TextInput
              multiline={true}
              style={styles.post_input}
              placeholderTextColor={'#2E3B39'}
              placeholder="Whats going on today?"
              onChangeText={text => setcomment(text)}
            />
            <Text style={styles.modal_add_title}>Add to your post</Text>
            <View style={[styles.btn_container, {}]}>
              <TouchableOpacity
                style={[styles.btn, {marginRight: 10}]}
                onPress={() => imageSelect()}>
                <Image
                  source={require('../../assets/image/image.png')}
                  style={styles.btn_img}
                />
                <Text style={styles.btn_title}>Add Image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Image
                  source={require('../../assets/image/video.png')}
                  style={styles.btn_img}
                />
                <Text style={styles.btn_title}>Add Video</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.image_title}
              placeholderTextColor={'#2E3B39'}
              placeholder="Title of Image/ Video (optional)"
              onChangeText={text => setimageTitle(text)}
            />
            <TouchableOpacity
              onPress={() => Post()}
              style={{marginTop: hp(70)}}>
              <LinearGradient
                colors={['#51E75F', '#A8FF0D']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 2}}
                style={styles.post_btn}>
                <Text style={styles.post_btn_title}>POST</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Gym_Feed;

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: '#061416',
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: wp(20),
  },
  title_container: {
    backgroundColor: '#061517',
    paddingTop: hp(20),
  },
  comment_container: {
    paddingVertical: wp(40),
    paddingHorizontal: wp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avtar: {
    width: wp(40),
    height: wp(40),
    backgroundColor: '#26413C',
    borderRadius: 20,
    tintColor: '#708582',
  },
  inputs: {
    borderColor: '#2E3B39',
    borderWidth: 1,
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
    borderRadius: 5,
    marginLeft: 10,
  },
  btn: {
    backgroundColor: '#111B18',
    paddingVertical: hp(15),
    paddingHorizontal: wp(35),
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btn_container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  btn_title: {
    color: 'white',
    alignSelf: 'center',
  },
  btn_img: {
    width: wp(20),
    height: wp(20),
    tintColor: 'white',
    marginRight: 10,
  },
  postContainer: {
    marginTop: hp(50),
  },
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#181E1E',
    paddingHorizontal: wp(10),
    paddingVertical: wp(10),
    borderRadius: 10,
    width: wp(350),
    alignItems: 'center',
  },
  colose_title: {
    color: 'white',
  },
  colose_btn: {
    alignSelf: 'flex-end',
    margin: wp(10),
  },
  post_input: {
    height: hp(150),
    borderColor: '#2E3B39',
    borderWidth: 1,
    width: '100%',
    marginVertical: wp(20),
    padding: wp(10),
    color: 'white',
  },
  modal_add_title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginVertical: hp(15),
  },
  post_btn: {
    paddingVertical: hp(12),
    paddingHorizontal: wp(130),
    borderRadius: 10,
    marginBottom: hp(10),
  },
  post_btn_title: {
    fontWeight: '500',
  },
  image_title: {
    borderColor: '#2E3B39',
    borderWidth: 1,
    width: '100%',
    marginVertical: wp(20),
    paddingVertical: wp(8),
    paddingHorizontal: wp(20),
    color: 'white',
    borderRadius: 10,
  },
  create_post: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  posts_btn: {
    backgroundColor: '#3ECC8F',
    paddingHorizontal: wp(35),
    paddingVertical: hp(8),
    borderRadius: 10,
  },
  post_btn_container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 45,
    marginTop: 20,
    alignItems: 'center',
  },
});
