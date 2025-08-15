import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';

// Função para buscar usuários da API
const fetchUsers = async () => {
  console.log('Buscando usuários...');
  try {
    // Simulando carregamento lento para visualizar o estado de loading
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos de delay
    
    // Simulando erro para testar (descomente a linha abaixo para testar)
    // throw new Error('API temporariamente indisponível');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }
    const data = await response.json();
    console.log('Usuários recebidos:', data.length);
    return data;
  } catch (error) {
    console.error('Erro na busca:', error);
    throw error;
  }
};

const UserList = () => {
  console.log('Renderizando UserList...');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [simulatedError, setSimulatedError] = useState(null);
  
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  console.log('Estado da query:', { isLoading, error, usersCount: users?.length });

  const handleRefresh = async () => {
    setSimulatedError(null); // Limpa erro simulado
    await refetch();
    setShowSuccessMessage(true);
    // Esconder a mensagem após 3 segundos
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const simulateError = () => {
    setSimulatedError('Erro simulado para teste da interface');
  };

  // Se há erro simulado, mostra a tela de erro
  if (simulatedError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Erro ao carregar usuários</Text>
        <Text style={styles.errorSubText}>{simulatedError}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => setSimulatedError(null)}>
          <Text style={styles.retryButtonText}>Voltar ao normal</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Se há erro real da API, mostra a tela de erro
  if (error) {
    console.log('Mostrando erro:', error.message);
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Erro ao carregar usuários</Text>
        <Text style={styles.errorSubText}>{error.message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading) {
    console.log('Mostrando loading...');
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando usuários...</Text>
      </View>
    );
  }

  if (!users || users.length === 0) {
    console.log('Nenhum usuário encontrado');
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Nenhum usuário encontrado</Text>
      </View>
    );
  }

  const renderUser = ({ item }) => (
    <View style={styles.userCard} key={item.id}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      <Text style={styles.userCity}>{item.address.city}</Text>
    </View>
  );

  // Versão otimizada para web
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Lista de Usuários ({users.length})</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.testErrorButton} onPress={simulateError}>
              <Text style={styles.testErrorButtonText}>Testar Erro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
              <Text style={styles.refreshButtonText}>Recarregar</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Mensagem de sucesso */}
        {showSuccessMessage && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>Usuários carregados com sucesso!</Text>
          </View>
        )}
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.listContainer}>
          {users.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userCity}>{user.address.city}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Versão para mobile
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Lista de Usuários ({users.length})</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.testErrorButton} onPress={simulateError}>
            <Text style={styles.testErrorButtonText}>Testar Erro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Text style={styles.refreshButtonText}>Recarregar</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Mensagem de sucesso */}
      {showSuccessMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Usuários carregados com sucesso!</Text>
        </View>
      )}
      
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    minHeight: '100vh', // Garante altura mínima na web
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh', // Garante altura mínima na web
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  userEmail: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 6,
  },
  userAddress: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 2,
  },
  userCity: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    backgroundColor: '#4CAF50', // Verde sucesso
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  successText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15, // Aumentando o espaço entre os botões
    justifyContent: 'center',
    alignItems: 'center',
  },
  testErrorButton: {
    backgroundColor: '#ff3b30', // Vermelho para erro
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  testErrorButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default UserList;
