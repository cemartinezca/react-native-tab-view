import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

type Item = {
  dane: string;
  state: string;
  city: string;
  library_name: string;
  library_address: string;
  Library_state: string;
  library_phone: string;
  latitude: number;
  longitude: number;
};

type Props = {
  data: Array<Item>;
};

class LibraryItem extends React.PureComponent<{
  item: {
    dane: string;
    state: string;
    city: string;
    library_name: string;
    library_address: string;
    Library_state: string;
    library_phone: string;
    latitude: number;
    longitude: number;
  };
}> {
  render() {
    const { item } = this.props;

    return (
      <View style={styles.item}>
        <View style={styles.avatar}>
          <Text style={styles.letter}>
            {item.state.slice(0, 1).toUpperCase()}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{item.library_name}</Text>
          <Text style={styles.name}>{`${item.city} - ${item.state}`}</Text>
          <Text style={styles.number}>{item.library_phone}</Text>
        </View>
      </View>
    );
  }
}

export default class Libraries extends React.Component<Props, {}> {
  private renderItem = ({ item }: { item: Item }) => (
    <LibraryItem item={item} />
  );

  private ItemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={(_, i) => String(i)}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.ItemSeparator}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#e91e63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
  },
  details: {
    margin: 8,
  },
  name: {
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  number: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
});
