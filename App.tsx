import React, { useState, useEffect, useMemo, Children } from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
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
          padding: "0.75rem",
          alignItems: "center",
          marginBottom: "1.5rem",
        },
        wrapperBannerText: {
          fontFamily: "manrope-semibold",
          fontSize: "1.333rem",
          color: "black",
        },
        underline: { textDecorationLine: "underline" },
        bioContainer: {
          paddingHorizontal: "1rem",
          paddingVertical: "1.5rem",
          borderWidth: "0.1875rem",
          marginBottom: "1.5rem",
        },
        bio: {
          fontFamily: "manrope-regular",
          fontSize: "1rem",
          color: "black",
          lineHeight: "157.5%",
        },
        title: {
          fontFamily: "manrope-bold",
          fontSize: "2.369rem",
          color: "white",
          marginBottom: "0.75rem",
        },
        description: {
          fontFamily: "manrope-regular",
          color: "white",
          fontSize: "0.75rem",
          marginBottom: "1rem",
        },
        lightText: { fontFamily: "manrope-light" },
        fixedWidthContainer45ch: {
          width: "45ch",
        },
        linksSectionTitle: {
          fontFamily: "manrope-semibold",
          color: "black",
          fontSize: "1.777rem",
          marginBottom: "1rem",
        },
        sourceLink: {
          fontFamily: "manrope-bold",
          color: "black",
          fontSize: "0.75rem",
          marginVertical: "1.5rem",
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
              style={styles.underline}
            >
              Expo.io
            </Text>
          </Text>
        </View>
      </View>
      <View style={[styles.bioContainer, styles.fixedWidthContainer45ch]}>
        <Text style={styles.bio}>
          an anime connoisseur and react-native enthusiast, juwan wheatley wakes
          up every day to reason about the existence of life and JavaScript with
          all of the brain cells residing beneath his hairless scalp.
        </Text>
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
          <Link
            href="https://anilist.co/user/fiberjw"
            subdomainLabel="anilist"
            TLDAndPathLabel=".co/user/fiberjw"
          />
        </LinkStack>
      </View>
      <Text
        accessibilityRole="link"
        href={"https://github.com/fiberjw/fiberjw.com-v2"}
        target="_blank"
        style={styles.sourceLink}
      >
        Source Code
      </Text>
    </View>
  ) : null;
}

function LinkStack({ children }) {
  return Children.map(children, (c, i) => {
    return React.cloneElement(c, {
      ...c.props,
      style: [
        c.props.style,
        i !== Children.count(children) - 1 && { marginBottom: 16 },
      ],
    });
  });
}

function Link({ href, subdomainLabel, TLDAndPathLabel, style }) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          alignItems: "center",
        },
        subdomainLabelContainer: {
          backgroundColor: "black",
          padding: "0.25rem",
          marginRight: "0.25rem",
        },
        subdomainLabel: {
          color: "white",
          fontFamily: "manrope-semibold",
          fontSize: "1.333rem",
          textTransform: "lowercase",
        },
        TLDAndPathLabel: {
          color: "black",
          fontFamily: "manrope-regular",
          fontSize: "1.333rem",
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
    >
      <View style={styles.subdomainLabelContainer}>
        <Text style={styles.subdomainLabel}>{subdomainLabel}</Text>
      </View>
      <Text style={styles.TLDAndPathLabel}>{TLDAndPathLabel}</Text>
    </View>
  );
}
