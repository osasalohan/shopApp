import React from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";
import Colors from "../../constants/colors";

const ProductsOverviewScreen = (props) => {
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

  return <FlatList data={products} renderItem={renderItem} />;
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

export default ProductsOverviewScreen;
