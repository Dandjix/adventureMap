import 'package:flutter/material.dart';

void main() {
  runApp(AdventureMap());
}

class AdventureMap extends StatelessWidget {
  const AdventureMap({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.green,
          title: const Text("Adventure Map"),
        ),
        body: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.backpack),
            const Icon(Icons.star),
            const Icon(Icons.ac_unit)
          ],
        ),
      ),
    );
  }
}
