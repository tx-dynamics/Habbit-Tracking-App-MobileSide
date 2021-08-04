import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { wp, hp } from '../../../Helpers/Responsiveness'
import { Colors } from '../../../Constants/Colors'

export default function HeadCard(props) {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}
                style={{  marginTop: wp(5) }}>
                <View style={{ marginHorizontal: 10, flexDirection: "row", flex: 1, }}>
                    <Image source={props.item.Image} style={{ width: wp(15), height: wp(15), borderRadius: wp(100) }} />
                    <View style={{ marginLeft: wp(3), justifyContent: "center" }}>
                        <Text style={{ fontSize: 19 }}>{props.item.name}</Text>
                        <Text style={{ color: Colors.gray, fontSize:12 }}>{"12 hr ago"}</Text>
                    </View>
                </View>
                <Text style={{ color: Colors.gray, marginTop: wp(4), fontSize:10, marginLeft:wp(4)}}>{"Hi all! happy to be in challange"}</Text>

                <View style={{ height:1, backgroundColor:Colors.LightGray, marginTop:10 }}>
                </View>
            </TouchableOpacity>
        </View>
    )
}
