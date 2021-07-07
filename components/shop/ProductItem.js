import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

const ProductItem = (props) => (
  <View style={styles.product}>
    <TouchableNativeFeedback onPress={props.onSelect} useForeground>
      <View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>
            ${parseFloat(props.price).toFixed(2)}
          </Text>
        </View>
        <View style={styles.actions}>{props.children}</View>
      </View>
    </TouchableNativeFeedback>
  </View>
);

const styles = StyleSheet.create({
  product: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
