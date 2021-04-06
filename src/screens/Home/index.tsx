import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { NewsCategory } from '../../helper/NewsCategory';
import { colors, constant } from '../../utility';
import { INavProps } from '../../utility/interfaces';

const HomeScreen = (props: INavProps) => {
    const navigation = useNavigation();

    const renderCategory = ({ item }: any) => (
        <ItemCategory
            key={item.type}
            type={item.type}
            description={item.description}
            onPress={() => {
                // pass props all data of news category
                navigation.navigate("NewsDetail", { item });
            }}
        />
    );

    const ItemCategory = ({ type, onPress }: any) => (
        <TouchableOpacity onPress={onPress}
            style={styles.card}
        >
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: "bold",
                }}
            >
                {type}
            </Text>
        </TouchableOpacity>
    );


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>
                News Categories
            </Text>

            {/* render news categories list */}
            <FlatList
                data={NewsCategory}
                renderItem={renderCategory}
                keyExtractor={(item) => item.type}
                showsVerticalScrollIndicator={false}
                numColumns={2}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        marginBottom: 20
    },
    card: {
        backgroundColor: colors.white,
        margin: 5,
        paddingHorizontal: 10,
        width: constant.WIDTH / 2.6,
        height: constant.HEIGHT / 12,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.55,
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 2,
    },
});

export default HomeScreen;
