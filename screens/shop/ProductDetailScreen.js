import React from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/colors";
import { addToCart } from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("pId");
  const product = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(addToCart(product));
          }}
        />
      </View>
      <Text style={styles.price}>${parseFloat(product.price).toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
});

ProductDetailScreen.navigationOptions = (navData) => ({
  headerTitle: navData.navigation.getParam("pTitle"),
});

export default ProductDetailScreen;
