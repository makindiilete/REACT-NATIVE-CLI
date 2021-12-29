import React, {useEffect} from 'react';
import Zocial from 'react-native-vector-icons/Zocial';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

const getIconFont = (type) => {
  switch (type) {
    case 'Fontisto':
      return Fontisto;
    case 'MaterialIcons':
      return MaterialIcons;
    case 'EvilIcons':
      return EvilIcons;
    case 'Feather':
      return Feather;
    case 'AntDesign':
      return AntDesign;
    case 'Zocial':
      return Zocial;
    case 'SimpleLineIcons':
      return SimpleLineIcons;
    case 'Foundation':
      return Foundation;
    case 'FontAwesome5':
      return FontAwesome5;
    case 'FontAwesome':
      return FontAwesome;
    case 'Ionicons':
      return Ionicons;
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;
    case 'Entypo':
      return Entypo;
    case 'Octicons':
      return Octicons;
    default:
      return FontAwesome5;
  }
};

const AppIcon = ({type, ...rest}) => {
  const FontIcon = getIconFont(type);

  return <FontIcon {...rest} />;
};

export default AppIcon;
