import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";
import { fetchProducts } from "../../store/actions/product";
import Colors from "../../constants/colors";

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      pId: id,
      pTitle: title,
    });
  };

  const renderItem = ({ item }) => (
    <ProductItem
      image={item.imageUrl}
      title={item.title}
      price={item.price}
      onSelect={() => {
        selectItemHandler(item.id, item.title);
      }}
    >
      <Button
        color={Colors.primary}
        title="View Details"
        onPress={() => {
          selectItemHandler(item.id, item.title);
        }}
      />
      <Button
        color={Colors.primary}
        title="To Cart"
        onPress={() => {
          dispatch(addToCart(item));
        }}
      />
    </ProductItem>
  );

  const loadProducts = useCallback(
    async (refresh) => {
      setError(null);
      refresh ? setIsRefreshing(true) : setIsLoading(true);
      try {
        await dispatch(fetchProducts());
      } catch (err) {
        setError(true);
      }
      refresh ? setIsRefreshing(false) : setIsLoading(false);
    },
    [dispatch, setIsLoading, setError]
  );

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", () =>
      loadProducts(false)
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    loadProducts(false);
  }, [loadProducts]);

  return (
    <>
      {error && (
        <View style={styles.centered}>
          <Text>Something went wrong!</Text>
          <Button
            title="Try again"
            onPress={() => loadProducts(false)}
            color={Colors.primary}
          />
        </View>
      )}
      {isLoading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
      {!isLoading && !error && products.length === 0 && (
        <View style={styles.centered}>
          <Text>No products found. Maybe start adding some!</Text>
        </View>
      )}
      {!isLoading && !error && products.length > 0 && (
        <FlatList
          refreshing={isRefreshing}
          onRefresh={() => loadProducts(true)}
          data={products}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => ({
  headerTitle: "All Products",
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
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Cart"
        iconName="md-cart"
        onPress={() => {
          navData.navigation.navigate("Cart");
        }}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProductsOverviewScreen;
