import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/colors";
import { deleteProduct } from "../../store/actions/product";

const UserProductsScreen = (props) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const userProducts = useSelector((state) => state.products.userProducts);

  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are You Sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          setError(null);
          setIsLoading(true);
          try {
            await dispatch(deleteProduct(id));
          } catch (err) {
            setError(err.message);
          }
          setIsLoading(false);
        },
      },
    ]);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <>
      {isLoading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
      {!isLoading && (
        <FlatList
          data={userProducts}
          renderItem={({ item }) => (
            <ProductItem
              image={item.imageUrl}
              title={item.title}
              price={item.price}
              onSelect={() => {
                editProductHandler(item.id);
              }}
            >
              <Button
                color={Colors.primary}
                title="Edit"
                onPress={() => {
                  editProductHandler(item.id);
                }}
              />
              <Button
                color={Colors.primary}
                title="Delete"
                onPress={() => {
                  deleteHandler(item.id);
                }}
              />
            </ProductItem>
          )}
        />
      )}
    </>
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
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
          title="Add"
          iconName="md-create"
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProductsScreen;
