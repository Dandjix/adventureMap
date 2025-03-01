import 'package:adventure_map_app/providers/auth_provider.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class AdventureMapAppBar extends StatefulWidget implements PreferredSizeWidget {
  const AdventureMapAppBar({super.key});

  @override
  State<AdventureMapAppBar> createState() => _AdventureMapAppBarState();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class _AdventureMapAppBarState extends State<AdventureMapAppBar> {
  final roleColors = {
    "guest": Colors.green,
    "player": Colors.green,
    "admin": Colors.blue,
    "gameMaker": Colors.red,
  };

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    return AppBar(
      title: const Text("Adventure Map"),
      backgroundColor: authProvider.isAuthenticated
          ? roleColors[authProvider.role!]
          : roleColors["guest"],
      actions: [
        if (authProvider.isAuthenticated) ...[
          Text("${authProvider.username!} - ${authProvider.email}"),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              setState(() {
                authProvider.logout(); // Logout
              });
            },
          )
        ] else
          IconButton(
            icon: const Icon(Icons.login),
            onPressed: () async {
              context.go("/login");
            },
          ),
      ],
    );
  }
}
