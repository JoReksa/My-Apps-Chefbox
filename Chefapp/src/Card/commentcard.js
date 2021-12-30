import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {Rating, AirbnbRating} from 'react-native-ratings';

export default function commentcard({data, value}) {
  //   const state = useSelector(state => state.fetch);
  // console.log('data comm', data);
  console.log('data comm2', value);

  // console.log('bisa?', merge);
  return (
    <View style={{flex: 1}}>
      {/* <Text>{state.dataDetail.allRatings.value}</Text> */}

      <Rating
        // type="heart"
        ratingCount={5}
        size={10}
        isDisabled
        imageSize={20}
        // showRating={state.dataDetail.averageRatings}
        defaultRating={data.value}
      />
      {value.map((item, index) => (
        <Text>{item.comment}</Text>
      ))}
    </View>
  );
}
