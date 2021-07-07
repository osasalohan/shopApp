import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/colors";
import { fetchOrders } from "../../store/actions/order";

const OrdersScreen = (props) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(fetchOrders());
    } catch (err) {
      setError(true);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <>
      {isLoading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
      {error && (
        <View style={styles.centered}>
          <Text>Something went wrong!</Text>
          <Button
            title="Try again"
            onPress={loadOrders}
            color={Colors.primary}
          />
        </View>
      )}
      {!error && !isLoading && orders.length === 0 && (
        <View style={styles.centered}>
          <Text>No orders found. Maybe start adding some!</Text>
        </View>
      )}
      {!isLoading && !error && orders.length > 0 && (
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <OrderItem
              amount={item.totalAmount}
              date={item.readableDate}
              items={item.items}
            />
          )}
        />
      )}
    </>
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default OrdersScreen;
