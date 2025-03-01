import 'package:adventure_map_app/pages/map/world_map.dart';
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
    return Center(child: WorldMap());
  }
}
