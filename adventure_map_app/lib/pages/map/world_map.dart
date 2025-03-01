import 'package:flutter/material.dart';

Color generateGradient(
    int x, int y, int maxX, int maxY, Color startColor, Color endColor) {
  // Normalize x and y between 0 and 1
  double tX = x / maxX;
  double tY = y / maxY;

  // Average the two to create a smooth transition across both axes
  double t = (tX + tY) / 2;

  // Use Color.lerp to interpolate between startColor and endColor
  return Color.lerp(startColor, endColor, t)!;
}

class WorldMap extends StatelessWidget {
  const WorldMap({super.key});

  final int dimension = 8;

  @override
  Widget build(BuildContext context) {
    List<Widget> children = <Widget>[];

    for (var i = 0; i < dimension; i++) {
      for (var j = 0; j < dimension; j++) {
        children.add(Container(
          color: generateGradient(
              i, j, dimension, dimension, Colors.blue, Colors.red),
        ));
      }
    }

    return GridView.count(
        primary: false, crossAxisCount: dimension, children: children);
  }
}
