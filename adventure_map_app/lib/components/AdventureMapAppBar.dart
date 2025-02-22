import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AdventureMapAppBar extends StatefulWidget implements PreferredSizeWidget {
  const AdventureMapAppBar({super.key});

  @override
  State<AdventureMapAppBar> createState() => _AdventureMapAppBarState();

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

class _AdventureMapAppBarState extends State<AdventureMapAppBar> {
  bool isLoggedIn = false;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: const Text("Adventure Map"),
      backgroundColor: Colors.green,
      actions: [
        isLoggedIn
            ? IconButton(
                icon: const Icon(Icons.logout),
                onPressed: () {
                  setState(() {
                    isLoggedIn = false; // Logout
                  });
                },
              )
            : IconButton(
                icon: const Icon(Icons.login),
                onPressed: () async {
                  context.go("/login");
                },
              ),
      ],
    );
  }
}
