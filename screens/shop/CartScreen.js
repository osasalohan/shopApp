import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/colors";
import CartItem from "../../components/shop/CartItem";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";

const CartScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        id: key,
        title: products.find((product) => product.id === key).title,
        price: products.find((product) => product.id === key).price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].cost,
      });
    }
    return transformedCartItems.sort((a, b) => a.id > b.id);
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.abs(cartTotalAmount).toFixed(2)}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(addOrder(cartItems, cartTotalAmount));
          }}
        />
      </View>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem
            quantity={item.quantity}
            title={item.title}
            amount={item.sum}
            deletable
            onRemove={() => {
              dispatch(removeFromCart(item));
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
