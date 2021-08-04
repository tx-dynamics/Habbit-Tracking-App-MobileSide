import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import Button from '../../Components/Button';
import ModalDropdown from 'react-native-modal-dropdown';

let breedData = ["item 1", "item 2", "item 3", "item 4", "item 5"]

const StartScreen = (props) => {
    const [DropDownItem, setDropDownItem] = useState('')
    return (
        <View style={styles.container}>
            <Image source={iconPath.FLAT} style={styles.LogoStyle} />
            <Text style={styles.WelcomeStyle}>The MLA challenge will start on</Text>
            <Text style={{
                alignSelf: "center", textAlign: "center", width: wp(60),
            }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>

            <Button title={"Go!"} style={{ marginTop: wp(9) }}
                onPress={() => props.navigation.navigate("BottomTab")} />
        </View>
    )
}
export default StartScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    LogoStyle: {
        width: wp(85),
        height: wp(65),
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: wp(15)
    },
    WelcomeStyle: {
        fontSize: 30,
        fontWeight: "bold",
        color: Colors.Yellow,
        alignSelf: "center",
        textAlign: "center",
        width: wp(75),
        marginTop: wp(40)
    },
})