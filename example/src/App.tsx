/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import NativeTurboStarter from 'react-native-turbo-starter';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [promise1, setPromise1] = React.useState<boolean>(false);
  const [promise2, setPromise2] = React.useState<boolean>(false);
  const [promise3, setPromise3] = React.useState<string>('');

  React.useEffect(() => {
    NativeTurboStarter.getGreeting('Yotam');
    NativeTurboStarter.getTurboPromise(42).then((res) => setPromise1(res));
    NativeTurboStarter.getTurboPromise(1).then((res) => setPromise2(res));
    NativeTurboStarter.getTurboPromise(7).catch((error: Error) => {
      setPromise3(error.message);
    });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Text style={[styles.sectionContainer, styles.sectionTitle]}>
          React Native Turbo Starter
        </Text>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Section title="getGreeting">
            {NativeTurboStarter.getGreeting('Yotam')}
          </Section>
          <Section title="getTurboArray">
            {NativeTurboStarter.getTurboArray(['Hello', 'World']).join(', ')}
          </Section>
          <Section title="getTurboObject">
            {JSON.stringify(
              NativeTurboStarter.getTurboObject({
                title: 'Hello, world!',
              })
            )}
          </Section>
          <Section title="getTurboObjectGeneric">
            {JSON.stringify(
              NativeTurboStarter.getTurboObjectGeneric({
                magicNumber: 7,
              })
            )}
          </Section>
          <Section title="getTurboPromise (resolve)">{`${promise1}`}</Section>
          <Section title="getTurboPromise (resolve) 2">{`${promise2}`}</Section>
          <Section title="getTurboPromise (reject)">{promise3}</Section>
          <Section title="getBatteryLevel">
            {NativeTurboStarter.getBatteryLevel()}
          </Section>

          <Section title="multiply (c++)">
            {NativeTurboStarter.turboMultiply(3, 3)}
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
