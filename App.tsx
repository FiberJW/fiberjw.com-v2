import React, { useState, useEffect, useMemo, Children } from "react";
import { StyleSheet, Text, View, Linking, ViewStyle } from "react-native";
import { loadAsync } from "expo-font";

export default function App() {
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await loadAsync({
        "manrope-thin": require("./assets/fonts/manrope-thin.otf"),
        "manrope-light": require("./assets/fonts/manrope-light.otf"),
        "manrope-regular": require("./assets/fonts/manrope-regular.otf"),
        "manrope-medium": require("./assets/fonts/manrope-medium.otf"),
        "manrope-semibold": require("./assets/fonts/manrope-semibold.otf"),
        "manrope-bold": require("./assets/fonts/manrope-bold.otf"),
        "manrope-extrabold": require("./assets/fonts/manrope-extrabold.otf"),
      });

      setFontsAreLoaded(true);
    }

    loadFonts();
  }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
        },
        wrapperBG: {
          width: "100%",
          backgroundColor: "black",
          height: 200,
          justifyContent: "flex-end",
          alignItems: "center",
        },
        wrapperBanner: {
          width: "100%",
          backgroundColor: "#F9E223",
          padding: 12,
          alignItems: "center",
          marginBottom: 24,
        },
        wrapperBannerText: {
          fontFamily: "manrope-semibold, sans-serif",
          fontSize: 21,
          color: "black",
        },
        underline: { textDecorationLine: "underline" },
        bioContainer: {
          paddingHorizontal: 16,
          paddingVertical: 24,
          borderWidth: 3,
          marginBottom: 24,
        },
        bio: {
          fontFamily: "manrope-regular, sans-serif",
          fontSize: 16,
          color: "black",
          lineHeight: 24,
        },
        title: {
          fontFamily: "manrope-bold, sans-serif",
          fontSize: 36,
          color: "white",
          marginBottom: 12,
        },
        description: {
          fontFamily: "manrope-regular, sans-serif",
          color: "white",
          fontSize: 16,
          marginBottom: 16,
        },
        lightText: { fontFamily: "manrope-light, sans-serif" },
        fixedWidthContainer45ch: {
          width: "45ch",
        },
        linksSectionTitle: {
          fontFamily: "manrope-semibold, sans-serif",
          color: "black",
          fontSize: 28,
          marginBottom: 16,
        },
        sourceLink: {
          fontFamily: "manrope-bold, sans-serif",
          color: "black",
          fontSize: 12,
          marginVertical: 24,
          textAlign: "center",
        },
      }),
    [],
  );

  return fontsAreLoaded ? (
    <View style={styles.container}>
      <View style={styles.wrapperBG}>
        <View style={styles.fixedWidthContainer45ch}>
          <Text style={styles.title}>
            Juwan <Text style={styles.lightText}>Wheatley</Text>
          </Text>
          <Text style={styles.description}>Software developer + designer</Text>
        </View>
      </View>
      <View style={styles.wrapperBanner}>
        <View style={styles.fixedWidthContainer45ch}>
          <Text style={styles.wrapperBannerText}>
            Currently at{" "}
            <Text
              accessibilityRole="link"
              href={"https://expo.io"}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.underline}
            >
              Expo.io
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.fixedWidthContainer45ch}>
        <Text style={styles.linksSectionTitle}>Links to lurk</Text>
      </View>
      <View style={styles.fixedWidthContainer45ch}>
        <LinkStack>
          <Link
            href="https://twitter.com/fiberjw"
            subdomainLabel="twitter"
            TLDAndPathLabel=".com/fiberjw"
          />
          <Link
            href="https://github.com/fiberjw"
            subdomainLabel="github"
            TLDAndPathLabel=".com/fiberjw"
          />
          <Link
            href="https://blog.fiberjw.com"
            subdomainLabel="blog"
            TLDAndPathLabel=".fiberjw.com"
          />
        </LinkStack>
      </View>
      <Text
        accessibilityRole="link"
        href={"https://github.com/fiberjw/fiberjw.com-v2"}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.sourceLink}
      >
        Source Code
      </Text>
    </View>
  ) : null;
}

function LinkStack({ children }) {
  return (
    <>
      {Children.map(children, (c, i) => {
        return React.cloneElement(c, {
          ...c.props,
          style: [
            c.props.style,
            i !== Children.count(children) - 1 && { marginBottom: 16 },
          ],
        });
      })}
    </>
  );
}

function Link({
  href,
  subdomainLabel,
  TLDAndPathLabel,
  style,
}: {
  href: string;
  subdomainLabel: string;
  TLDAndPathLabel: string;
  style?: ViewStyle;
}) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          alignItems: "center",
        },
        subdomainLabelContainer: {
          backgroundColor: "black",
          padding: 4,
          marginRight: 4,
        },
        subdomainLabel: {
          color: "white",
          fontFamily: "manrope-semibold, sans-serif",
          fontSize: 21,
          textTransform: "lowercase",
        },
        TLDAndPathLabel: {
          color: "black",
          fontFamily: "manrope-regular, sans-serif",
          fontSize: 21,
          textTransform: "lowercase",
          textDecorationLine: "underline",
        },
      }),
    [],
  );

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <View style={styles.subdomainLabelContainer}>
        <Text style={styles.subdomainLabel}>{subdomainLabel}</Text>
      </View>
      <Text style={styles.TLDAndPathLabel}>{TLDAndPathLabel}</Text>
    </View>
  );
}
