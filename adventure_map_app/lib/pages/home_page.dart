import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  HomePageState createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
  bool isLoggedIn = false; // Track login status

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        isLoggedIn ? "Home page logged in" : "Home page not logged in",
        style: const TextStyle(fontSize: 24),
      ),
    );
  }
}
