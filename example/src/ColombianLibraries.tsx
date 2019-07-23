import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  TabView,
  TabBar,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import Map from './Shared/Map';
import Libraries from './Shared/Libraries';

type Route = {
  key: string;
  icon: string;
};

type Item = {
  c_digo_dane: string;
  departamento: string;
  municipio: string;
  nombre_de_la_biblioteca: string;
  estado_de_la_biblioteca: string;
  direcci_n_de_la_biblioteca: string;
  tel_fonos_de_contacto: string;
  georeferencia: string;
};

type State = NavigationState<Route>;

export default class ColombianLibraries extends React.Component<
  {},
  State & {
    data: Array<{
      dane: string;
      state: string;
      city: string;
      library_name: string;
      Library_state: string;
      library_address: string;
      library_phone: string;
      latitude: number;
      longitude: number;
    }>;
  }
> {
  static title = 'Colombian Libraries';
  static backgroundColor = '#3c63ac';
  static appbarElevation = 0;

  state = {
    index: 0,
    routes: [
      {
        key: 'map',
        icon: 'md-map',
      },
      {
        key: 'list',
        icon: 'md-list',
      },
    ],
    data: [],
  };

  componentDidMount() {
    fetch('https://www.datos.gov.co/resource/in3j-awgi.json?')
      .then(response => response.json())
      .then(res =>
        this.setState({
          data: res.map((item: Item) => ({
            dane: item.c_digo_dane,
            state: item.departamento,
            city: item.municipio,
            library_name: item.nombre_de_la_biblioteca,
            Library_state: item.estado_de_la_biblioteca,
            library_address: item.direcci_n_de_la_biblioteca,
            library_phone: item.tel_fonos_de_contacto,
            latitude: Number(
              item.georeferencia
                .replace(/[()]/g, '')
                .split(',')[0]
                .replace('°', '')
            ),
            longitude: Number(
              item.georeferencia
                .replace(/[()]/g, '')
                .split(',')[1]
                .replace('°', '')
            ),
          })),
        })
      );
  }

  private handleIndexChange = (index: number) =>
    this.setState({
      index,
    });

  private renderIcon = ({ route, color }: { route: Route; color: string }) => (
    <Ionicons name={route.icon} size={24} color={color} />
  );

  private renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        renderIcon={this.renderIcon}
        style={styles.tabbar}
      />
    );
  };

  private renderScene = ({ route }: { route: Route }) => {
    const { data } = this.state;
    switch (route.key) {
      case 'map':
        return <Map markers={data} />;
      case 'list':
        return <Libraries data={data} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        lazy
        navigationState={this.state}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#6f91cb',
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
});
