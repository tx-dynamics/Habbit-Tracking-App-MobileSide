import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';
import Button from '../../Components/Button';
import ModalDropdown from 'react-native-modal-dropdown';
import Loader from '../../Components/Loader';
import Axios from '../../Components/Axios';
import { connect } from 'react-redux';
import { SetSession, SetCompanies } from '../../Redux/Actions/Actions';


const LastStep = (props) => {
    const [DropDownItem, setDropDownItem] = useState('')
    const [allPod, setAllPod] = useState([])

    useEffect(() => {
        const pods = props.CompanyData.departments.map(key => key.pod);
        setAllPod(pods)
    }, [])
    const selectedPOD = async() => {
        if (DropDownItem === '') {
            alert("Please Select POD")
        } else {
            // department
            const pods = props.CompanyData.departments.filter(key => key.pod === DropDownItem);
            let param = {};
            param["department"] = pods[0]._id;
            await Axios("user/addDepartment/" + props.userId, param, 'PUT').then(async (response) => {
                response["department"] = pods[0]._id
                if (response.error === undefined) {
                    let data = {}
                    data["userId"] = response._id;
                    data["userData"] = response;
                    data["isLogin"] = true;
                    props.SessionMaintain(data)
                } 
                else {
                   alert(JSON.stringify(response.error))
                }
            })
                .catch((err) => {
                    console.warn(err)
                })
        }

    }
    return (
        <View style={styles.container}>
            <View style={{ flex: .6, marginHorizontal: wp(5) }}>
                <Image source={iconPath.BLACKLOGO} style={styles.LogoStyle} />
                <View style={styles.titleView}>
                    <Text style={styles.WelcomeStyle}>One last step</Text>
                    <Text>Select your POD to continue</Text>
                </View>
            </View>
            <View style={{ flex: 1, marginHorizontal: wp(5) }}>
                <ModalDropdown options={allPod}
                    style={styles.dropDown}
                    dropdownStyle={styles.dropDown_dropDownStyle}
                    dropdownTextStyle={styles.dropDown_textStyle}
                    textStyle={{ color: Colors.Black, marginLeft: 10, fontSize: 16, width: wp(80) }}
                    onSelect={(idx, DropDownItem) => setDropDownItem(DropDownItem)}
                    renderRightComponent={() => (<Image source={iconPath.DROPDOWN} style={styles.dropDownIcon} />)}
                />
                <Button title={"Done"} style={{ marginTop: wp(9) }}
                    // onPress={() => props.navigation.navigate("StartScreen")} 
                    onPress={() => selectedPOD()}
                />
            </View>
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        CompanyData: state.AuthReducer.CompanyData,
        userId: state.AuthReducer.userId,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SessionMaintain: (data) => dispatch(SetSession(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LastStep);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    LogoStyle: {
        width: wp(35),
        height: wp(35),
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: wp(15)
    },
    titleView: {
        justifyContent: "flex-end",
        flex: 1,
        marginBottom: wp(5)
    },
    WelcomeStyle: {
        fontSize: 25,
        fontWeight: "bold",
        color: Colors.Yellow
    },
    dropDown_dropDownStyle: {
        width: wp(90),
        borderWidth: 1,
        borderColor: Colors.Yellow,
    },
    dropDown_textStyle: {
        fontSize: 16,
        color: Colors.Black
    },
    dropDown: {
        height: 45,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.Yellow,
        borderRadius: 10,
        marginTop: 10
    },
    dropDownIcon: {
        width: wp(4),
        height: wp(4),
        alignSelf: "flex-end",
        resizeMode: "contain",
        marginRight: 10
    }
})