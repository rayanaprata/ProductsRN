import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import Axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const route = useRoute();

  useEffect(() => {
    Axios.get('http://localhost:3000/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(erro => alert('Erro ao requisitar produtos: ' + erro));
  }, [route.params?.res]);

  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: '#F8F8FF',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '300',
            fontFamily: 'helvetica',
            marginTop: 20,
            marginBottom: 20,
          }}>
          Cadastro de Estoque
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cadastro')}
          style={{
            backgroundColor: '#6495ED',
            marginTop: 20,
            marginBottom: 20,
            height: 40,
            width: 80,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: 'white',
              marginTop: 10,
              marginLeft: 5,
            }}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{padding: 20}}
        keyExtractor={(item, index) => item.id.toString()}
        data={products}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Editar', {product: item})}
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              marginBottom: 5,
            }}>
            <Image
              source={{uri: item.img ? item.img : null}}
              style={{width: 100, height: 140, margin: 10}}
            />

            <View style={{paddingHorizontal: 10, marginTop: 10}}>
              <Text>Produto: {item.titulo}</Text>
              <Text>Modelo: {item.modelo}</Text>
              <Text>Categoria: {item.categoria}</Text>
              <Text>Quantidade: {item.quantidade}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
