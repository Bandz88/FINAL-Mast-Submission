import React, { useEffect, useState, createContext, useContext , useMemo} from 'react';
import { View, Text, Image, Button, TouchableOpacity, TextInput, ToastAndroid, ScrollView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { NavigationProp } from '@react-navigation/native';
import { FlatList } from 'react-native';  
import { useDishes } from './DishesContext'
import { DishesProvider } from './DishesContext';
import { ReactNode } from 'react';


const sampleDishes = [
  { name: 'Starlight Risotto', category: 'main', price: 100, description: 'A creamy risotto, infused with herbs and Parmesan cheese.' },
  { name: 'Crimson Ember Steak', category: 'main', price: 150, description: 'Juicy steak with a smoky flavor and red wine reduction.' },
  { name: 'Golden Bread Sticks', category: 'starter', price: 180, description: 'Warm, crispy breadsticks with garlic butter.' },
  { name: 'Twilight Tiramisu', category: 'dessert', price: 100, description: 'Classic dessert with coffee-soaked ladyfingers and mascarpone.' },
  { name: 'Emerald Soup', category: 'starter', price: 400, description: 'A creamy soup made from fresh green vegetables.' },
];
const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainCourses" component={MainCourseScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const AppWrapper = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide(); // Hide splash screen after 3 seconds
    }, 3000);
  }, []);

  return (
    <TotalProvider>
      <DishesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Choice"
              component={Choice}
              options={{ title: 'Choose Role' }}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ title: 'Christoffel' }}
            />
            <Stack.Screen
              name="Filter"
              component={FilterScreen}
              options={{ title: 'Filter Dishes' }}
            />
            <Stack.Screen
              name="CustomDish"
              component={CustomDishScreen}
              options={{ title: 'Add Custom Dish' }}
            />
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{ title: 'Payment' }}
            />
            <Stack.Screen
              name="AddToFilterScreen"
              component={AddToFilterScreen}
              options={{ title: 'Chef Screen' }}
            />
            <Stack.Screen
              name="StartersScreen"
              component={StartersScreen}
              options={{ title: 'Starters' }}
            />
            <Stack.Screen
              name="MainCourseScreen"
              component={MainCourseScreen}
              options={{ title: 'Main Courses' }}
            />
            <Stack.Screen
              name="DessertScreen"
              component={DessertScreen}
              options={{ title: 'Desserts' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DishesProvider>
    </TotalProvider>
  );
};
type Props = {
  navigation: NavigationProp<any>;
};

const Splash: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Choice'); // Use navigate instead of replace
    }, 3000);
  }, [navigation]);
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5EFEF' }}>
      <Image source={require('./assets/christofelopen.png')} />
    </View>
  );
};


const AddToFilterScreen: React.FC = () => {
  const { dishes, updateDishCount } = useDishes();  // Renamed from updateCount to updateDishCount
  console.log(dishes); // Debugging: Logs the fetched data

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#F5EFEF' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: 'black',
          textAlign: 'center',
          fontFamily: 'Georgia',
        }}
      >
        Manage Dishes
      </Text>

      {['dessert', 'main', 'starter'].map((category) => (
        <View key={category} style={{ marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
              color: 'black',
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}s
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {dishes
              .filter((dish) => dish.category === category)
              .map((dish) => (
                <View
                  key={dish.id}
                  style={{
                    borderWidth: 1,
                    borderColor: '#FF3131',
                    borderRadius: 10,
                    width: '45%',
                    margin: 5,
                    backgroundColor: '#FFF',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={{ uri: dish.image }}
                    style={{ width: '100%', height: 150 }}
                  />
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      backgroundColor: '#FF3131',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginBottom: 5,
                        color: '#FFF',
                      }}
                    >
                      {dish.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#FFF',
                        marginBottom: 10,
                      }}
                    >
                      Price: R{dish.price}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => updateDishCount(dish.id, -1)}  // Renamed to updateDishCount
                        style={{
                          backgroundColor: '#E74C3C',
                          padding: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>-</Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginHorizontal: 10,
                          color: '#FFF',
                          fontWeight: 'bold',
                        }}
                      >
                        {dish.count}
                      </Text>
                      <TouchableOpacity
                        onPress={() => updateDishCount(dish.id, 1)}  // Renamed to updateDishCount
                        style={{
                          backgroundColor: '#2ECC71',
                          padding: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};


const Choice: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5EFEF' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: 'black', // Changed to black
          fontFamily: 'Georgia', // Elegant font for Christoffel brand
        }}
      >
        Choose Your Role
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#FF3131', // Button color
          padding: 15,
          borderRadius: 10,
          marginVertical: 10,
          width: '80%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('AddToFilterScreen')}
      >
        <Text
          style={{
            color: '#FFF', // White text for readability
            fontSize: 18,
          }}
        >
          Chef
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#FF3131', // Button color
          padding: 15,
          borderRadius: 10,
          marginVertical: 10,
          width: '80%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Main')}
      >
        <Text
          style={{
            color: '#FFF', // White text for readability
            fontSize: 18,
          }}
        >
          User
        </Text>
      </TouchableOpacity>
    </View>
  );
};


const calculateCategoryAverages = (category: string) => {
  const dishes = sampleDishes.filter(dish => dish.category === category);
  const totalDishes = dishes.length;
  const totalPrice = dishes.reduce((sum, dish) => sum + dish.price, 0);
  const averagePrice = totalDishes > 0 ? totalPrice / totalDishes : 0;
  return { totalDishes, averagePrice: averagePrice.toFixed(2) };
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
  const { totalDishes: totalMainDishes, averagePrice: avgMainPrice } = calculateCategoryAverages('main');

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#F5EFEF', padding: 20 }}>
      <Text style={{ fontSize: 32, color: 'black', textAlign: 'center' }}>Christoffel</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={{ position: 'absolute', right: 10, top: 10 }}>
        <Text style={{ color: 'black', fontSize: 16 }}>Filter</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        {/* Mediterranean-Peruvian Cuisine */}
        <Image
          source={require('./assets/Mediterranean-Peruvian-Cuisine.png')}
          style={{ width: 348, height: 123, marginTop: 30, borderRadius: 15 }}
        />
        <Text style={{ fontSize: 28, color: 'black', marginTop: 10 }}>Mediterranean-Peruvian-Cuisine</Text>
        <Text style={{ color: 'black', fontSize: 16, marginTop: 10 }}>Price: R400</Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Order" color="#FF3131" onPress={() => navigation.navigate('Payment')} />
        </View>

        {/* Nordic-Asian Fusion */}
        <Image
          source={require('./assets/Nordic-Asian-Fusion.png')}
          style={{ width: 348, height: 123, borderRadius: 15 }}
        />
        <Text style={{ fontSize: 28, color: 'black', marginTop: 10 }}>Nordic-Asian-Fusion</Text>
        <Text style={{ color: 'black', fontSize: 16, marginTop: 10 }}>Price: R300</Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Order" color="#FF3131" onPress={() => navigation.navigate('Payment')} />
        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Button title="Custom Dish" color="#FF3131" onPress={() => navigation.navigate('CustomDish')} />
      </View>

      <Text style={{ color: 'black', marginTop: 20, textAlign: 'center' }}>Main Dishes: {totalMainDishes}</Text>
      <Text style={{ color: 'black', textAlign: 'center' }}>Average Price: R{avgMainPrice}</Text>
    </ScrollView>
  );
};


const FilterScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedDishes } = useDishes();

  // Calculate the total price using useMemo to optimize recalculation
  const total = useMemo(() => {
    return selectedDishes.reduce((sum, dish) => sum + dish.price * dish.count, 0);
  }, [selectedDishes]);

  return (
    <View style={{ flex: 1, backgroundColor: '#F5EFEF', padding: 20 }}>
      <Text
        style={{
          fontSize: 42,
          color: 'black',
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        🍽️ Christoffel 🍷
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 24,
          marginTop: 20,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        Choose your meal and enjoy! 😊
      </Text>

      {/* Starters */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#FF3131',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={() => navigation.navigate('StartersScreen')}
      >
        <Image
          source={require('./assets/starters.jpg')}
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FFF',
          }}
        />
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '500', flex: 1 }}>
          🥗 Starters - Fresh & Light
        </Text>
      </TouchableOpacity>

      {/* Main Course */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#FF3131',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={() => navigation.navigate('MainCourseScreen')}
      >
        <Image
          source={require('./assets/main.jpg')}
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FFF',
          }}
        />
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '500', flex: 1 }}>
          🍝 Main - Delicious & Hearty
        </Text>
      </TouchableOpacity>

      {/* Dessert */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#FF3131',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={() => navigation.navigate('DessertScreen')}
      >
        <Image
          source={require('./assets/dessert.jpg')}
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FFF',
          }}
        />
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '500', flex: 1 }}>
          🍰 Dessert - Sweet Treats
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomDishScreen: React.FC = () => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [dishSelectOpen, setDishSelectOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [cookingTime, setCookingTime] = useState('');
  const [chefNotes, setChefNotes] = useState('');

  const handleDishSelect = (value: string | null) => {
    const selected = sampleDishes.find((dish) => dish.name === value);
    setSelectedDish(value ?? '');
    setDescription(selected ? selected.description : '');
    setPrice(selected ? `Price: R${selected.price}` : '');
  };

  const handlePhotoUpload = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        ToastAndroid.show('Upload cancelled', ToastAndroid.SHORT);
      } else if (response.errorMessage) {
        ToastAndroid.show('Error uploading', ToastAndroid.SHORT);
      } else if (response.assets && response.assets.length > 0) {
        setUploadedImage(response.assets[0].uri ?? '');
        ToastAndroid.show('Photo uploaded', ToastAndroid.SHORT);
      }
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5EFEF', padding: 20 }}>
      <Text style={{ fontSize: 32, color: 'black', textAlign: 'center' }}>Christoffel</Text>
      <Text style={{ color: 'black', fontSize: 18, marginTop: 20, textAlign: 'center' }}>
        Create and Customize Your Dish
      </Text>

      {/* Category Dropdown */}
      <DropDownPicker
  open={open}
  setOpen={setOpen}
  items={[
    { label: '🥗 Starter', value: 'starter' },
    { label: '🍝 Main', value: 'main' },
    { label: '🍰 Dessert', value: 'dessert' },
  ]}
  placeholder="Select Category"
  containerStyle={{ height: 40, marginTop: 20 }}
  style={{ backgroundColor: '#FF3131' }} // Red background for dropdown
  dropDownContainerStyle={{ backgroundColor: '#FF3131' }} // Adjusted for dropdown options background
  value={category}
  setValue={setCategory}
/>


<DropDownPicker
  open={dishSelectOpen}
  setOpen={setDishSelectOpen}
  items={sampleDishes
    .filter((dish) => dish.category === category)
    .map((dish) => ({ label: dish.name, value: dish.name }))}
  placeholder="Select Available Dish"
  containerStyle={{ height: 40, marginTop: 20 }}
  style={{ backgroundColor: '#FF3131' }} // Red background for dropdown
  dropDownContainerStyle={{ backgroundColor: '#FF3131' }} // Adjusted for dropdown options background
  value={selectedDish}
  setValue={setSelectedDish} // Now directly setting the selected dish value
/>
      {selectedDish && (
        <View style={{ backgroundColor: '#333333', padding: 15, marginTop: 20, borderRadius: 10 }}>
          <Text style={{ color: '#FFD700', fontSize: 24, fontWeight: 'bold' }}>
            {selectedDish}
          </Text>
          <Text style={{ color: '#FFD700', marginTop: 5 }}>{price}</Text>
          <Text style={{ color: 'white', marginTop: 10 }}>{description}</Text>
        </View>
      )}

      {uploadedImage && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source={{ uri: uploadedImage }} style={{ width: 300, height: 200, borderRadius: 15 }} />
        </View>
      )}

      <TouchableOpacity
        onPress={handlePhotoUpload}
        style={{
          marginTop: 20,
          backgroundColor: '#FF3131', // Red background for upload button
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Upload Dish Photo</Text>
      </TouchableOpacity>

      <TextInput
        style={{
          marginTop: 20,
          backgroundColor: 'white',
          padding: 10,
          height: 50,
          textAlignVertical: 'top',
          borderRadius: 10,
          borderColor: '#FF3131',
          borderWidth: 1,
        }}
        placeholder="Cooking Time (e.g., 30 mins)"
        value={cookingTime}
        onChangeText={setCookingTime}
      />
      <TextInput
        style={{
          marginTop: 20,
          backgroundColor: 'white',
          padding: 10,
          height: 100,
          textAlignVertical: 'top',
          borderRadius: 10,
          borderColor: '#FF3131',
          borderWidth: 1,
        }}
        placeholder="Chef's Notes..."
        value={chefNotes}
        onChangeText={setChefNotes}
        multiline
      />
      <TextInput
        style={{
          marginTop: 20,
          backgroundColor: 'white',
          padding: 10,
          height: 100,
          textAlignVertical: 'top',
          borderRadius: 10,
          borderColor: '#FF3131',
          borderWidth: 1,
        }}
        placeholder="Add or edit dish description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />
    </ScrollView>
  );
};

const MainCourseScreen: React.FC = () => {
  const { dishes } = useDishes(); // Access shared dishes data

  // State to track the selected dishes and their quantities
  const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});

  // Function to calculate the total price
  const calculateTotal = () => {
    return Object.keys(selectedDishes).reduce((total, dishId) => {
      const dish = dishes.find((dish) => dish.id.toString() === dishId);
      if (dish) {
        return total + dish.price * selectedDishes[dishId];
      }
      return total;
    }, 0);
  };

  // Function to increase the quantity of a dish
  const increaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const newQuantity = (prevState[dishId] || 0) + 1;
      return {
        ...prevState,
        [dishId]: newQuantity,
      };
    });
  };

  // Function to decrease the quantity of a dish
  const decreaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const currentQuantity = prevState[dishId] || 0;
      if (currentQuantity > 0) {
        return {
          ...prevState,
          [dishId]: currentQuantity - 1,
        };
      }
      return prevState;
    });
  };

  // Function to remove a dish from the selected list
  const removeDish = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const newState = { ...prevState };
      delete newState[dishId];
      return newState;
    });
  };

  // Calculate total price based on selected dishes
  const totalPrice = calculateTotal();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#F5EFEF' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: 'black', // Black for header text
        }}
      >
        🍝 Main Courses
      </Text>
      <FlatList
        data={dishes.filter((dish) => dish.category === 'main' && dish.count > 0)} // Filter dishes by category and ensure count > 0
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 20,
              borderColor: '#FF3131', // Red border for consistency with the theme
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              backgroundColor: '#FFF',
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 150, borderRadius: 10 }}
            />
            <Text style={{ fontSize: 18, marginTop: 10, color: 'black' }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>
              Available: {item.count}
            </Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>
              Price: R{item.price}
            </Text>

            {/* Quantity controls */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => increaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#FF3131',
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Quantity: {selectedDishes[item.id.toString()] || 0}
              </Text>
              <TouchableOpacity
                onPress={() => decreaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#FF3131',
                  padding: 10,
                  borderRadius: 10,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>-</Text>
              </TouchableOpacity>
            </View>

            {/* Remove button */}
            <TouchableOpacity
              onPress={() => removeDish(item.id.toString())}
              style={{
                marginTop: 15,
                backgroundColor: '#FF3131',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total Price */}
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: '#FF3131',
          padding: 15,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          Total: R{totalPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#442A00',
  },
  header: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dishCard: {
    flexDirection: 'row',
    backgroundColor: '#6B3C00',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  dishPrice: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
};

const DessertScreen: React.FC = () => {
  const { dishes } = useDishes(); // Get dishes data

  // State to track the selected desserts and their quantities
  const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});

  // Function to calculate the total price
  const calculateTotal = () => {
    return Object.keys(selectedDishes).reduce((total, dishId) => {
      const dish = dishes.find((dish) => dish.id.toString() === dishId);
      if (dish) {
        return total + dish.price * selectedDishes[dishId];
      }
      return total;
    }, 0);
  };

  // Function to increase the quantity of a dish
  const increaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => ({
      ...prevState,
      [dishId]: (prevState[dishId] || 0) + 1,
    }));
  };

  // Function to decrease the quantity of a dish
  const decreaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const currentQuantity = prevState[dishId] || 0;
      if (currentQuantity > 0) {
        return {
          ...prevState,
          [dishId]: currentQuantity - 1,
        };
      }
      return prevState;
    });
  };

  // Function to remove a dish from the selected list
  const removeDish = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const newState = { ...prevState };
      delete newState[dishId];
      return newState;
    });
  };

  // Calculate the total price based on selected dishes
  const totalPrice = calculateTotal();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#F5EFEF' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: 'black',
        }}
      >
        🍰 Desserts
      </Text>
      <FlatList
        data={dishes.filter((dish) => dish.category === 'dessert' && dish.count > 0)} // Filter dishes by category and ensure count > 0
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 20,
              borderColor: '#FF3131',
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              backgroundColor: '#FFF',
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 150, borderRadius: 10 }}
            />
            <Text style={{ fontSize: 18, marginTop: 10, color: 'black' }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>
              Available: {item.count}
            </Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>
              Price: R{item.price}
            </Text>

            {/* Quantity controls */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => increaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#FF3131',
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Quantity: {selectedDishes[item.id.toString()] || 0}
              </Text>
              <TouchableOpacity
                onPress={() => decreaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#FF3131',
                  padding: 10,
                  borderRadius: 10,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>-</Text>
              </TouchableOpacity>
            </View>

            {/* Remove button */}
            <TouchableOpacity
              onPress={() => removeDish(item.id.toString())}
              style={{
                marginTop: 15,
                backgroundColor: '#FF3131',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total Price */}
      <View
        style={{
          backgroundColor: '#FF3131',
          padding: 15,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
          marginTop: 'auto', // Push it to the bottom of the screen
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          Total: R{totalPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};


const StartersScreen: React.FC = () => {
  const { dishes, updateDishCount } = useDishes();  // Use the context to get dishes and updateDishCount function

  // State to track the selected starters and their quantities
  const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});

  // Function to calculate the total price
  const calculateTotal = () => {
    return Object.keys(selectedDishes).reduce((total, dishId) => {
      const dish = dishes.find((dish) => dish.id.toString() === dishId);
      if (dish) {
        return total + dish.price * selectedDishes[dishId];
      }
      return total;
    }, 0);
  };

  // Function to increase the quantity of a dish
  const increaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const updatedState = { ...prevState, [dishId]: (prevState[dishId] || 0) + 1 };
      updateDishCount(Number(dishId), 1); // Update the count in the dishes context
      return updatedState;
    });
  };

  // Function to decrease the quantity of a dish
  const decreaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const currentQuantity = prevState[dishId] || 0;
      if (currentQuantity > 0) {
        const updatedState = { ...prevState, [dishId]: currentQuantity - 1 };
        updateDishCount(Number(dishId), -1); // Update the count in the dishes context
        return updatedState;
      }
      return prevState;
    });
  };

  // Function to remove a dish from the selected list
  const removeDish = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const newState = { ...prevState };
      delete newState[dishId];
      updateDishCount(Number(dishId), -prevState[dishId]); // Adjust the count in dishes context
      return newState;
    });
  };

  // Calculate the total price based on selected dishes
  const totalPrice = calculateTotal();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#F5EFEF' }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
          color: 'black',
        }}
      >
        🥗 Starters - Fresh & Light
      </Text>
      <FlatList
        data={dishes.filter((dish) => dish.category === 'starter' && dish.count > 0)} // Show only dishes with count > 0
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 20,
              padding: 10,
              backgroundColor: '#FFF',
              borderRadius: 10,
              borderColor: '#FF3131',
              borderWidth: 1,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 150, borderRadius: 10 }}
            />
            <Text style={{ fontSize: 18, marginTop: 10, color: 'black' }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>
              Available: {item.count}
            </Text>
            {/* Displaying the price */}
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>
              Price: R{item.price}
            </Text>

            {/* Quantity controls */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => increaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#FF3131',
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Quantity: {selectedDishes[item.id.toString()] || 0}
              </Text>
              <TouchableOpacity
                onPress={() => decreaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#FF3131',
                  padding: 10,
                  borderRadius: 10,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>-</Text>
              </TouchableOpacity>
            </View>

            {/* Remove button */}
            <TouchableOpacity
              onPress={() => removeDish(item.id.toString())}
              style={{
                marginTop: 15,
                backgroundColor: '#FF3131',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total Price */}
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: '#FF3131',
          padding: 15,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          Total: R{totalPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const initialDishes = [
  { id: 1, name: 'Chocolate Cake', category: 'dessert', image: 'https://images.unsplash.com/photo-1618329894287-013abef41671?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Y2hvY29sYXRlfGVufDB8fHx8fDE2NjA0MjA1MDg&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 750 },
  { id: 2, name: 'Apple Pie', category: 'dessert', image: 'https://images.pexels.com/photos/869015/pexels-photo-869015.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', count: 0, price: 800 },
  { id: 3, name: 'Cheesecake', category: 'dessert', image: 'https://images.unsplash.com/photo-1543367011-1e3d6efba7ad?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OXx8Y2hlZXNlY2FrfGVufDB8fHx8fDE2NjA0MjA3Mjk&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 950 },
  { id: 4, name: 'Ice Cream Sundae', category: 'dessert', image: 'https://images.unsplash.com/photo-1594380055321-bb78f713e717?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8aWNlJTIwY3JlYW18ZW58MHx8fHwxNjYwNDE3Njg1&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 500 },
  { id: 5, name: 'Brownie', category: 'dessert', image: 'https://images.unsplash.com/photo-1552712123-60c6a6ca6a24?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8YnJvd25pZXxlbnwwfHx8fDE2NjA0MjA5MzQ&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 700 },
  { id: 6, name: 'Grilled Chicken', category: 'main', image: 'https://images.unsplash.com/photo-1598364879864-d8d33c177b13?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OXx8Y3JpaWxsZWR8ZW58MHx8fHwxNjYwNDIyNzk5&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 1500 },
  { id: 7, name: 'Steak', category: 'main', image: 'https://images.unsplash.com/photo-1531484350883-2a1d2d8fc65e?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8c3RlYWt8ZW58MHx8fHwxNjYwNDI1Mjk3&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 2000 },
  { id: 8, name: 'Pasta Carbonara', category: 'main', image: 'https://images.unsplash.com/photo-1587443999570-81f7f819f3db?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8cGFzdGF8ZW58MHx8fHwxNjYwNDI4ODAy&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 1200 },
  { id: 9, name: 'Salmon', category: 'main', image: 'https://images.unsplash.com/photo-1625202151474-3c3f01d31461?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8c2FsbW9uJTIwdmlhJTIwY2F0ZWdvcnklfGVufDB8fHx8fDE2NjA0MjY3Njc&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 1800 },
  { id: 10, name: 'Vegetarian Burger', category: 'main', image: 'https://images.unsplash.com/photo-1552820961-bfd5956a5f91?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8dmVnZXRhcmlhbiBjdXJicm8lMjBsaWZlJTIwdnJ8ZW58MHx8fHwxNjYwNDI1Mzg0&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 500 },
  { id: 11, name: 'Caesar Salad', category: 'starter', image: 'https://images.unsplash.com/photo-1584627422735-e3b4693198e3?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Y2Vhc2FyJTIwc2FsYWR8ZW58MHx8fHwxNjYwNDI2MzQw&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 650 },
  { id: 12, name: 'Tomato Soup', category: 'starter', image: 'https://images.unsplash.com/photo-1583380168485-df6be0326029?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Y29tcGxldGUlMjBzb3VwJTIwdXNoJTIwdGFyZ2V0fGVufDB8fHx8fDE2NjA0Mjc0Mzg&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 700 },
  { id: 13, name: 'Garlic Bread', category: 'starter', image: 'https://images.unsplash.com/photo-1617234517014-865b11c9f85d?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Z2FybGljfGVufDB8fHx8fDE2NjA0MjM1MDI&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 500 },
  { id: 14, name: 'Bruschetta', category: 'starter', image: 'https://images.unsplash.com/photo-1614232999891-913dbb93c897?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8YnJ1c2NoZXR0YXxlbnwwfHx8fDE2NjA0MjU1MzM&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 550 },
  { id: 15, name: 'Spring Rolls', category: 'starter', image: 'https://images.unsplash.com/photo-1617759914630-707b8a32116f?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8c3ByaW5nJTIwcm9sbHN8ZW58MHx8fHwxNjYwNDE3MDcz&ixlib=rb-1.2.1&q=80&w=1080', count: 0, price: 600 }
];

const PaymentScreen: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#F5EFEF', padding: 20 }}>
      <Text style={{ fontSize: 32, color: 'black', textAlign: 'center', marginBottom: 20 }}>
        Payment
      </Text>

      <TextInput
        placeholder="Card Number"
        placeholderTextColor="black"
        onChangeText={setCardNumber}
        keyboardType="numeric"
        style={{
          borderBottomColor: '#FF3131', // Red border for input fields
          borderBottomWidth: 1,
          marginTop: 20,
          color: 'black',
        }}
      />

      <TextInput
        placeholder="Expiry Date (MM/YY)"
        placeholderTextColor="black"
        onChangeText={setExpiryDate}
        style={{
          borderBottomColor: '#FF3131', // Red border for input fields
          borderBottomWidth: 1,
          marginTop: 20,
          color: 'black',
        }}
      />

      <TextInput
        placeholder="CVV"
        placeholderTextColor="black"
        onChangeText={setCvv}
        keyboardType="numeric"
        style={{
          borderBottomColor: '#FF3131', // Red border for input fields
          borderBottomWidth: 1,
          marginTop: 20,
          color: 'black',
        }}
      />

      <TouchableOpacity
        onPress={() => ToastAndroid.show('Payment Processed!', ToastAndroid.SHORT)}
        style={{
          marginTop: 20,
          backgroundColor: '#FF3131', // Red background for submit button
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Submit Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const TotalContext = createContext<any>(null);

interface TotalProviderProps {
  children: ReactNode;
}

export const TotalProvider = ({ children }: TotalProviderProps) => {
  const [total, setTotal] = useState(0);

  return (
    <TotalContext.Provider value={{ total, setTotal }}>
      {children}
    </TotalContext.Provider>
  );
};


export default AppWrapper;