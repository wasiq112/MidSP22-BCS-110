import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

// Import the Surah data
import { surahNames } from './QuranData';

const QuranScreen = () => {
  const [nameQuery, setNameQuery] = useState('');
  const [idQuery, setIdQuery] = useState('');
  const [searchById, setSearchById] = useState(false); // State to toggle search by ID or name
  const [isDarkMode, setIsDarkMode] = useState(false); // State to toggle dark mode

  // Filter the Surah names based on the search queries
  const filteredSurahNames = surahNames.filter(surah => {
    if (searchById) {
      return surah.id.toString().includes(idQuery);
    } else {
      return surah.english.toLowerCase().includes(nameQuery.toLowerCase());
    }
  });

  // Function to toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      <View style={styles.searchContainer}>
        <TextInput
          value={searchById ? idQuery : nameQuery}
          onChangeText={searchById ? setIdQuery : setNameQuery}
          style={[styles.input, { borderRadius: 20, backgroundColor: isDarkMode ? '#333333' : '#F0F0F0', color: isDarkMode ? '#FFFFFF' : '#000000' }]}
          placeholder={searchById ? "Search by ID" : "Search by name"}
          placeholderTextColor={isDarkMode ? '#FFFFFF80' : '#00000080'}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setSearchById(!searchById)}>
          <Text style={styles.toggleButtonText}>{searchById ? "Search by Name" : "Search by ID"}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredSurahNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.item, { backgroundColor: '#8A2BE2' }]}>
            <Text style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{item.english}</Text>
            <Text style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>{item.arabic}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={[styles.floatingActionButton, isDarkMode ? styles.darkModeFloatingButton : null]}
        onPress={toggleDarkMode}>
        <Text style={styles.floatingActionButtonText}>{isDarkMode ? "Light Mode" : "Dark Mode"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40, // Add some padding from the top
    backgroundColor: '#FFFFFF', // Set default background color to white
  },
  darkModeContainer: {
    backgroundColor: '#333333',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 5,

    borderColor: 'gray',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10, // Add border radius to the item
    marginBottom: 10, // Add some margin bottom for spacing
  },
  toggleButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  toggleButtonText: {
    color: '#FFFFFF',
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3498db',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  darkModeFloatingButton: {
    backgroundColor: '#FFFFFF',
  },
  floatingActionButtonText: {
    color: '#FFFFFF',
  },
});

export default QuranScreen;
