import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hp, wp} from '../helper/global';
import {LIKE} from '../redux/type';

const Feed = () => {
  const [like, setlike] = useState(0);
  const Data = useSelector(state => state.user.Data);
  const likedata = e => {
    Data.map((item, index) => {
      if (item.id == e.id) {
        console.log('>>>', Data[index]);
        return setlike(Data[index].like);
      }
    });
  };

  const dispatch = useDispatch();

  const EditeName = e => {
    dispatch({type: LIKE, payload: {id: e.id, like: like}});
  };

  console.log('data', Data);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={Data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              <Text style={styles.image_title}>{item?.image_title}</Text>
              <Image
                source={{uri: item.image}}
                style={styles.img}
                resizeMode="cover"
              />
              <Text style={styles.comment}>{item.comment}</Text>
              <Text style={styles.time}>{`Posted on ${item?.time}`}</Text>
              <View
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTopColor: 'white',
                  borderTopWidth: 1,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setlike(like + 1);
                      EditeName(item);
                      likedata(item);
                    }}>
                    <Text style={styles.like}>♡</Text>
                  </TouchableOpacity>
                  <Text style={{color: 'white', marginLeft: 10}}>
                    {item.like}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  image_title: {
    color: 'white',
    marginVertical: hp(10),
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: wp(20),
  },
  img: {
    borderRadius: 10,
    width: '100%',
    height: 200,
  },
  comment: {
    color: 'white',
    marginVertical: hp(10),
  },
  time: {
    color: '#607374',
  },
  like: {
    color: 'white',
    fontSize: 20,
  },
});
