import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { wp } from '../../../Helpers/Responsiveness';
import Fonticon from '../../../Constants/FontIcon';

export default function ProfileButtons(props) {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}
                style={{ flexDirection: "row", marginHorizontal: wp(6), marginTop: wp(5), alignItems: "center" }}>
                <Image source={props.icon} style={{ width: wp(12), height: wp(12), resizeMode: "contain" }}></Image>
                <Text style={{ fontWeight: "bold", marginLeft: wp(3), fontSize: 16 }}>{props.name}</Text>
                <View style={{ flex: 1, alignItems: "flex-end", }}>
                    <Fonticon type={"AntDesign"} name={"right"} size={wp(5)} color={Colors.Black} />
                </View>
            </TouchableOpacity>
        </View>
    )
}
