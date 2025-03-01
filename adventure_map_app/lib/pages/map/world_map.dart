import 'package:flutter/material.dart';

// Function to generate a gradient based on coordinates
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

class WorldMapPainter extends CustomPainter {
  final int dimension;
  final Color startColor;
  final Color endColor;

  WorldMapPainter({
    required this.dimension,
    required this.startColor,
    required this.endColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final double tileSize = size.width / dimension; // Assuming square tiles
    final paint = Paint();

    // Draw each tile with its gradient color
    for (int y = 0; y < dimension; y++) {
      for (int x = 0; x < dimension; x++) {
        if (x == 0 || y == 0 || x == dimension - 1 || y == dimension - 1) {
          paint.color = Colors.black;
        } else {
          // Generate the gradient color for this tile
          paint.color = generateGradient(
              x, y, dimension, dimension, startColor, endColor);
        }

        // Draw the tile at (x, y)
        canvas.drawRect(
          Rect.fromLTWH(x * tileSize, y * tileSize, tileSize, tileSize),
          paint,
        );
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class WorldMap extends StatelessWidget {
  const WorldMap({super.key});

  final int dimension = 12; // Adjust dimension as needed

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Interactive World Map'),
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          final double size = constraints.maxWidth; // Available width

          return InteractiveViewer(
            panEnabled: true,
            scaleEnabled: true,
            minScale: 1, // Allow zooming out
            maxScale: 40.0, // Allow zooming in
            child: CustomPaint(
              size: Size(size, size), // Dynamically adjust the size of the map
              painter: WorldMapPainter(
                dimension: dimension,
                startColor: Colors.blue, // Start color (e.g., for water)
                endColor: Colors.green, // End color (e.g., for land)
              ),
            ),
          );
        },
      ),
    );
  }
}
