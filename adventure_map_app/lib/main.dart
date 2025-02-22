import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'pages/home_page.dart';

void main() async {
  await dotenv.load(fileName: ".env");
  runApp(AdventureMap());
}

class AdventureMap extends StatelessWidget {
  const AdventureMap({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: const HomePage(), // Start with Home Page
    );
  }
}
