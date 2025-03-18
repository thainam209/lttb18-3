import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert,Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

const Tab = createBottomTabNavigator();

const Box =({backgroundColor,text,color}) =>{
  return (
    <View style={[styles.box,{backgroundColor}]}>
      <Text style={[{color}]}>
        {text}
      </Text>
    </View>
  );
};

const forgotPass_Screen = ({navigation}) => {
  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>
        Quên mật khẩu
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn_Screen')} 
      style={{marginTop:20,width:200,height:80,backgroundColor:'#ffa500',borderRadius:8,justifyContent:'center',alignItems:'center'}}> 
        <Text style={{color:'white',fontSize:20,fontWeight:600}}>
          Quay lại
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const SignIn_Screen = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const { login } = useAuth();

  const handleLogin = (user,pass) => {
    if(user!='' && pass!=''){
      const userData = { username }; // Dữ liệu người dùng đăng nhập
      login(userData);
      navigation.navigate('Account');
    }
    else{
      Alert.alert("Nhập đầy đủ thông tin");
    }
  };
  const forgotPass = () => {
    navigation.navigate('forgotPass_Screen');
  };

  return(
    <View style={styles.SignInContainer}>
      <Text style={styles.titleSignIn}>Sign In</Text>
      <View style={styles.inputSignIn}>
        <Text style={styles.titleInput}>Email ID</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder='Enter your email here!'></TextInput>
        <Text style={styles.titleInput}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setpassword} placeholder='Enter your password here!' secureTextEntry={true}></TextInput>
      </View>
      <TouchableOpacity onPress={() => forgotPass()}>
        <Text style={{color:'#ffa500',fontWeight:600,fontSize:15,marginLeft:270}}>For got password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnSignIn} onPress={() => handleLogin(username,password)}>
        <Text style={{color:'white',fontSize:20,fontWeight:600,textAlign:'center',paddingTop:15}}>Sign In</Text>
      </TouchableOpacity>
      <Text style={{textAlign:'center',marginTop:20,fontWeight:600,fontSize:20}}>Or sign in with</Text>
      <View style={styles.btnContainer}>
        <Box backgroundColor='white' text="Google"></Box>
        <Box backgroundColor='#4a6ea8' text="Facebook" color="white"></Box>
      </View>
      <Text style={{textAlign:'center',fontWeight:600,marginTop:20,fontSize:18}}>Not yet a member? <Text style={{color:'#ffa500'}}>Sign In</Text></Text>
    </View>
  );
};

const Account_Screen = ({navigation}) => {
  const { user } = useAuth();

  const handleLogout = () => {
    navigation.navigate('SignIn_Screen');
  };

  return (
    <View style={styles.accountContainer}>
      <View>
        <Image source={require('./assets/avt.jpg')} style={{width:150,height:150,borderRadius:"100%",position:'absolute',top:150,left:145,zIndex:1}}/>
      </View>
      <View style={styles.head}></View>
      <Text style={styles.useraccout}>{user.username}</Text>
      <Text style={{color:'#00bffe',fontWeight:600,fontSize:18,paddingTop:20,textAlign:'center'}}>Moblie devolop</Text>
      <Text style={{textAlign:'center',paddingTop:20,fontSize:18,color:'gray'}}>I have above 5 year of experience in native.{'\n'}
              mobile apps development, now i am learning.{'\n'}
              React Native</Text>
      <View style={{paddingLeft:130,paddingTop:50}}>
        <TouchableOpacity style={{backgroundColor:'#fda600',width:160,height:50,borderRadius:8}} onPress={() => handleLogout()}>
          <Text style={{color:'white',textAlign:'center',paddingTop:15,fontSize:15,fontWeight:600}}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios/50/000000/search--v1.png' }} // Biểu tượng tìm kiếm từ internet
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for meals or area"
          placeholderTextColor="#888"
        />
      </View>

      {/* Top Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Categories</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.categoryItem}>
            <Image
              source={require('./assets/pizza.jpg')} // Hình ảnh Pizza từ assets
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Pizza</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}>
            <Image
              source={require('./assets/burger.jpg')} // Hình ảnh Burgers từ assets
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Burgers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}>
            <Image
              source={require('./assets/steak.jpg')} // Hình ảnh Steak từ assets
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Steak</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Popular Items - First Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemsContainer}>
          <TouchableOpacity style={styles.itemCard}>
            <Image
              source={require('./assets/burger.jpg')} // Hình ảnh Food 1 từ assets
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>Food 1</Text>
            <Text style={styles.itemPrice}>$1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemCard}>
            <Image
              source={require('./assets/pizza.jpg')} // Hình ảnh Food 2 từ assets
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>Food 2</Text>
            <Text style={styles.itemPrice}>By Viet Nam</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemCard}>
            <Image
              source={require('./assets/steak.jpg')} // Hình ảnh Food 3 từ assets
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>Food 3</Text>
            <Text style={styles.itemPrice}>$3</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Popular Items - Second Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemsContainer}>
          <TouchableOpacity style={styles.itemCard}>
            <Image
              source={require('./assets/steak.jpg')} // Hình ảnh Food 4 từ assets
              style={styles.itemImage}
            />
            <Text style={styles.offerText}>10% OFF</Text>
            <Text style={styles.itemName}>Food 4</Text>
            <Text style={styles.itemPrice}>$5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemCard}>
            <Image
              source={require('./assets/pizza.jpg')} // Hình ảnh Food 5 từ assets
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>Food 5</Text>
            <Text style={styles.itemPrice}>$4</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="SignIn_Screen"
            screenOptions={{
                tabBarStyle: {
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: '#fcfcfc',
                height: 70,
                shadowColor: '#7F5DF0',
                shadowOffset: {
                width: 0,
                height: 10,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
                elevation: 5,
                },
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ 
                tabBarIcon: ({}) => (
                  <Image source={require('./assets/icon_explorer.png')} style={{ width: 50, height: 40,marginTop:3 }} />
              ),
              }}
            />
            <Tab.Screen 
                name="SignIn_Screen" 
                component={SignIn_Screen} 
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                    tabBarIcon: () => null
                }}
            />
            <Tab.Screen 
                name="forgotPass_Screen" 
                component={forgotPass_Screen} 
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                    tabBarIcon: () => null
                }}
            />
            <Tab.Screen
              name="Account"
              component={Account_Screen}
              options={{ 
                tabBarIcon: () => (
                  <Image source={require('./assets/icon_account.png')} style={{ width: 50, height: 40,marginTop:3 }} />
              ),
              }}
            />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  SignInContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  titleSignIn: {
    fontSize:30,
    fontWeight:600,
    marginTop:100,
    textAlign:'center'
  },
  inputSignIn: {
    marginLeft:40,
    marginTop:50
  },
  titleInput: {
    fontSize:20
  },
  input: {
    borderWidth:1,
    width:360,
    height:50,
    borderRadius:8,
    marginTop:20,
    borderColor:'gray',
    marginBottom:20,
    paddingLeft:15
  },
  btnSignIn: {
    backgroundColor:'#ffa500',
    height:60,
    width:360,
    borderRadius:8,
    marginTop:25,
    marginLeft:40
  },
  box: {
    width:180,
    height:80,
    backgroundColor:"white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius:8,
    marginTop:20
  },
  btnContainer: {
    flexDirection: 'row', // Sắp xếp theo hàng ngang
    justifyContent: 'space-around',
  },
  accountContainer: {
    flex: 1,
    position:'relative',
    backgroundColor: '#f2f2f2'
  },
  head: {
    backgroundColor:'#00bffe',
    width:'100%',
    height:200,
    zIndex:0
  },
  useraccout: {
    fontSize:50,
    color:'gray',
    textAlign:'center',
    paddingTop:100
  },
  ExContainer: {
    flex:1,
  },
  imgex: {
    width:426,
    height:600,
    marginTop:40
  },
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2, // Shadow cho Android
    shadowColor: '#000', // Shadow cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#FFA500', // Màu vàng cho nút Filter
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  filterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '30%',
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  viewAllButton: {
    backgroundColor: '#FFA500', // Màu vàng cho nút View all
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  viewAllText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  itemCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2, // Shadow cho Android
    shadowColor: '#000', // Shadow cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 5,
  },
  offerText: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'red',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
});
