import { Platform, SafeAreaView, UIManager } from 'react-native';
import EntryPage from './src/pages/EntryPage';

export default function App() {
  if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true);

  return <SafeAreaView className='flex-1'>
    <EntryPage/>
  </SafeAreaView>;
}