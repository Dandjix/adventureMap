import 'package:flutter/material.dart';
import 'authentication/login_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  HomePageState createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
  bool isLoggedIn = false; // Track login status

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
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
                    // Navigate to Login Page and wait for result
                    final result = await Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const LoginPage()),
                    );

                    // If login was successful, update state
                    if (result == true) {
                      setState(() {
                        isLoggedIn = true;
                      });
                    }
                  },
                ),
        ],
      ),
      body: Center(
        child: Text(
          isLoggedIn ? "Welcome Back!" : "Please log in",
          style: const TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
